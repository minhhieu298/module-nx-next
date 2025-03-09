import React, { useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@module-federation-next/language';
import { i18n } from '@module-federation-next/language';
import { CustomTextField } from '@module-federation-next/textfield';
import { setCookie } from 'cookies-next';

function Index() {
  console.log(i18n.language);

  const { t } = useTranslation();
  const channel = useMemo(() => new BroadcastChannel('lang_channel'), []);

  const handleLanguage = (lang: string) => {
    changeLanguage(lang);
    channel.postMessage({ lang: i18n.language === 'vi' ? 'en' : 'vi' });
    setCookie('language', lang)
  };

  return (
    <div>
      <h1>{t('greeting')}</h1>
      <p>{t('description')}</p>
      <p>Current locale: {i18n.language}</p>

      {/* Buttons để thay đổi ngôn ngữ */}
      <button onClick={() => handleLanguage('en')}>English</button>
      <button onClick={() => handleLanguage('vi')}>Tiếng Việt</button>
      {/* <CustomTextField /> */}
      <div suppressHydrationWarning>
        <CustomTextField type="2" />
      </div>
    </div>
  );
}

export default Index;
