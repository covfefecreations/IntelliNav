// src/theme/tokens/index.ts
import nightTokens from './tokens.json';       // existing night tokens (tech-night)
import daylightTokens from './daylight-tokens.json';

export type ThemeKey = 'technologyForest' | 'technologyForestDaylight';

export const themes = {
  technologyForest: nightTokens,
  technologyForestDaylight: daylightTokens,
} as const;

export type ThemeName = keyof typeof themes;
export type ThemeTokens = typeof nightTokens; // loose structural typing