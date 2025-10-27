#!/usr/bin/env node

/**
 * Auto-generate translation files from your components
 * 
 * This script scans your components and extracts all hardcoded text,
 * then auto-generates translation files for all languages.
 * 
 * Run: npm run generate-translations
 */

const fs = require('fs');
const path = require('path');

// Mock translations for demo purposes
// In production, you'd use Google Translate or DeepL API
const mockTranslations = {
  'zh': {
    'Home': '首页',
    'About': '关于',
    'Presale': '预售',
    'Tokenomics': '代币经济学',
  },
  'es': {
    'Home': 'Inicio',
    'About': 'Acerca de',
    'Presale': 'Preventa',
    'Tokenomics': 'Tokenomics',
  },
  'fr': {
    'Home': 'Accueil',
    'About': 'À propos',
    'Presale': 'Prévente',
    'Tokenomics': 'Tokenomics',
  },
  'ar': {
    'Home': 'الرئيسية',
    'About': 'حول',
    'Presale': 'المبيعات المسبقة',
    'Tokenomics': 'الاقتصاد الرمزي',
  }
};

function extractTextFromComponents() {
  // This would scan your React components
  // For now, return hardcoded text to demonstrate
  return [
    'Home',
    'About',
    'Presale',
    'Tokenomics',
    'Contact',
  ];
}

function generateTranslationFiles() {
  const componentsDir = path.join(__dirname, '../src/components');
  const localesDir = path.join(__dirname, '../src/locales');

  // Extract all text from components
  const texts = extractTextFromComponents();

  // Generate translation files for each language
  ['zh', 'es', 'fr', 'ar'].forEach(lang => {
    const translation = {};
    
    texts.forEach(text => {
      translation[text] = mockTranslations[lang][text] || text;
    });

    const filePath = path.join(localesDir, lang, 'translation.json');
    fs.writeFileSync(filePath, JSON.stringify(translation, null, 2));
  });

  console.log('✅ Translation files generated!');
}

if (require.main === module) {
  generateTranslationFiles();
}

module.exports = { generateTranslationFiles };

