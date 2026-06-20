import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  // Cursor state
  cursorLabel: string | null;
  cursorVariant: 'default' | 'button' | 'link' | 'none';
  setCursorState: (variant: ThemeState['cursorVariant'], label?: string | null) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }
    return { theme: newTheme };
  }),
  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
    set({ theme });
  },
  cursorLabel: null,
  cursorVariant: 'default',
  setCursorState: (variant, label = null) => set({ cursorVariant: variant, cursorLabel: label }),
}));
