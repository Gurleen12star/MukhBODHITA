/**
 * MukhBODHITA — Internationalisation (i18n) Module
 * Supports: English (en), Hindi (hi), Punjabi (pa), Tamil (ta), Telugu (te)
 *
 * Usage:
 *   MB_i18n.setLanguage('hi');
 *   MB_i18n.t('hero_title');  // => "मुखबोधिता"
 */

const MB_i18n = (() => {
  let currentLang = 'en';

  const translations = {
    en: {
      hero_title:        'MukhBODHITA',
      hero_subtitle:     'AI-Powered Oral Cancer Screening',
      hero_cta:          'Start Free Screening',
      hero_tagline:      'Trusted by ASHA workers across India',
      nav_how:           'How It Works',
      nav_tech:          'Technology',
      nav_demo:          'Live Demo',
      nav_modes:         'Modes',
      login_title:       'Welcome Back',
      login_subtitle:    'Sign in to your account',
      register_title:    'Create Account',
      scan_step1_title:  'VOC Breath Analysis',
      scan_step2_title:  'Bio-Impedance Test',
      scan_results_title:'Screening Results',
      dashboard_title:   'Dashboard',
      verdict_malignant: 'Malignancy Indicators Detected',
      verdict_benign:    'No Malignancy Indicators',
    },
    hi: {
      hero_title:        'मुखबोधिता',
      hero_subtitle:     'AI-संचालित मुंह के कैंसर की जांच',
      hero_cta:          'मुफ़्त जांच शुरू करें',
      hero_tagline:      'भारत भर की आशा कार्यकर्ताओं का भरोसा',
      nav_how:           'यह कैसे काम करता है',
      nav_tech:          'तकनीक',
      nav_demo:          'लाइव डेमो',
      nav_modes:         'मोड',
      login_title:       'वापस स्वागत है',
      login_subtitle:    'अपने खाते में साइन इन करें',
      register_title:    'खाता बनाएं',
      scan_step1_title:  'VOC सांस विश्लेषण',
      scan_step2_title:  'बायो-इम्पेडेंस परीक्षण',
      scan_results_title:'जांच के परिणाम',
      dashboard_title:   'डैशबोर्ड',
      verdict_malignant: 'घातकता के संकेत मिले',
      verdict_benign:    'कोई घातकता संकेत नहीं',
    },
    pa: {
      hero_title:        'ਮੁਖਬੋਧਿਤਾ',
      hero_subtitle:     'AI-ਸੰਚਾਲਿਤ ਮੂੰਹ ਦੇ ਕੈਂਸਰ ਦੀ ਜਾਂਚ',
      hero_cta:          'ਮੁਫ਼ਤ ਜਾਂਚ ਸ਼ੁਰੂ ਕਰੋ',
      hero_tagline:      'ਭਾਰਤ ਭਰ ਦੀਆਂ ਆਸ਼ਾ ਵਰਕਰਾਂ ਦਾ ਭਰੋਸਾ',
      nav_how:           'ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ',
      nav_tech:          'ਤਕਨੀਕ',
      nav_demo:          'ਲਾਈਵ ਡੈਮੋ',
      nav_modes:         'ਮੋਡ',
      login_title:       'ਵਾਪਸ ਸੁਆਗਤ ਹੈ',
      login_subtitle:    'ਆਪਣੇ ਖਾਤੇ ਵਿੱਚ ਸਾਈਨ ਇਨ ਕਰੋ',
      register_title:    'ਖਾਤਾ ਬਣਾਓ',
      scan_step1_title:  'VOC ਸਾਹ ਵਿਸ਼ਲੇਸ਼ਣ',
      scan_step2_title:  'ਬਾਇਓ-ਇੰਪੈਡੈਂਸ ਟੈਸਟ',
      scan_results_title:'ਜਾਂਚ ਦੇ ਨਤੀਜੇ',
      dashboard_title:   'ਡੈਸ਼ਬੋਰਡ',
      verdict_malignant: 'ਘਾਤਕਤਾ ਦੇ ਸੰਕੇਤ ਮਿਲੇ',
      verdict_benign:    'ਕੋਈ ਘਾਤਕਤਾ ਸੰਕੇਤ ਨਹੀਂ',
    },
    ta: {
      hero_title:        'முகபோதிதா',
      hero_subtitle:     'AI-இயக்கும் வாய் புற்றுநோய் பரிசோதனை',
      hero_cta:          'இலவச பரிசோதனை தொடங்கு',
      hero_tagline:      'இந்தியா முழுவதும் ஆஷா பணியாளர்களால் நம்பப்படுகிறது',
      nav_how:           'எப்படி செயல்படுகிறது',
      nav_tech:          'தொழில்நுட்பம்',
      nav_demo:          'நேரடி டெமோ',
      nav_modes:         'முறைகள்',
      login_title:       'மீண்டும் வரவேற்கிறோம்',
      login_subtitle:    'உங்கள் கணக்கில் உள்நுழையவும்',
      register_title:    'கணக்கு உருவாக்கு',
      scan_step1_title:  'VOC மூச்சு பகுப்பாய்வு',
      scan_step2_title:  'உயிர் தடை சோதனை',
      scan_results_title:'பரிசோதனை முடிவுகள்',
      dashboard_title:   'டாஷ்போர்டு',
      verdict_malignant: 'தீங்கு குறிகாட்டிகள் கண்டறியப்பட்டன',
      verdict_benign:    'தீங்கு குறிகாட்டிகள் இல்லை',
    },
    te: {
      hero_title:        'ముఖబోధిత',
      hero_subtitle:     'AI-ఆధారిత నోటి క్యాన్సర్ స్క్రీనింగ్',
      hero_cta:          'ఉచిత స్క్రీనింగ్ ప్రారంభించండి',
      hero_tagline:      'భారతదేశంలో ASHA కార్యకర్తలు నమ్మిన సేవ',
      nav_how:           'ఇది ఎలా పని చేస్తుంది',
      nav_tech:          'సాంకేతికత',
      nav_demo:          'లైవ్ డెమో',
      nav_modes:         'మోడ్లు',
      login_title:       'తిరిగి స్వాగతం',
      login_subtitle:    'మీ ఖాతాలో సైన్ ఇన్ చేయండి',
      register_title:    'ఖాతా సృష్టించండి',
      scan_step1_title:  'VOC శ్వాస విశ్లేషణ',
      scan_step2_title:  'బయో-ఇంపెడెన్స్ పరీక్ష',
      scan_results_title:'స్క్రీనింగ్ ఫలితాలు',
      dashboard_title:   'డాష్‌బోర్డ్',
      verdict_malignant: 'హానికర సూచికలు కనుగొనబడ్డాయి',
      verdict_benign:    'హానికర సూచికలు లేవు',
    }
  };

  function t(key) {
    return (translations[currentLang] || translations.en)[key] || key;
  }

  function setLanguage(lang) {
    if (translations[lang]) {
      currentLang = lang;
      document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        const val = t(key);
        if (val) el.textContent = val;
      });
    }
  }

  function getLanguage() { return currentLang; }

  return { t, setLanguage, getLanguage, available: Object.keys(translations) };
})();
