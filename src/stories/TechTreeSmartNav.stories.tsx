// src/stories/TechTreeSmartNav.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { TechTreeSmartNav } from '../components/TechTreeSmartNav';
import '../TechTreeSmartNav.css';

const meta: Meta<typeof TechTreeSmartNav> = {
  title: 'Navigation/TechTreeSmartNav',
  component: TechTreeSmartNav,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'oswego-dark',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TechTreeSmartNav>;

export const Default: Story = {
  args: {
    initialOrientation: 'vertical',
    initialScale: 1,
    storageKey: 'storybook-techtree',
  },
};

export const Horizontal: Story = {
  args: {
    initialOrientation: 'horizontal',
    initialScale: 1,
    storageKey: 'storybook-techtree-h',
  },
};

export const Collapsed: Story = {
  args: {
    initialOrientation: 'vertical',
    initialCollapsed: true,
    storageKey: 'storybook-techtree-collapsed',
  },
};

export const LargeScale: Story = {
  args: {
    initialScale: 1.5,
    storageKey: 'storybook-techtree-lg',
  },
};

export const EditMode: Story = {
  render: () => (
    <TechTreeSmartNav
      initialOrientation="vertical"
      storageKey="storybook-techtree-edit"
      debugForceEdit
    />
  ),
};