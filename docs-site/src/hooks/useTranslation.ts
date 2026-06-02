import { useState, useCallback } from 'react';
import en from '../i18n/en.json';
import hi from '../i18n/hi.json';

export type Language = 'en' | 'hi';

const translations: Record<Language, typeof en> = {
  en,
  hi,
};

const LANGUAGE_KEY = 'saavn_play_language';

function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current === undefined || current === null) {
      return path;
    }
    current = current[key];
  }

  return typeof current === 'string' ? current : path;
}

export function useTranslation() {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem(LANGUAGE_KEY);
    if (stored && (stored === 'en' || stored === 'hi')) {
      return stored;
    }
    return 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    localStorage.setItem(LANGUAGE_KEY, lang);
    setLanguageState(lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(translations[language], key);
    },
    [language]
  );

  return {
    language,
    setLanguage,
    t,
  };
}

export default useTranslation;
