import React, { useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useCustomLanguage } from '@module-federation-next/language';
import { CustomTextField } from '@module-federation-next/textfield';
import { CustomTabs } from '@module-federation-next/Tabs';
import { Typography } from '@mui/material';

function Index() {
  const { language, changeLanguage, translations } = useCustomLanguage();
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  const handleLanguage = (lang: 'vi' | 'en') => {
    //
    changeLanguage(lang);
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

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);
  // if (!isClient) return null;
  if (!translations) return <p>Loading...</p>;
  return (
    <div>
      {/* {/* <h1>{translations.greeting}</h1> */}
      <p>{translations.description}</p>
      <p>Current locale: {language}</p>
      {/* <Typography component='div'>{t('greeting')}</Typography> */}
      {/* Buttons để thay đổi ngôn ngữ */}
      <button onClick={() => handleLanguage('en')}>English</button>
      <button onClick={() => handleLanguage('vi')}>Tiếng Việt</button>
      <CustomTextField type="2" />
      <div>
        {/* <CustomTextField type="2" />
        <CustomTabs
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
