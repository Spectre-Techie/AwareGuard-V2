/**
 * ThemeContext - Provides System / Light / Dark theme support
 * Stores preference in localStorage, applies data-theme attribute to <html>
 */
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const THEME_KEY = 'AG_THEME';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(THEME_KEY) || 'system';
    }
    return 'system';
  });

  // Resolve effective theme (what actually applies)
  const getEffectiveTheme = (themeValue) => {
    if (themeValue === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return themeValue;
  };

  const [effectiveTheme, setEffectiveTheme] = useState(() =>
    typeof window !== 'undefined' ? getEffectiveTheme(theme) : 'light'
  );

  useEffect(() => {
    const root = document.documentElement;
    const resolved = getEffectiveTheme(theme);
    setEffectiveTheme(resolved);

    // Apply theme
    root.setAttribute('data-theme', resolved);
    if (resolved === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Store preference
    localStorage.setItem(THEME_KEY, theme);

    // Listen for system theme changes when in 'system' mode
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e) => {
        const newResolved = e.matches ? 'dark' : 'light';
        setEffectiveTheme(newResolved);
        root.setAttribute('data-theme', newResolved);
        if (newResolved === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  // Cycle: system -> light -> dark -> system
  const cycleTheme = () => {
    setTheme((prev) => {
      if (prev === 'system') return 'light';
      if (prev === 'light') return 'dark';
      return 'system';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
