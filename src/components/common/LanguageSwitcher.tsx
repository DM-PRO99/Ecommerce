'use client';

import { useTransition } from 'react';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGUAGES = [
  { value: 'en', labelKey: 'navigation.languageEnglish' },
  { value: 'es', labelKey: 'navigation.languageSpanish' },
];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isPending, startTransition] = useTransition();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    startTransition(() => {
      i18n.changeLanguage(value);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = value;
      }
    });
  };

  return (
    <label className="flex items-center gap-2 text-sm text-gray-600">
      <span className="font-medium">{t('navigation.languageSwitchLabel')}:</span>
      <select
        value={i18n.language}
        onChange={handleChange}
        disabled={isPending}
        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        {SUPPORTED_LANGUAGES.map(({ value, labelKey }) => (
          <option key={value} value={value}>
            {t(labelKey)}
          </option>
        ))}
      </select>
    </label>
  );
}

