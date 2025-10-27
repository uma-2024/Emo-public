# Multilingual System Guide

## ✅ Implementation Complete!

Your XIK website now supports 5 languages:
- 🇬🇧 **English** (en)
- 🇨🇳 **Mandarin Chinese** (zh)
- 🇪🇸 **Spanish** (es)
- 🇫🇷 **French** (fr)
- 🇸🇦 **Arabic** (ar)

## 📁 Files Created

### Core Files:
- `src/i18n.js` - i18n configuration
- `src/main.jsx` - Updated to initialize i18n

### Translation Files:
- `src/locales/en/translation.json` - English translations
- `src/locales/zh/translation.json` - Mandarin Chinese translations
- `src/locales/es/translation.json` - Spanish translations
- `src/locales/fr/translation.json` - French translations
- `src/locales/ar/translation.json` - Arabic translations

### Components:
- `src/components/LanguageSwitcher/LanguageSwitcher.jsx` - Language switcher component
- `src/components/LanguageSwitcher/LanguageSwitcher.css` - Language switcher styles
- `src/components/Navbar/Navbar.jsx` - Updated to include language switcher

## 🎯 How to Use Translations in Components

### 1. Basic Usage with useTranslation Hook:

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.description')}</p>
    </div>
  );
}
```

### 2. Example Implementation:

```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <div className="features-container">
      <div className="features-header">
        <h2>{t('features.title')}</h2>
        <p>{t('features.description')}</p>
      </div>
      {/* Rest of your component */}
    </div>
  );
};

export default FeaturesSection;
```

## 📝 Adding More Translations

To add more text translations, edit the translation files in `src/locales/[language]/translation.json`:

```json
{
  "yourNewKey": {
    "title": "Your Title",
    "description": "Your Description"
  }
}
```

## 🌐 Language Switcher

The language switcher is now integrated into the Navbar and appears in the top right corner. Users can:
1. Click the language button to see available languages
2. Select their preferred language
3. The entire website will automatically switch to that language
4. The preference is saved in localStorage

## 🔧 Configuration

The i18n configuration is in `src/i18n.js`. Key features:
- Automatic language detection from browser
- Language preference saved in localStorage
- Fallback to English if translation is missing
- RTL (Right-to-Left) support for Arabic (automatically handled)

## 📱 Responsive Design

The language switcher is fully responsive:
- Desktop: Shows flag + language name
- Mobile: Compact view with flag and shortened name

## 🎨 Styling

The language switcher uses the same color scheme as your site:
- Green accent color: `#5CFFB1`
- Dark background: `#111`
- Smooth transitions and animations

## 🚀 Next Steps

To add translations to other components:

1. **Import useTranslation hook**:
```jsx
import { useTranslation } from 'react-i18next';
```

2. **Add translation keys** to your language files:
```json
{
  "componentName": {
    "keyName": "Translated Text"
  }
}
```

3. **Use translations** in your component:
```jsx
const { t } = useTranslation();
return <div>{t('componentName.keyName')}</div>;
```

## 🌍 Current Translations Coverage

Currently translated sections:
- ✅ Common UI elements (buttons, labels)
- ✅ Navigation
- ✅ Hero section
- ✅ Features section
- ✅ Timeline/Roadmap
- ✅ Presale steps

## 💡 Tips

1. **Add namespace for complex sections**: For large sections, create separate namespace files
2. **Test all languages**: Always check RTL layout for Arabic
3. **Use interpolation**: For dynamic content, use `t('key', { value: variable })`
4. **Pluralization**: Handle plurals with proper i18n plural rules

## 🔍 Troubleshooting

**Q: Translations not showing?**
- Make sure `i18n.js` is imported in `main.jsx`
- Check browser console for errors
- Verify translation keys match exactly

**Q: Language switcher not appearing?**
- Verify the component is imported in Navbar
- Check CSS is loaded
- Clear browser cache

**Q: Arabic text not aligned correctly?**
- RTL is handled automatically by i18next
- Check your CSS for `direction: rtl` on Arabic locale

---

**Need help?** Check the [react-i18next documentation](https://react.i18next.com/)

