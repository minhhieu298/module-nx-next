import { AppProps } from 'next/app';
import './styles.css';
import { useEffect, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { getCookie, setCookie } from 'cookies-next';
import {
  createCustomTheme,
  getSystemTheme,
} from '@module-federation-next/theme';
import { I18nextProvider } from 'react-i18next';
import { changeLanguage, i18n } from '@module-federation-next/language';


function CustomApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<'dark' | 'light'>(getSystemTheme());
  const muiTheme = useMemo(() => createCustomTheme(mode), [mode]);
  const channel_theme = useMemo(
    () => new BroadcastChannel('theme_channel'),
    []
  );
  const lang_channel = useMemo(() => new BroadcastChannel('lang_channel'), []);

  const toggleTheme = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
    channel_theme.postMessage({ theme: mode === 'dark' ? 'light' : 'dark' });
    setCookie('theme', mode)
  };

  useEffect(() => {
    setMode(getSystemTheme());
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setMode(e.matches ? 'dark' : 'light');
      console.log('System theme changed to:', e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    channel_theme.onmessage = (e) => {
      setMode(e.data.theme === 'dark' ? 'dark' : 'light');
      setCookie('theme', e.data.theme);
    };
    return () => channel_theme.close();
  }, []);
  useEffect(() => {
    lang_channel.onmessage = (e) => {
      const lang = e.data.lang === 'en' ? 'vi' : 'en';
      changeLanguage(lang);
    };
    return () => lang_channel.close();
  }, []);

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          <Component {...pageProps} />
          <button onClick={toggleTheme}>Change thmee</button>
        </MuiThemeProvider>
      </I18nextProvider>
    </>
  );
}

export default CustomApp;
