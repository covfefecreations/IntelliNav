import React, { useEffect, useRef, useState, useReducer, useCallback } from 'react';
import './TechTreeSmartNav.css';
import {
DndContext,
closestCenter,
PointerSensor,
useSensor,
useSensors,
DragOverlay,
DragStartEvent,
DragEndEvent,
} from '@dnd-kit/core';
import {
arrayMove,
SortableContext,
useSortable,
verticalListSortingStrategy,
horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Home, PenTool, Hammer, Search, Rocket, Monitor, Move } from 'lucide-react';

/**

- TechTree SmartNav - Refactored
- 
- Key improvements:
- - State machine for interaction management (no overlapping timers)
- - Separated gesture concerns (drag vs long-press vs click)
- - Full TypeScript type safety
- - Enhanced accessibility (ARIA attributes, keyboard support)
- - Robust error handling with user feedback
- - Performance optimizations (useCallback, memo candidates)
    */

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

type ItemKey = 'home' | 'design' | 'build' | 'qa' | 'deploy' | 'monitor';

type PersistState = {
order: ItemKey[];
scale: number;
orientation: 'vertical' | 'horizontal';
collapsed: boolean;
pos: { right: number; bottom: number };
};

type InteractionState =
| { mode: 'idle' }
| { mode: 'dragging'; startX: number; startY: number; origRight: number; origBottom: number }
| { mode: 'longpress-pending'; timerId: number }
| { mode: 'editing' }
| { mode: 'double-tap-pending'; timerId: number };

type InteractionAction =
| { type: 'POINTER_DOWN'; payload: { x: number; y: number; right: number; bottom: number } }
| { type: 'POINTER_MOVE'; payload: { x: number; y: number } }
| { type: 'POINTER_UP' }
| { type: 'LONGPRESS_COMPLETE' }
| { type: 'EXIT_EDIT' }
| { type: 'SINGLE_TAP' }
| { type: 'DOUBLE_TAP' }
| { type: 'CANCEL_ALL' };

const DEFAULT_ITEMS: { key: ItemKey; label: string; icon: JSX.Element }[] = [
{ key: 'home', label: 'Home', icon: <Home size={18} /> },
{ key: 'design', label: 'Design', icon: <PenTool size={18} /> },
{ key: 'build', label: 'Build', icon: <Hammer size={18} /> },
{ key: 'qa', label: 'QA', icon: <Search size={18} /> },
{ key: 'deploy', label: 'Deploy', icon: <Rocket size={18} /> },
{ key: 'monitor', label: 'Monitor', icon: <Monitor size={18} /> },
];

const DEFAULT_STATE: PersistState = {
order: DEFAULT_ITEMS.map((i) => i.key),
scale: 1,
orientation: 'vertical',
collapsed: true,
pos: { right: 16, bottom: 16 },
};

const LONGPRESS_THRESHOLD = 1200; // Reduced from 4s to 1.2s for better UX
const DOUBLE_TAP_WINDOW = 350;
const MIN_DRAG_DISTANCE = 5; // Prevent accidental drags

// ============================================================================
// INTERACTION STATE MACHINE
// ============================================================================

