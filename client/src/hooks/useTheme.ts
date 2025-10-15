import { useEffect, useState } from 'react';

export type ThemePreset = 'cyan' | 'purple' | 'green' | 'blue' | 'pink';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

const themePresets: Record<ThemePreset, ThemeColors> = {
  cyan: {
    primary: '170 100% 50%',    // Electric Cyan
    secondary: '280 100% 65%',   // Vibrant Purple
    accent: '330 100% 60%',      // Neon Pink
  },
  purple: {
    primary: '280 100% 65%',     // Vibrant Purple
    secondary: '260 100% 70%',   // Light Purple
    accent: '300 100% 60%',      // Magenta
  },
  green: {
    primary: '140 100% 50%',     // Neon Green
    secondary: '160 100% 45%',   // Cyan Green
    accent: '120 100% 55%',      // Lime
  },
  blue: {
    primary: '200 100% 55%',     // Neon Blue
    secondary: '220 100% 60%',   // Sky Blue
    accent: '180 100% 50%',      // Cyan Blue
  },
  pink: {
    primary: '330 100% 60%',     // Neon Pink
    secondary: '350 100% 65%',   // Hot Pink
    accent: '310 100% 55%',      // Magenta Pink
  },
};

export function useTheme() {
  const [theme, setTheme] = useState<ThemePreset>(() => {
    // Safely access localStorage only in browser
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('neon-theme') as ThemePreset;
        return stored || 'cyan';
      } catch (e) {
        console.error('Failed to access localStorage:', e);
        return 'cyan';
      }
    }
    return 'cyan';
  });

  useEffect(() => {
    const colors = themePresets[theme];
    const root = document.documentElement;

    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-neon', colors.primary);
    root.style.setProperty('--secondary-neon', colors.secondary);
    root.style.setProperty('--accent-neon', colors.accent);
    
    root.style.setProperty('--sidebar-primary', colors.primary);
    root.style.setProperty('--sidebar-ring', colors.primary);
    root.style.setProperty('--ring', colors.primary);

    // Safely store theme preference
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('neon-theme', theme);
      } catch (e) {
        console.error('Failed to save theme to localStorage:', e);
      }
    }
  }, [theme]);

  return { theme, setTheme, themes: Object.keys(themePresets) as ThemePreset[] };
}
