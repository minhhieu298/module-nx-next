'use client'
import { useCustomLanguage } from '@module-federation-next/language';
import React from 'react';

const ButtonChangeLang = () => {
  const { changeLanguage } = useCustomLanguage();

  const handleLanguage = (lang: string) => {
    changeLanguage(lang);
  };
  return (
    <>
      <button onClick={() => handleLanguage('en')}>English</button>
      <button onClick={() => handleLanguage('vi')}>Tiếng Việt</button>
    </>
  );
};

export default ButtonChangeLang;
