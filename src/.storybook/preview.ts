// src/.storybook/preview.ts
import type { Preview } from '@storybook/react';
import '../theme/global.css'; // inject CSS vars
import { ThemeProvider } from '../theme/ThemeProvider';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '2rem' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],

  parameters: {
    backgrounds: {
      default: 'oswego-dark',
      values: [
        {
          name: 'oswego-dark',
          value: '#0a0d15', // deepNight token
        },
        {
          name: 'clean-white',
          value: '#ffffff',
        },
        {
          name: 'lab-panel',
          value: 'rgba(20,25,40,0.85)',
        },
      ],
    },
    controls: {
      sort: 'alpha',
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: [
          'Intro',
          'Tokens',
          'Theme',
          'Icons',
          'Navigation',
          'Components',
          'TechTreeSmartNav',
        ],
      },
    },
  },
};

export default preview;