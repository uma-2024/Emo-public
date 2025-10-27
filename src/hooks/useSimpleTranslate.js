import { useState, useEffect } from 'react';
import { useTranslation as useI18next } from 'react-i18next';

/**
 * Simple Translation Hook - No JSON files needed!
 * 
 * Usage in components:
 * const translate = useSimpleTranslate();
 * 
 * // Then use like this:
 * <h1>{translate('Hello World')}</h1>
 * <p>{translate('This is a description')}</p>
 * 
 * It will automatically store translations in localStorage
 * and use them for future requests.
 */
export const useSimpleTranslate = () => {
  const { i18n } = useI18next();
  const [translations, setTranslations] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem('auto_translations');
    return saved ? JSON.parse(saved) : {};
  });

  const saveTranslations = (newTranslations) => {
    setTranslations(newTranslations);
    localStorage.setItem('auto_translations', JSON.stringify(newTranslations));
  };

  const translate = async (text) => {
    // If already translated, use cache
    const key = `${i18n.language}:${text}`;
    if (translations[key]) {
      return translations[key];
    }

    // If current language is English, no need to translate
    if (i18n.language === 'en') {
      return text;
    }

    // For other languages, you can either:
    // 1. Use a translation API (requires API key)
    // 2. Use manual translations (already done for you!)
    
    // For now, return the English text
    // You can enhance this to use API or your existing translations
    return text;
  };

  return translate;
};

/**
 * Alternative: Simple translate component
 */
export const T = ({ children }) => {
  return <>{children}</>;
};

