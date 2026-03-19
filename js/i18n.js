/**
 * Three Squirrels Overseas - Internationalization (i18n) System
 * Version: 1.0.0
 * Supports: English (en), Chinese (zh), Korean (ko), Malay (ms), Vietnamese (vi)
 */

class I18nManager {
  constructor() {
    this.currentLang = 'en';
    this.defaultLang = 'en';
    this.supportedLangs = ['en', 'zh', 'ko', 'ms', 'vi'];
    this.translations = {};
    this.initialized = false;
  }

  // Initialize the i18n system
  async init() {
    // Detect language from URL, localStorage, or browser
    this.currentLang = this.detectLanguage();

    // Load translations for current language
    await this.loadTranslations(this.currentLang);

    // Apply translations to the page
    this.applyTranslations();

    // Update URL if needed
    this.updateURL();

    // Update language switcher UI
    this.updateLanguageSwitcher();

    this.initialized = true;

    // Listen for language changes
    this.setupLanguageChangeListener();
  }

  // Detect the best language to display
  detectLanguage() {
    // Check URL path first
    const pathLang = this.getLangFromURL();
    if (pathLang && this.supportedLangs.includes(pathLang)) {
      return pathLang;
    }

    // Check localStorage
    const storedLang = localStorage.getItem('preferred_language');
    if (storedLang && this.supportedLangs.includes(storedLang)) {
      return storedLang;
    }

    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (this.supportedLangs.includes(browserLang)) {
      return browserLang;
    }

    // Default to English
    return this.defaultLang;
  }

  // Extract language from URL path
  getLangFromURL() {
    const path = window.location.pathname;
    const match = path.match(/^\/(en|zh|ko|ms|vi)\//);
    return match ? match[1] : null;
  }

  // Get URL path without language prefix
  getPathWithoutLang() {
    const path = window.location.pathname;
    return path.replace(/^\/(en|zh|ko|ms|vi)\//, '/');
  }

  // Load translations from JSON file
  async loadTranslations(lang) {
    try {
      const response = await fetch(`../i18n/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang} translations`);
      this.translations = await response.json();
      document.documentElement.lang = lang;
    } catch (error) {
      console.error(`Error loading ${lang} translations:`, error);
      // Fallback to English if translation file not found
      if (lang !== this.defaultLang) {
        await this.loadTranslations(this.defaultLang);
      }
    }
  }

  // Apply translations to all elements with data-i18n attribute
  applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      if (translation) {
        // Check if it's an HTML translation or plain text
        if (element.getAttribute('data-i18n-html') === 'true') {
          element.innerHTML = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Update meta tags
    this.updateMetaTags();
  }

  // Get translation by key path (e.g., "nav.home")
  getTranslation(key) {
    const keys = key.split('.');
    let value = this.translations;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return null;
      }
    }
    return value;
  }

  // Update meta tags (title, description)
  updateMetaTags() {
    const titleKey = this.getTranslation('meta.title');
    const descKey = this.getTranslation('meta.description');

    if (titleKey) {
      document.title = titleKey;
      // Update og:title if exists
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', titleKey);
    }

    if (descKey) {
      // Update description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', descKey);
      // Update og:description if exists
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', descKey);
    }
  }

  // Change language
  async changeLanguage(lang) {
    if (!this.supportedLangs.includes(lang) || lang === this.currentLang) return;

    this.currentLang = lang;
    localStorage.setItem('preferred_language', lang);

    await this.loadTranslations(lang);
    this.applyTranslations();
    this.updateURL();
    this.updateLanguageSwitcher();

    // Dispatch custom event for other components to handle
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { lang: lang }
    }));
  }

  // Update URL with current language
  updateURL() {
    const currentPath = this.getPathWithoutLang();
    const newPath = `/${this.currentLang}${currentPath === '/' ? '/' : currentPath}`;

    if (window.location.pathname !== newPath) {
      history.replaceState(null, '', newPath);
    }
  }

  // Update language switcher UI
  updateLanguageSwitcher() {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
      const lang = btn.getAttribute('data-lang');
      if (lang === this.currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update current language indicator
    const currentLangIndicator = document.querySelector('.current-lang-indicator');
    if (currentLangIndicator) {
      const langInfo = this.getLangInfo(this.currentLang);
      currentLangIndicator.textContent = langInfo.name;
    }
  }

  // Get language info (name, native name, flag)
  getLangInfo(lang) {
    const langInfo = {
      en: { code: 'en', name: 'English', native: 'English', flag: 'EN' },
      zh: { code: 'zh', name: 'Chinese', native: '中文', flag: '中' },
      ko: { code: 'ko', name: 'Korean', native: '한국어', flag: '한' },
      ms: { code: 'ms', name: 'Malay', native: 'Bahasa Melayu', flag: 'MS' },
      vi: { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', flag: 'VI' }
    };
    return langInfo[lang] || langInfo.en;
  }

  // Setup language change event listener
  setupLanguageChangeListener() {
    // Handle clicks on language buttons
    document.addEventListener('click', (e) => {
      const langBtn = e.target.closest('.lang-btn');
      if (langBtn) {
        const lang = langBtn.getAttribute('data-lang');
        this.changeLanguage(lang);
      }
    });
  }

  // Get current language
  getCurrentLang() {
    return this.currentLang;
  }

  // Get supported languages
  getSupportedLangs() {
    return this.supportedLangs;
  }
}

// Global instance
const i18n = new I18nManager();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  i18n.init();
});

// Export for use in other modules
window.i18n = i18n;
