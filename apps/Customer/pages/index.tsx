import React, { useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@module-federation-next/language';
import { i18n } from '@module-federation-next/language';
import { CustomTextField } from '@module-federation-next/textfield';
import { CustomTabs } from '@module-federation-next/Tabs';

function Index() {
  console.log(i18n.language);

  const { t } = useTranslation();
  const channel = useMemo(() => new BroadcastChannel('language_channel'), []);

  const handleLanguage = (lang: string) => {
    changeLanguage(lang);
    channel.postMessage({ lang: i18n.language === 'vi' ? 'en' : 'vi' });
    localStorage.setItem('language', lang);
  };
  const tabData = [
    {
      label: 'Tab 1',
      content: <div>Nội dung của Tab 1</div>,
    },
    {
      label: 'Tab 2',
      content: <div>Nội dung của Tab 2</div>,
    },
    {
      label: 'Tab 3',
      content: <div>Nội dung của Tab 3</div>,
    },
  ];
  const handleTabChange = (newValue: number) => {
    console.log('Tab đã thay đổi thành:', newValue);
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
        {/* <CustomTabs
          tabs={tabData}
          variant="scrollable"
          orientation="horizontal"
          defaultTab={0}
          onTabChange={handleTabChange}
        /> */}
      </div>
    </div>
  );
}

export default Index;
