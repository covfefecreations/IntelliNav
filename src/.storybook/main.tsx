// src/.storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  stories: [
    '../stories/**/*.stories.@(ts|tsx)',
    '../components/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  docs: {
    autodocs: true,
  },
  viteFinal: async (config) => {
    // ensure Vite resolves src/ paths
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      '@': '/src',
    };
    return config;
  },
};

export default config;