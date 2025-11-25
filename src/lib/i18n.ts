'use client';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enCommon from '../locales/en/common.json';
import esCommon from '../locales/es/common.json';

export const defaultNS = 'common';
export const fallbackLng = 'en';

const resources = {
  en: { common: enCommon },
  es: { common: esCommon },
} as const;

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng,
      defaultNS,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag', 'path'],
        caches: ['localStorage'],
      },
    })
    .catch((error) => {
      console.error('Error initializing i18n', error);
    });
}

export default i18n;

