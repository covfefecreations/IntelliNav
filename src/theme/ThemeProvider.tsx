// src/theme/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { themes, ThemeName } from './tokens';

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
}

const defaultTheme: ThemeName = 'technologyForest';

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  setTheme: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode; initial?: ThemeName }> = ({ children, initial }) => {
  const [theme, setTheme] = useState<ThemeName>(initial || defaultTheme);

  useEffect(() => {
    const root = document.documentElement;

    // set data-theme attr
    root.setAttribute('data-theme', theme);

    // flatten tokens to CSS vars: --tf-{path}
    const setVars = (obj: any, prefix = 'tf') => {
      Object.entries(obj).forEach(([k, v]) => {
        const key = prefix ? `${prefix}-${k}` : k;
        if (typeof v === 'object') {
          setVars(v, key);
        } else {
          root.style.setProperty(`--${key}`, String(v));
        }
      });
    };

    const tokens = themes[theme];
    setVars(tokens, 'tf');

  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export { ThemeContext };