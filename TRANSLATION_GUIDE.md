# 🌍 Translation System Guide

## Current Setup (RECOMMENDED)

Your multilingual system is already set up and working! You have:

✅ i18next configured  
✅ 5 languages supported  
✅ Translation JSON files created  
✅ Components integrated with translations  

## 🎯 How It Works Now

When users switch languages in the navbar, the following updates automatically:
- Navbar menu items
- Features Section titles and descriptions
- Timeline/Roadmap milestones
- Presale steps and instructions

## 📝 Adding New Translations

### Method 1: Quick Add (Recommended)

Simply edit the translation files:

1. Open `src/locales/en/translation.json`
2. Add your new key:
```json
{
  "mySection": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

3. Copy this structure to the other language files:
- `src/locales/zh/translation.json`
- `src/locales/es/translation.json`
- `src/locales/fr/translation.json`
- `src/locales/ar/translation.json`

4. Translate the text in each file!

### Method 2: Use Google Translate API (Future Enhancement)

If you want automatic translation, you can:

1. Get a Google Translate API key
2. Use the provided `autoTranslate.js` utility
3. This will translate content on-the-fly

## 🚀 How to Add Translations to Components

### Step 1: Import the hook
```jsx
import { useTranslation } from 'react-i18next';
```

### Step 2: Use translations
```jsx
const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('mySection.title')}</h1>
      <p>{t('mySection.description')}</p>
    </div>
  );
};
```

## 🎨 Translation File Structure

Your translation files follow this structure:
```
src/locales/
  en/
    translation.json  (English - base language)
  zh/
    translation.json  (Chinese)
  es/
    translation.json  (Spanish)
  fr/
    translation.json  (French)
  ar/
    translation.json  (Arabic with RTL support)
```

## 💡 Why JSON Files?

✅ **Reliable** - No API calls, works offline  
✅ **Fast** - Translations load instantly  
✅ **SEO-friendly** - All content is server-rendered  
✅ **Professional** - Industry standard approach  
✅ **Maintainable** - Easy to update and review  

## 🔄 Language Switching

The language switcher is in the navbar (top right):
- Click the language button
- Select your language
- Entire site updates instantly
- Preference saved in localStorage

## 🎯 Current Translation Coverage

- ✅ Navbar (all menu items)
- ✅ Features Section (all cards)
- ✅ Timeline/Roadmap (all milestones)
- ✅ Presale Steps (all instructions)

## 📋 Quick Reference

### Existing translation keys you can use:

```jsx
// Common
t('common.welcome')
t('common.buy')
t('common.connect')

// Navbar
t('navbar.home')
t('navbar.aboutUs')
t('navbar.preSale')

// Features
t('features.title')
t('features.description')

// Timeline
t('timeline.title')
t('timeline.description')
t('timeline.milestones.ten.title')

// Presale
t('presale.heading')
t('presale.connectWallet')
t('presale.claimTokens')
```

## 🎉 Your System is Ready!

Just add translations to your JSON files and use the `t()` function in your components. The entire website will update when users switch languages!