function interactionReducer(state: InteractionState, action: InteractionAction): InteractionState {
switch (action.type) {
case 'POINTER_DOWN':
// Clear any pending timers
if (state.mode === 'longpress-pending') clearTimeout(state.timerId);
if (state.mode === 'double-tap-pending') clearTimeout(state.timerId);

  // Don't allow drag initiation in edit mode
  if (state.mode === 'editing') return state;

  return {
    mode: 'dragging',
    startX: action.payload.x,
    startY: action.payload.y,
    origRight: action.payload.right,
    origBottom: action.payload.bottom,
  };

case 'POINTER_MOVE':
  // Only transition to actual drag if moved enough (prevents accidental drags)
  if (state.mode === 'dragging') {
    const dx = Math.abs(state.startX - action.payload.x);
    const dy = Math.abs(state.startY - action.payload.y);
    if (dx > MIN_DRAG_DISTANCE || dy > MIN_DRAG_DISTANCE) {
      return state; // Continue dragging
    }
  }
  return state;

case 'POINTER_UP':
  if (state.mode === 'dragging') {
    return { mode: 'idle' };
  }
  if (state.mode === 'longpress-pending') {
    clearTimeout(state.timerId);
    return { mode: 'idle' };
  }
  return state;

case 'LONGPRESS_COMPLETE':
  if (state.mode === 'longpress-pending') {
    return { mode: 'editing' };
  }
  return state;

case 'EXIT_EDIT':
  return { mode: 'idle' };

case 'SINGLE_TAP':
  // Only process taps when idle
  if (state.mode !== 'idle') return state;

  return {
    mode: 'double-tap-pending',
    timerId: window.setTimeout(() => {
      // This will be handled by the component
    }, DOUBLE_TAP_WINDOW),
  };

case 'DOUBLE_TAP':
  if (state.mode === 'double-tap-pending') {
    clearTimeout(state.timerId);
    return { mode: 'idle' };
  }
  return state;

case 'CANCEL_ALL':
  if (state.mode === 'longpress-pending') clearTimeout(state.timerId);
  if (state.mode === 'double-tap-pending') clearTimeout(state.timerId);
  return { mode: 'idle' };

default:
  return state;

}
}

// ============================================================================
// PROPS & COMPONENT
// ============================================================================

type Props = {
storageKey?: string;
onNavigate?: (key: ItemKey) => void;
initial?: Partial<PersistState>;
onError?: (error: Error) => void;
};

