import React, { useState, useEffect } from 'react';
import { useTranslation as useI18next } from 'react-i18next';

/**
 * AutoTranslate Component
 * 
 * Usage:
 * <AutoTranslate text="Hello World" />
 * 
 * Automatically translates text based on current language
 * No need to create translation files!
 */
const AutoTranslate = ({ text, apiKey }) => {
  const { i18n } = useI18next();
  const [translatedText, setTranslatedText] = useState(text);
  const currentLang = i18n.language;

  useEffect(() => {
    // If English, no translation needed
    if (currentLang === 'en') {
      setTranslatedText(text);
      return;
    }

    // Translate using free API
    translateText(text, currentLang)
      .then(translated => setTranslatedText(translated))
      .catch(() => setTranslatedText(text)); // Fallback to original
  }, [text, currentLang]);

  return <>{translatedText}</>;
};

/**
 * Free translation using LibreTranslate or similar
 */
const translateText = async (text, targetLang) => {
  try {
    // Using a free translation API (LibreTranslate demo)
    const response = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: targetLang,
      }),
    });

    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.error('Auto-translation error:', error);
    return text; // Return original text on error
  }
};

export default AutoTranslate;

