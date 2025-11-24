// OswegoPark Labs - TechnologyForest Theme Tokens

export type ThemeName = 'technologyForest' | 'technologyForestDaylight';

export interface ThemeTokens {
  colors: {
    // Backgrounds
    bg: {
      deepNight: string;
      forestShadow: string;
      panel: string;
      overlay: string;
    };

    // Glow Colors (Candy Theme)
    glow: {
      apricot: string;
      melonRed: string;
      electricBlue: string;
      candyPink: string;
      sunflower: string;
      forestGreen: string;
      brown: string;
      vcrRed: string;
      periwinkle: string;
    };

    // Accent Colors
    accent: {
      purple: string;
      indigo: string;
      midnight: string;
      slate: string;
    };

    // Text Colors
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
    };

    // Status Colors
    status: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };

    // Border Colors
    border: {
      primary: string;
      secondary: string;
      glow: string;
    };
  };

  spacing: {
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };

  radii: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    round: string;
  };

  shadows: {
    softGlow: string;
    sharpGlow: string;
    ambient: string;
    focus: string;
  };

  typography: {
    font: {
      sans: string;
      mono: string;
    };
    size: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    weight: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
  };

  blur: {
    sm: string;
    md: string;
    lg: string;
  };
}

// TechnologyForest Night Theme
const technologyForest: ThemeTokens = {
  colors: {
    bg: {
      deepNight: '#0a0d15',
      forestShadow: '#0f1320',
      panel: 'rgba(20, 25, 40, 0.7)',
      overlay: 'rgba(10, 13, 21, 0.8)',
    },
    glow: {
      apricot: '#ffb170',
      melonRed: '#ff6a6a',
      electricBlue: '#64c8ff',
      candyPink: '#ff7fd1',
      sunflower: '#ffd447',
      forestGreen: '#5fcc7a',
      brown: '#a56b4f',
      vcrRed: '#ff3b3b',
      periwinkle: '#a5a8ff',
    },
    accent: {
      purple: '#4d3c78',
      indigo: '#2a235a',
      midnight: '#121527',
      slate: '#1e2438',
    },
    text: {
      primary: '#eaf2ff',
      secondary: '#9ba8c7',
      tertiary: '#6b7a9a',
      inverse: '#0a0d15',
    },
    status: {
      success: '#5fcc7a',
      warning: '#ffb170',
      error: '#ff6a6a',
      info: '#64c8ff',
    },
    border: {
      primary: 'rgba(255, 255, 255, 0.1)',
      secondary: 'rgba(255, 255, 255, 0.05)',
      glow: 'rgba(100, 200, 255, 0.3)',
    },
  },
  spacing: {
    xxs: '2px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    xxxl: '48px',
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    round: '50%',
  },
  shadows: {
    softGlow: '0px 0px 12px rgba(100, 150, 255, 0.35)',
    sharpGlow: '0px 0px 18px rgba(255, 110, 200, 0.45)',
    ambient: '0px 4px 20px rgba(0, 0, 0, 0.35)',
    focus: '0 0 0 3px rgba(100, 200, 255, 0.3)',
  },
  typography: {
    font: {
      sans: "'Inter', 'SF Pro Text', system-ui, sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    weight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  blur: {
    sm: '8px',
    md: '14px',
    lg: '20px',
  },
};

// TechnologyForest Daylight Theme
const technologyForestDaylight: ThemeTokens = {
  colors: {
    bg: {
      deepNight: '#f8fafc',
      forestShadow: '#f1f5f9',
      panel: 'rgba(255, 255, 255, 0.8)',
      overlay: 'rgba(248, 250, 252, 0.9)',
    },
    glow: {
      apricot: '#ea580c',
      melonRed: '#dc2626',
      electricBlue: '#0284c7',
      candyPink: '#db2777',
      sunflower: '#ca8a04',
      forestGreen: '#16a34a',
      brown: '#92400e',
      vcrRed: '#b91c1c',
      periwinkle: '#4338ca',
    },
    accent: {
      purple: '#5b21b6',
      indigo: '#3730a3',
      midnight: '#1e1b4b',
      slate: '#334155',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      inverse: '#f8fafc',
    },
    status: {
      success: '#16a34a',
      warning: '#ea580c',
      error: '#dc2626',
      info: '#0284c7',
    },
    border: {
      primary: 'rgba(0, 0, 0, 0.1)',
      secondary: 'rgba(0, 0, 0, 0.05)',
      glow: 'rgba(2, 132, 199, 0.3)',
    },
  },
  spacing: { ...technologyForest.spacing },
  radii: { ...technologyForest.radii },
  shadows: {
    softGlow: '0px 0px 12px rgba(2, 132, 199, 0.2)',
    sharpGlow: '0px 0px 18px rgba(219, 39, 119, 0.25)',
    ambient: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    focus: '0 0 0 3px rgba(2, 132, 199, 0.2)',
  },
  typography: { ...technologyForest.typography },
  blur: { ...technologyForest.blur },
};

export const themes: Record<ThemeName, ThemeTokens> = {
  technologyForest,
  technologyForestDaylight,
};

// Helper function to get CSS variable name
export const getCssVar = (path: string): string => {
  return `var(--tf-${path.replace(/\./g, '-')})`;
};

// Example usage: getCssVar('colors.glow.electricBlue') returns 'var(--tf-colors-glow-electricBlue)'