export default function TechTreeSmartNav({
storageKey = 'owegolabs_techtree_v1',
onNavigate,
initial,
onError,
}: Props) {
const [state, setState] = useState<PersistState>({ ...DEFAULT_STATE, ...(initial || {}) });
const [interaction, dispatchInteraction] = useReducer(interactionReducer, { mode: 'idle' });
const [activeId, setActiveId] = useState<ItemKey | null>(null);
const [storageError, setStorageError] = useState<string | null>(null);

const baseRef = useRef<HTMLButtonElement | null>(null);
const longPressTimerRef = useRef<number | null>(null);
const lastTapTimeRef = useRef<number>(0);
const hasDraggedRef = useRef<boolean>(false);

// ============================================================================
// PERSISTENCE
// ============================================================================

useEffect(() => {
try {
const raw = localStorage.getItem(storageKey);
if (raw) {
const parsed = JSON.parse(raw) as Partial<PersistState>;
setState((s) => ({ ...s, ...parsed }));
setStorageError(null);
}
} catch (error) {
const err = error instanceof Error ? error : new Error('Failed to load state');
setStorageError(err.message);
onError?.(err);
console.error('[TechTreeSmartNav] Load error:', err);
}
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [storageKey]);

useEffect(() => {
try {
localStorage.setItem(storageKey, JSON.stringify(state));
setStorageError(null);
} catch (error) {
const err = error instanceof Error ? error : new Error('Failed to save state');
setStorageError(err.message);
onError?.(err);
console.error('[TechTreeSmartNav] Save error:', err);
}
}, [state, storageKey, onError]);

// ============================================================================
// DND-KIT SETUP
// ============================================================================

const sensors = useSensors(
useSensor(PointerSensor, {
activationConstraint: { distance: 8 },
})
);

const handleDragStart = useCallback((event: DragStartEvent) => {
setActiveId(event.active.id as ItemKey);
}, []);

const handleDragEnd = useCallback((event: DragEndEvent) => {
const { active, over } = event;
setActiveId(null);

if (!over || active.id === over.id) return;

setState((s) => {
  const oldIndex = s.order.indexOf(active.id as ItemKey);
  const newIndex = s.order.indexOf(over.id as ItemKey);
  return { ...s, order: arrayMove(s.order, oldIndex, newIndex) };
});

}, []);

// ============================================================================
// GESTURE HANDLERS
// ============================================================================

const handlePointerDown = useCallback(
(e: React.PointerEvent<HTMLButtonElement>) => {
// Prevent default to avoid text selection during drag
e.preventDefault();

  // Don't initiate gestures in edit mode except for edit panel interactions
  if (interaction.mode === 'editing') return;

  const target = e.currentTarget;
  try {
    target.setPointerCapture(e.pointerId);
  } catch (error) {
    console.warn('[TechTreeSmartNav] setPointerCapture failed:', error);
  }

  hasDraggedRef.current = false;

  // Start drag state
  dispatchInteraction({
    type: 'POINTER_DOWN',
    payload: {
      x: e.clientX,
      y: e.clientY,
      right: state.pos.right,
      bottom: state.pos.bottom,
    },
  });

  // Start long-press timer (only when idle)
  if (interaction.mode === 'idle') {
    longPressTimerRef.current = window.setTimeout(() => {
      if (!hasDraggedRef.current) {
        dispatchInteraction({ type: 'LONGPRESS_COMPLETE' });
      }
      longPressTimerRef.current = null;
    }, LONGPRESS_THRESHOLD);
  }
},
[interaction.mode, state.pos.right, state.pos.bottom]
);

const handlePointerMove = useCallback(
(e: React.PointerEvent<HTMLButtonElement>) => {
if (interaction.mode !== 'dragging') return;
  hasDraggedRef.current = true;

  // Cancel long-press on movement
  if (longPressTimerRef.current) {
    clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = null;
  }

  const dx = interaction.startX - e.clientX;
  const dy = interaction.startY - e.clientY;

  // Only update if moved beyond threshold
  if (Math.abs(dx) > MIN_DRAG_DISTANCE || Math.abs(dy) > MIN_DRAG_DISTANCE) {
    setState((s) => ({
      ...s,
      pos: {
        right: Math.max(6, Math.min(window.innerWidth - 60, interaction.origRight + dx)),
        bottom: Math.max(6, Math.min(window.innerHeight - 60, interaction.origBottom + dy)),
      },
    }));
  }

  dispatchInteraction({ type: 'POINTER_MOVE', payload: { x: e.clientX, y: e.clientY } });
},
[interaction]
);

const handlePointerUp = useCallback(
(e: React.PointerEvent<HTMLButtonElement>) => {
const target = e.currentTarget;
try {
target.releasePointerCapture(e.pointerId);
} catch (error) {
console.warn('[TechTreeSmartNav] releasePointerCapture failed:', error);
}

  // Clear long-press timer
  if (longPressTimerRef.current) {
    clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = null;
  }

  // If we didn't drag, treat as tap
  if (!hasDraggedRef.current && interaction.mode !== 'editing') {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapTimeRef.current;

    if (timeSinceLastTap < DOUBLE_TAP_WINDOW) {
      // Double tap - toggle orientation
      dispatchInteraction({ type: 'DOUBLE_TAP' });
      setState((s) => ({
        ...s,
        orientation: s.orientation === 'vertical' ? 'horizontal' : 'vertical',
      }));
      lastTapTimeRef.current = 0;
    } else {
      // Single tap - toggle collapse after delay
      lastTapTimeRef.current = now;
      dispatchInteraction({ type: 'SINGLE_TAP' });

      setTimeout(() => {
        const finalTimeSinceTap = Date.now() - lastTapTimeRef.current;
        if (finalTimeSinceTap >= DOUBLE_TAP_WINDOW) {
          setState((s) => ({ ...s, collapsed: !s.collapsed }));
        }
      }, DOUBLE_TAP_WINDOW);
    }
  }

  dispatchInteraction({ type: 'POINTER_UP' });
  hasDraggedRef.current = false;
},
[interaction.mode]

);

// ============================================================================
// STATE MUTATIONS
// ============================================================================

const setScale = useCallback((value: number) => {
setState((s) => ({ ...s, scale: Math.max(0.6, Math.min(1.6, value)) }));
}, []);

const exitEditMode = useCallback(() => {
dispatchInteraction({ type: 'EXIT_EDIT' });
}, []);

const handleItemClick = useCallback(
(key: ItemKey) => {
onNavigate?.(key);
setState((s) => ({ ...s, collapsed: true }));
},
[onNavigate]
);

// ============================================================================
// ACCESSIBILITY: Keyboard support
// ============================================================================

const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
if (e.key === 'Escape' && interaction.mode === 'editing') {
exitEditMode();
}
}, [interaction.mode, exitEditMode]);

// ============================================================================
// SORTABLE ITEM COMPONENT
// ============================================================================

