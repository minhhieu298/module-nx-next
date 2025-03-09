import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getCookie } from 'cookies-next';

// Dữ liệu ngôn ngữ
const resources = {
  en: {
    translation: require('../locales/en.json'), // Đảm bảo resolveJsonModule đã bật
  },
  vi: {
    translation: require('../locales/vi.json'),
  },
};

const getInitialLanguage = (): string => {
  const langFromCookie = getCookie('language'); // Tên cookie, bạn có thể tùy chỉnh
  return langFromCookie && ['en', 'vi'].includes(langFromCookie as string)
    ? langFromCookie as string
    : 'vi'; // Mặc định là 'vi' nếu không hợp lệ
};

// Khởi tạo i18next
i18n
  .use(initReactI18next) // Kết nối với React
  .init({
    resources,
    lng: getInitialLanguage(), // Ngôn ngữ mặc định
    fallbackLng: 'vi', // Ngôn ngữ dự phòng
    interpolation: {
      escapeValue: false, // React đã xử lý XSS
    },
  });

export { i18n };

export const changeLanguage = (lng: string) => i18n.changeLanguage(lng);
