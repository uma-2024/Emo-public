/**
 * Auto-translate utility using Google Translate API
 * This will help you translate content without creating translation.json files manually
 * 
 * Note: Requires Google Translate API key
 */

const GOOGLE_TRANSLATE_API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE_KEY || '';
const TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

// Language codes
const LANGUAGES = {
  en: 'en',
  zh: 'zh-CN',
  es: 'es',
  fr: 'fr',
  ar: 'ar'
};

/**
 * Translate text using Google Translate API
 */
export const translateText = async (text, targetLang = 'en') => {
  if (!GOOGLE_TRANSLATE_API_KEY) {
    console.warn('Google Translate API key not set');
    return text;
  }

  try {
    const response = await fetch(`${TRANSLATE_API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLang,
      }),
    });

    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};

/**
 * Batch translate multiple texts
 */
export const translateMultiple = async (texts, targetLang = 'en') => {
  if (!GOOGLE_TRANSLATE_API_KEY) {
    return texts;
  }

  try {
    const response = await fetch(`${TRANSLATE_API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: texts,
        target: targetLang,
      }),
    });

    const data = await response.json();
    return data.data.translations.map(t => t.translatedText);
  } catch (error) {
    console.error('Translation error:', error);
    return texts;
  }
};

export { LANGUAGES };