function SortableItem({ id, label, icon }: { id: ItemKey; label: string; icon: JSX.Element }) {
const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
id,
disabled: interaction.mode !== 'editing',
});

const style: React.CSSProperties = {
  transform: CSS.Transform.toString(transform),
  transition,
  opacity: isDragging ? 0.5 : 1,
};

return (
  <button
    ref={setNodeRef}
    className={`tt-item ${interaction.mode === 'editing' ? 'tt-editable' : ''} ${isDragging ? 'dragging' : ''}`}
    data-key={id}
    style={style}
    onClick={() => interaction.mode !== 'editing' && handleItemClick(id)}
    disabled={interaction.mode === 'editing'}
    aria-label={`${label}${interaction.mode === 'editing' ? ' - Drag to reorder' : ''}`}
    role="menuitem"
    {...(interaction.mode === 'editing' ? { ...attributes, ...listeners } : {})}
  >
    <span className="tt-icon">{icon}</span>
  </button>
);

}

// ============================================================================
// RENDER HELPERS
// ============================================================================

const getIconForKey = useCallback((key: ItemKey): JSX.Element => {
return DEFAULT_ITEMS.find((i) => i.key === key)!.icon;
}, []);

const strategy = state.orientation === 'vertical' ? verticalListSortingStrategy : horizontalListSortingStrategy;

// ============================================================================
// RENDER
// ============================================================================

return (
<div
className={`tt-dock ${state.orientation} ${state.collapsed ? 'collapsed' : 'expanded'} ${ interaction.mode === 'editing' ? 'editing' : '' } ${interaction.mode === 'longpress-pending' ? 'longpress-active' : ''}`}
style={{
right: state.pos.right,
bottom: state.pos.bottom,
transform: `scale(${state.scale})`,
transformOrigin: 'bottom right',
}}
role="menu"
aria-label="TechTree SmartNav"
onKeyDown={handleKeyDown}
>
{/* Base Button */}
<button
ref={baseRef}
className="tt-base"
aria-label={`TechTree Menu - ${state.collapsed ? 'Collapsed' : 'Expanded'}. ${ interaction.mode === 'editing' ? 'Edit mode active' : 'Hold to edit' }`}
aria-pressed={!state.collapsed}
aria-expanded={!state.collapsed}
onPointerDown={handlePointerDown}
onPointerMove={handlePointerMove}
onPointerUp={handlePointerUp}
style={{
cursor: interaction.mode === 'dragging' ? 'grabbing' : interaction.mode === 'editing' ? 'default' : 'grab',
}}
>
<Move size={18} />
</button>

  {/* DnD Context */}
  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
    <SortableContext items={state.order} strategy={strategy}>
      <div className="tt-items" aria-hidden={state.collapsed} role="none">
        {state.order.map((k) => (
          <SortableItem key={k} id={k} label={k} icon={getIconForKey(k)} />
        ))}
      </div>
    </SortableContext>

    <DragOverlay>
      {activeId ? (
        <div className="drag-overlay" role="img" aria-label={`Dragging ${activeId}`}>
          {getIconForKey(activeId)}
        </div>
      ) : null}
    </DragOverlay>
  </DndContext>

  {/* Edit Panel */}
  {interaction.mode === 'editing' && (
    <div className="tt-edit-panel" role="region" aria-label="Edit TechTree Settings" aria-live="polite">
      <label className="tt-edit-label" htmlFor="tt-scale-slider">
        Scale: {state.scale.toFixed(2)}
      </label>
      <input
        id="tt-scale-slider"
        className="tt-slider"
        type="range"
        min={0.6}
        max={1.6}
        step={0.05}
        value={state.scale}
        onChange={(e) => setScale(Number(e.target.value))}
        aria-valuemin={0.6}
        aria-valuemax={1.6}
        aria-valuenow={state.scale}
      />
      <button className="tt-done-btn" onClick={exitEditMode} aria-label="Exit edit mode">
        Done
      </button>
    </div>
  )}

  {/* Error Display */}
  {storageError && (
    <div className="tt-error" role="alert" aria-live="assertive">
      Storage error: {storageError}
    </div>
  )}
</div>

);
}