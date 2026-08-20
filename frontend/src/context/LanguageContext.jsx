import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  EN: {
    slogan: 'make light matter',
    search: 'Search software, docs & specs...',
    navDesigner: 'LaserOptSimDESIGNER',
    navApplications: 'APPLICATIONS',
    navShop: 'SHOP',
    navSupport: 'SUPPORT',
    navWhoWeAre: 'WHO WE ARE',
    admin: 'Admin 🛡️',
    login: 'Login / Register',
    requestTrial: 'Request Free Trial',
    cart: 'Cart',
    footerCompany: 'LaserOptSim GmbH',
    footerAddress: 'Max-Planck-Straße 3, 12489 Berlin, Germany',
    footerPhone: '+49 30 40 36 69 72-0',
    footerEmail: 'info@laseroptsim.com',
    footerLegal: 'LEGAL NOTICE',
    footerPrivacy: 'PRIVACY STATEMENT',
    footerTerms: 'TERMS & CONDITIONS - SOFTWARE LICENSE AGREEMENT',
    footerSpecs: 'SERVICE SPECIFICATION',
    footerHowToOrder: 'HOW TO ORDER',
    footerVideos: 'You will find our videos at:',
    copyright: '© 2026 LaserOptSim GmbH. All Rights Reserved. Premier Physical Optics & Beam Propagation Simulation Software.',
    
    // Sub-Routes
    subFunctions: 'Functions',
    subBenefits: 'Benefits',
    subBasics: 'Basics',
    subProductVideos: 'Product videos',
    subBrochure: 'Brochure',
    subPartners: 'Our Partners',
    subTestimonials: 'Testimonials',
    subSysReqs: 'System requirements',
    subDemoVersion: 'Demo version',
    subTutorialTips: 'Videos, Tutorials & Tips',
    subFaq: 'FAQ',
    subHandbook: 'Handbook',
    subChangelog: 'Changelog, known issues and outlook',
  },
  DE: {
    slogan: 'make light matter',
    search: 'Software, Doku & Specs suchen...',
    navDesigner: 'LaserOptSimDESIGNER',
    navApplications: 'ANWENDUNGEN',
    navShop: 'SHOP',
    navSupport: 'SUPPORT',
    navWhoWeAre: 'ÜBER UNS',
    admin: 'Admin 🛡️',
    login: 'Anmelden / Registrieren',
    requestTrial: 'Testversion Anfordern',
    cart: 'Warenkorb',
    footerCompany: 'LaserOptSim GmbH',
    footerAddress: 'Max-Planck-Straße 3, 12489 Berlin, Deutschland',
    footerPhone: '+49 30 40 36 69 72-0',
    footerEmail: 'info@laseroptsim.com',
    footerLegal: 'IMPRESSUM',
    footerPrivacy: 'DATENSCHUTZERKLÄRUNG',
    footerTerms: 'AGB & SOFTWARE-LIZENZVERTRAG',
    footerSpecs: 'LEISTUNGSBESCHREIBUNG',
    footerHowToOrder: 'BESTELLVORGANG',
    footerVideos: 'Sie finden unsere Videos unter:',
    copyright: '© 2026 LaserOptSim GmbH. Alle Rechte vorbehalten. Physikalische Optik- & Strahlpropagationssoftware.',

    // Sub-Routes
    subFunctions: 'Funktionen',
    subBenefits: 'Vorteile',
    subBasics: 'Grundlagen',
    subProductVideos: 'Produktvideos',
    subBrochure: 'Broschüre',
    subPartners: 'Unsere Partner',
    subTestimonials: 'Kundenstimmen',
    subSysReqs: 'Systemvoraussetzungen',
    subDemoVersion: 'Demoversion',
    subTutorialTips: 'Videos, Tutorials & Tipps',
    subFaq: 'FAQ',
    subHandbook: 'Handbuch',
    subChangelog: 'Changelog, Bekannte Probleme & Ausblick',
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('EN');

  const toggleLanguage = (selectedLang) => {
    if (selectedLang) setLang(selectedLang);
    else setLang((prev) => (prev === 'EN' ? 'DE' : 'EN'));
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['EN'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
