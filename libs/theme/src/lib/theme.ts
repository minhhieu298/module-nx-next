// libs/theme-lib/src/lib/theme-lib.ts
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { InputTheme } from './config/InputTheme';
import { TextFieldTheme } from './config/TextFieldTheme';

export type ThemeMode = 'dark' | 'light';

export interface ThemeConfig {
  mode: ThemeMode;
  toggleTheme: () => void;
}

// Lấy theme từ hệ thống (tùy chọn)
export const getSystemTheme = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
  return 'light';
};

// Tạo theme cho Material-UI
export const createCustomTheme = (mode: ThemeMode): ThemeOptions => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: mode === 'dark' ? '#f48fb1' : '#d81b60',
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#fff',
        paper: mode === 'dark' ? '#1d1d1d' : '#fafafa',
      },
      
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },

    components: {
      ...InputTheme,
      ...TextFieldTheme
    }
  });
};