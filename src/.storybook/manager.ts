// src/.storybook/manager.ts
import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';
import tokenData from '../theme/tokens/tokens.json';

// Use OswegoPark “TechnologyForest” palette
const forest = tokenData.colors;

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'OswegoPark Labs – UI Kit',
    brandUrl: 'https://oswegopark.dev',
    brandImage: null,

    colorPrimary: forest.glow.electricBlue,
    colorSecondary: forest.glow.candyPink,

    appBg: forest.background.deepNight,
    appContentBg: forest.background.forestShadow,
    appBorderColor: forest.accent.purple,
    appBorderRadius: 8,

    textColor: forest.text.primary,
    textMutedColor: forest.text.secondary,

    barBg: forest.background.panel,
    barSelectedColor: forest.glow.apricot,
    barTextColor: forest.text.secondary,

    inputBg: forest.background.panel,
    inputBorder: forest.accent.indigo,
    inputTextColor: forest.text.primary,
    inputBorderRadius: 6,
  }),
});