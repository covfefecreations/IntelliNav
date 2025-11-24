// src/theme/tokens/tokens.ts
import tokens from './tokens.json';

export type ColorTokens = typeof tokens.colors;
export type RadiiTokens = typeof tokens.radii;
export type SpacingTokens = typeof tokens.spacing;
export type ShadowTokens = typeof tokens.shadows;

export interface ThemeTokens {
  colors: ColorTokens;
  radii: RadiiTokens;
  spacing: SpacingTokens;
  shadows: ShadowTokens;
}

export const themeTokens: ThemeTokens = tokens;
export default themeTokens;