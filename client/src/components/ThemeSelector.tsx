import { useTheme, type ThemePreset } from '@/hooks/useTheme';
import { Check } from 'lucide-react';

const themeColors: Record<ThemePreset, { primary: string; name: string }> = {
  cyan: { primary: 'hsl(170, 100%, 50%)', name: 'Electric Cyan' },
  purple: { primary: 'hsl(280, 100%, 65%)', name: 'Vibrant Purple' },
  green: { primary: 'hsl(140, 100%, 50%)', name: 'Neon Green' },
  blue: { primary: 'hsl(200, 100%, 55%)', name: 'Neon Blue' },
  pink: { primary: 'hsl(330, 100%, 60%)', name: 'Neon Pink' },
};

export function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-card border border-border rounded-lg p-4 backdrop-blur-lg shadow-xl">
        <h3 className="text-sm font-semibold mb-3 text-foreground">Theme Presets</h3>
        <div className="flex gap-2">
          {themes.map((themeOption) => (
            <button
              key={themeOption}
              onClick={() => setTheme(themeOption)}
              className="relative w-10 h-10 rounded-full border-2 transition-all hover-elevate active-elevate-2"
              style={{
                backgroundColor: themeColors[themeOption].primary,
                borderColor: theme === themeOption ? themeColors[themeOption].primary : 'transparent',
                boxShadow: theme === themeOption 
                  ? `0 0 20px ${themeColors[themeOption].primary}40` 
                  : 'none',
              }}
              data-testid={`theme-${themeOption}`}
              title={themeColors[themeOption].name}
            >
              {theme === themeOption && (
                <Check className="w-5 h-5 text-white absolute inset-0 m-auto" />
              )}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          {themeColors[theme].name}
        </p>
      </div>
    </div>
  );
}
