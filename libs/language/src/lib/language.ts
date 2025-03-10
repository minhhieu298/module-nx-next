// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import { useEffect, useMemo } from 'react';

// // Dữ liệu ngôn ngữ
// const resources = {
//   en: {
//     translation: require('../locales/en.json'), // Đảm bảo resolveJsonModule đã bật
//   },
//   vi: {
//     translation: require('../locales/vi.json'),
//   },
// };

// const getInitialLanguage = (): string => {
//   if (typeof window !== 'undefined') {
//     const langFromStorage = localStorage.getItem('language'); // Tên cookie, bạn có thể tùy chỉnh
//     return langFromStorage && ['en', 'vi'].includes(langFromStorage as string)
//       ? (langFromStorage as string)
//       : 'vi'; // Mặc định là 'vi' nếu không hợp lệ
//   }
//   return 'vi';
// };

// // Khởi tạo i18next
// i18n
//   .use(initReactI18next) // Kết nối với React
//   .init({
//     resources,
//     lng: getInitialLanguage(), // Ngôn ngữ mặc định
//     fallbackLng: 'vi', // Ngôn ngữ dự phòng
//     interpolation: {
//       escapeValue: false, // React đã xử lý XSS
//     },
//   });

// export const useCustomLanguage = () => {
//   const lang_channel = useMemo(
//     () => new BroadcastChannel('language_channel'),
//     []
//   );

//   const changeLanguage = (lng: string) => {
//     i18n.changeLanguage(lng);
//     lang_channel.postMessage({ lang: i18n.language === 'vi' ? 'en' : 'vi' });
//     localStorage.setItem('language', lng);
//   };

//   // Lắng nghe sự thay đổi của localStorage (từ tab/window khác)
//   useEffect(() => {
//     const handleStorageChange = (e: StorageEvent) => {
//       if (e.key === 'language' && e.newValue === null) {
//         // Nếu theme trong localStorage bị xóa, chuyển về theme hệ thống
//         localStorage.setItem('language', i18n.language);
//       } else if (e.key === null && e.newValue === null) {
//         // Xử lý khi clearAll từ tab khác
//         localStorage.setItem('language', i18n.language);
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   // Xử lý ngôn ngữ
//   useEffect(() => {
//     lang_channel.onmessage = (e) => {
//       const lang = e.data.lang === 'en' ? 'vi' : 'en';
//       changeLanguage(lang);
//     };
//     return () => lang_channel.close();
//   }, []);

//   return { changeLanguage };
// };

// export { i18n };

import { useEffect, useState } from 'react';

// Danh sách ngôn ngữ hỗ trợ
const SUPPORTED_LANGUAGES = ['en', 'vi'] as const;
type LanguageType = (typeof SUPPORTED_LANGUAGES)[number];

// Hàm lấy ngôn ngữ ban đầu (chỉ chạy trên client)
const getInitialLanguage = (): LanguageType => {
  if (typeof window === 'undefined') return 'vi'; // Tránh lỗi SSR

  const storedLang = localStorage.getItem('language');
  return SUPPORTED_LANGUAGES.includes(storedLang as LanguageType)
    ? (storedLang as LanguageType)
    : 'vi';
};

// Hook custom để xử lý ngôn ngữ
export const useCustomLanguage = () => {
  const [language, setLanguage] = useState<LanguageType>('vi'); // Mặc định 'vi' để tránh lỗi SSR
  const [translations, setTranslations] = useState<Record<string, string> | null>(null);
  const langChannel = new BroadcastChannel('language_channel');

  // Chỉ load dữ liệu dịch trên client-side
  useEffect(() => {
    const lang = getInitialLanguage();
    setLanguage(lang);
    import(`../locales/${lang}.json`).then((module) => setTranslations(module.default));
  }, []);

  // Hàm đổi ngôn ngữ
  const changeLanguage = async (lang: LanguageType) => {
    if (!SUPPORTED_LANGUAGES.includes(lang)) return;
    setLanguage(lang);
    localStorage.setItem('language', lang);
    langChannel.postMessage({ language: lang });

    // Cập nhật dữ liệu dịch mới
    const module = await import(`../locales/${lang}.json`);
    setTranslations(module.default);
  };

  // Lắng nghe thay đổi từ tab khác
  useEffect(() => {
    langChannel.onmessage = async (event) => {
      if (event.data.language && event.data.language !== language) {
        setLanguage(event.data.language);
        const module = await import(`../locales/${event.data.language}.json`);
        setTranslations(module.default);
      }
    };
    return () => langChannel.close();
  }, [language]);

  return { language, translations, changeLanguage };
};
