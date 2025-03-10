// pages/display.jsx
import { useCustomLanguage } from '@module-federation-next/language';

export default function DisplaySettings() {
  const { language, changeLanguage, translations } = useCustomLanguage();
  // if (!translations) return <p>Loading...</p>;
  return (
    <div>
      <h1>Display Settings</h1>
      {/* Nội dung cài đặt display */}
      <h1>{translations.greeting}</h1>
      <p>{translations.description}</p>
    </div>
  );
}
