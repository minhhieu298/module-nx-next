'use client';
import { AppProps } from 'next/app';
import './styles.css';
import { useEffect, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import {
  createCustomTheme,
  getInitialTheme,
  getSystemTheme,
} from '@module-federation-next/theme';
import { I18nextProvider } from 'react-i18next';
import { changeLanguage, i18n } from '@module-federation-next/language';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

function CustomApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<'light' | 'dark'>(getInitialTheme());
  console.log('mode', mode);

  const emotionCache = useMemo(
    () => createCache({ key: `mui-cache-${mode}` }),
    [mode]
  );
  const muiTheme = useMemo(() => createCustomTheme(mode), [mode]);

  // Khởi tạo BroadcastChannel
  const channel_theme = useMemo(
    () => new BroadcastChannel('theme_channel'),
    []
  );
  const lang_channel = useMemo(
    () => new BroadcastChannel('language_channel'),
    []
  );

  // Đồng bộ với system theme khi không có
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setMode(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Lắng nghe sự thay đổi của localStorage (từ tab/window khác)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue === null) {
        // Nếu theme trong localStorage bị xóa, chuyển về theme hệ thống
        const systemTheme = getSystemTheme();
        setMode(systemTheme);
        console.log(
          'Local theme removed, reverting to system theme:',
          systemTheme
        );
      } else if (e.key === null && e.newValue === null) {
        // Xử lý khi clearAll từ tab khác
        const systemTheme = getSystemTheme();
        setMode(systemTheme);
        console.log(
          'Local storage cleared (from other tab), reverting to system theme:',
          systemTheme
        );
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Lắng nghe BroadcastChannel
  useEffect(() => {
    channel_theme.onmessage = (e) => {
      const newMode = e.data.theme === 'dark' ? 'dark' : 'light';
      setMode(newMode);
      localStorage.setItem('theme', newMode);
    };
    return () => channel_theme.close();
  }, []);

  // Xử lý ngôn ngữ
  useEffect(() => {
    lang_channel.onmessage = (e) => {
      const lang = e.data.lang === 'en' ? 'vi' : 'en';
      changeLanguage(lang);
    };
    return () => lang_channel.close();
  }, []);

  const toggleTheme = () => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setMode(theme === 'dark' ? 'light' : 'dark');
      localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
      channel_theme.postMessage({ theme: theme === 'dark' ? 'light' : 'dark' });
    } else {
      setMode(mode === 'dark' ? 'light' : 'dark');
      localStorage.setItem('theme', mode === 'dark' ? 'light' : 'dark');
      channel_theme.postMessage({ theme: mode === 'dark' ? 'light' : 'dark' });
    }
  };

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <CacheProvider value={emotionCache}>
          <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Component {...pageProps} />
            <button onClick={toggleTheme}>Change thmee</button>
          </MuiThemeProvider>
        </CacheProvider>
      </I18nextProvider>
    </>
  );
}

export default CustomApp;
