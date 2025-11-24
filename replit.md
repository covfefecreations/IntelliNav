# OswegoPark Labs - TechTree IntelliNav Platform

## Overview
This is a React + Vite application showcasing the TechnologyForest Premium UI Kit from OswegoPark Labs. The app features a sophisticated navigation component (TechTreeSmartNav) with drag-and-drop functionality, theme customization, and animated visual effects.

## Project Status
**Last Updated:** November 24, 2025
**Status:** Configured for development testing and production deployment

## Tech Stack
- **Framework:** React 18.3.0
- **Build Tool:** Vite 5.4.21
- **Language:** TypeScript 5.3.0
- **UI Components:** Custom components with Lucide React icons
- **Drag & Drop:** @dnd-kit (core, sortable, utilities)
- **Styling:** CSS with custom theme system

## Development

### Running Locally
```bash
npm run dev
```
The development server runs on port 5000 and is accessible at http://localhost:5000/

### Building for Production
```bash
npm run build
```
The build output is generated in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Storybook
```bash
npm run storybook
```

## Project Structure
```
src/
├── components/       # Reusable UI components
│   └── TechTreeSmartNav/  # Main navigation component
├── icons/           # Custom SVG icons and logos
├── pages/           # Page components
│   └── PremiumSalesPage.tsx  # Main landing page
├── theme/           # Theme system and design tokens
│   ├── tokens/      # JSON token definitions
│   └── ThemeProvider.tsx  # Theme context provider
└── main.tsx         # Application entry point
```

## Configuration

### Vite Configuration
- **Port:** 5000 (required for Replit)
- **Host:** 0.0.0.0 (allows external connections)
- **Path Alias:** `@` maps to `./src`
- **ES Module:** Configured for ES module compatibility

### Deployment
The app is configured for **Autoscale Deployment** on Replit:
- **Build Command:** `npm run build`
- **Run Command:** `npm run preview`
- **Output:** `dist/` directory

## Recent Changes (November 24, 2025)
1. **Vite Configuration:** Updated to run on port 5000 with proper Replit compatibility
2. **Dependencies:** Added missing @dnd-kit packages for drag-and-drop functionality
3. **File Fixes:** 
   - Renamed main.ts to main.tsx for JSX support
   - Fixed smart quotes in TechTreeSmartNav.tsx
   - Corrected import paths in component index files
   - Fixed JSON syntax in tokens.json
4. **Workflow:** Configured development server workflow
5. **Deployment:** Set up autoscale deployment configuration

## Known Issues
- npm audit reports 2 moderate severity vulnerabilities (review if needed for production)

## Dependencies
See `package.json` for complete dependency list. Key dependencies include:
- React & React DOM
- Vite
- TypeScript
- @dnd-kit packages
- Lucide React icons
- Storybook (dev)

## Theme System
The app uses a custom theme system with:
- Multiple theme presets (technologyForest, etc.)
- CSS custom properties for dynamic theming
- Design tokens for colors, spacing, shadows, and radii
- Dark mode support
