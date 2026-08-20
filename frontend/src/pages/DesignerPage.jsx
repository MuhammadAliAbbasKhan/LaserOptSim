import React, { useState, useEffect } from 'react';

// Navigation data extracted from HTML
const navigationData = [
  {
    id: 1,
    title: "Home",
    url: "/en",
    isActive: false,
    isSibling: true,
    isFirst: true,
    submenu: null
  },
  {
    id: 2,
    title: "BeamXpertDESIGNER",
    url: "/en/beamxpertdesigner",
    isActive: true,
    isSibling: false,
    isFirst: false,
    submenu: [
      { title: "Functions", url: "/functions" },
      { title: "Benefits", url: "/benefits" },
      { title: "Basics", url: "/basics" },
      { title: "Product videos", url: "/product-videos" },
      { title: "Brochure", url: "/brochure" },
      { title: "Our Partners", url: "/our-partners" },
      { title: "Testimonials", url: "/en/testimonials" },
      { title: "System requirements", url: "/system-requirements" },
      { title: "Demo version", url: "/demo-version" }
    ]
  },
  {
    id: 3,
    title: "Applications",
    url: "/applications",
    isActive: false,
    isSibling: true,
    isFirst: false,
    submenu: null
  },
  {
    id: 4,
    title: "Shop",
    url: "/en/shop",
    isActive: false,
    isSibling: true,
    isFirst: false,
    submenu: null
  },
  {
    id: 5,
    title: "Support",
    url: "/en/support",
    isActive: false,
    isSibling: true,
    isFirst: false,
    submenu: [
      { title: "Videos, Tutorials & Tips", url: "/tutorials-tips" },
      { title: "FAQ", url: "/en/faq" },
      { title: "Handbook", url: "/handbook" },
      { title: "Changelog, known issues and outlook", url: "/en/changelog" }
    ]
  },
  {
    id: 6,
    title: "Who we are",
    url: "/who-we-are",
    isActive: false,
    isSibling: true,
    isFirst: false,
    submenu: [
      { title: "Team", url: "/en/team" },
      { title: "Awards", url: "/awards" },
      { title: "Ferdinand-Braun-Institut", url: "/en/ferdinand-braun-institut" },
      { title: "Associations", url: "/en/associations" },
      { title: "Sustainability", url: "/sustainability" },
      { title: "Contact us", url: "/contact-us" }
    ]
  }
];

// Footer navigation data
const footerNavData = [
  { title: "BeamXpertDESIGNER", url: "/en/beamxpertdesigner", isActive: true },
  { title: "Applications", url: "/applications", isActive: false },
  { title: "Shop", url: "/en/shop", isActive: false },
  { title: "Support", url: "/en/support", isActive: false },
  { title: "Who we are", url: "/who-we-are", isActive: false }
];

// Footer links data
const footerLinksData = [
  { title: "LEGAL NOTICE", url: "/en/legal-notice" },
  { title: "PRIVACY STATEMENT", url: "/en/data-privacy" },
  { title: "TERMS & CONDITIONS - SOFTWARE LICENSE AGREEMENT", url: "/terms-and-conditions" },
  { title: "SERVICE SPECIFICATION", url: "/service-specification" },
  { title: "HOW TO ORDER", url: "/en/shipping-and-payment" }
];

// USP features data
const uspFeaturesData = [
  {
    icon: "/files/beamxpert/img/icons/bxp-designer-software-usp-icon-1.svg",
    title: "Rapid to learn,<br>easy to use",
    description: "After just 1 hour of training,<br>the first reliable results are obtained",
    alt: "Learn laser simulation software BeamXpertDESIGNER quickly and operate it easily - achieve reliable results after one hour"
  },
  {
    icon: "/files/beamxpert/img/icons/bxp-designer-software-usp-icon-2.svg",
    title: "Intuitive operating<br>with Drag & Drop",
    description: "Direct clicking, moving and<br>rotating of optical components",
    alt: "Work quickly and easily with BeamXpertDESIGNER via drag & drop"
  },
  {
    icon: "/files/beamxpert/img/icons/bxp-designer-software-usp-icon-3.svg",
    title: "CAD-like<br>3D representation",
    description: "Instructive visual work<br>with 3D objects",
    alt: "Fast visual work with BeamXpertDESIGNER thanks to CAD-like representations"
  },
  {
    icon: "/files/beamxpert/img/icons/bxp-designer-software-usp-icon-4.svg",
    title: "Real-time<br>simulation",
    description: "Responsive basic algorithm<br>enables 3D real-time simulation",
    alt: "BeamXpertDESIGNER allows the simulation of optical systems for laser radiation in real time thanks to fast algorithms"
  },
  {
    icon: "/files/beamxpert/img/icons/bxp-designer-software-usp-icon-5.svg",
    title: "Component<br>database",
    description: "Integrate optical components<br>from common manufacturers",
    alt: "BeamXpertDESIGNER contains a database with optical components of important manufacturers like Edmund Optics, Newport, EKSMA, asphericon etc."
  },
  {
    icon: "/files/beamxpert/img/icons/usp-icon-aberrationen-im-griff.svg",
    title: "Aberrations<br>under control",
    description: "Optical system<br>easily analyzed and optimized",
    alt: "Fast analysis and optimization of optical system aberrations used for laser beams with BeamXpertDESIGNER software"
  },
  {
    icon: "/files/beamxpert/img/icons/bxp-designer-software-usp-icon-6.svg",
    title: "Results conforming<br>to laser standards",
    description: "Output of laser beam parameters<br>according to ISO 11145 and 11146",
    alt: "Laser beam parameters according to ISO 11145 and ISO 11146 are calculated and provided by BeamXpertDESIGNER"
  },
  {
    icon: "/files/beamxpert/img/icons/usp-icon-bxp-to-zmx.svg",
    title: "Frontend for<br>raytracing software",
    description: "Create set-up quickly<br>and export as .zmx file",
    alt: "Quickly design optical laser set-ups and export zmx files to other programs using BeamXpertDESIGNER"
  }
];

// Language switcher data
const languageData = [
  { code: "DE", url: "https://www.beamxpert.com/beamxpertdesigner", isActive: false },
  { code: "EN", url: "#", isActive: true }
];

export function DesignerPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVimeoModalOpen, setIsVimeoModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleSubmenu = (id) => {
    setOpenSubmenus(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const stopScrolling = (e) => {
    // Function to stop scrolling when modal is open
    document.body.style.overflow = e.target.checked ? 'hidden' : '';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <div className="win chrome blink ch151 u-text-transform--none" itemScope itemType="http://schema.org/WebPage">
        <noscript>
          <div className="u-bgcolor--alert u-center">
            <p className="u-color--white">
              <strong>JavaScript is disabled in your browser.</strong> To use the full extent of the website, please enable JavaScript in your browser settings!
            </p>
          </div>
        </noscript>
        
        <div className="o-wrapper">
    
    
          <main className="c-main" itemScope itemType="https://www.beamxpert.com/files/beamxpert/img/header/header-beamxpertdesigner-laser-beam-simulation-simulation-laserpropagation-software-03.jpg" itemProp="mainContentOfPage">
            {/* Intro Section */}
            <div className="mod_article first u-pt--large u-pb--large block">
              <div className="row"  >
                    <img src="https://www.beamxpert.com/files/beamxpert/img/header/header-beamxpertdesigner-laser-beam-simulation-simulation-laserpropagation-software-03.jpg" alt="" srcset="" />
                <div className="u-mb@small-only column medium-12 large-12 ce_responsive_column_start first">
                  <h2 className="ce_headline">Make light matter</h2>
                  <div className="ce_text block">
                    <p>The BeamXpertDESIGNER software simulates the propagation of laser radiation through optical systems in real time, offers intuitive operation with CAD-like 3D representation and speaks the language of laser technology. The easy learnability and the pronounced interactivity make it possible to achieve precise results quickly.</p>
                  </div>
                  <div className="ce_text u-size--18 block">
                    <p><strong>Outcome:</strong> Increased added value through significantly accelerated workflow!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Section */}
            <div className="mod_article u-center u-pt--xlarge u-pb--xlarge o-shape--top-right o-shape--top-right--white u-has-bgimage block lazyloaded" style={{ backgroundPosition: 'center center', backgroundImage: 'url("/files/beamxpert/img/background/background-3.jpg")' }}>
              <div className="row">
                <div className="ce_vimeo first last block">
                  <label className="c-btn--play" htmlFor="c-vimeo-page--65" title="Play"></label>
                </div>
              </div>
            </div>

            {/* USP Section */}
            <div className="mod_article u-pt--medium u-pb--medium u-bgcolor--gray-light u-has-bgcolor o-shape--bottom-right o-shape--bottom-right--gray-light block">
              <div className="row">
                <h2 className="ce_headline column first">Slim and fast - focused on essential features</h2>
                <div className="medium-up-2 large-up-4 js-up-2@medium js-up-4@large">
                  {uspFeaturesData.map((feature, index) => (
                    <div key={index} className="c-block-grid-container--icon column column-block ce_block_grid_item">
                      <div className="c-block-grid-container__wrapper">
                        <div className="c-block-grid-container__image-container">
                          <img 
                            className="lazyloaded" 
                            data-expand="200" 
                            data-src={feature.icon} 
                            src={feature.icon} 
                            style={{ width: '100%', height: '100%' }} 
                            alt={feature.alt} 
                            title={feature.alt}
                          />
                          <noscript>
                            <img src={feature.icon} style={{ width: '100%', height: '100%' }} alt={feature.alt} title={feature.alt} />
                          </noscript>
                        </div>
                        <div className="c-block-grid-container__text-container">
                          <h4 className="c-block-grid-container__headline js-equalizer__item" dangerouslySetInnerHTML={{ __html: feature.title }}></h4>
                          <div className="c-block-grid-container__text js-equalizer__item--secound" dangerouslySetInnerHTML={{ __html: `<p>${feature.description}</p>` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inside BeamXpertDESIGNER Section */}
            <div className="mod_article u-pt--large u-pb--large o-shape--top-right o-shape--top-right--gray-light block">
              <div className="row">
                <h2 className="ce_headline column first">Inside BeamXpertDESIGNER</h2>
                <div className="u-mb@small-only column medium-6 large-6 ce_responsive_column_start">
                  <div className="ce_text block">
                    <p>BeamXpertDESIGNER uses two different modeling approaches. The first model uses the propagation of the first and second order moments of the intensity distributions for simulation. A proprietary approach allows a less restrictive application of the paraxial approximation. Since the calculation is very fast, the simulation can be performed in real time.</p>
                    <p>In the second model, the laser radiation is represented by a bundle of geometrical-optical beams propagated through the system using classical raytracing. These beams are designed to correspond to the so-called Gauss-Schell model. From the beam, the beam propagation parameters, including the particularly important beam quality factor M<sup>2</sup>, can be derived at any location in the optical system.</p>
                  </div>
                </div>
                <div className="u-mb@small-only column medium-6 large-6 ce_responsive_column_start">
                  <div className="ce_text block">
                    <p>The extent of aberrations (e.g. due to inappropriate lens selection or arrangement) can be detected by analyzing the beam quality factor of the beam as it passes through the optical system.</p>
                    <p>Therefore, a typical workflow is the interactive design of the optical system using the propagation of the intensity moments with subsequent control for aberrations with the aid of Gauss-Schell beams.</p>
                  </div>
                  <div className="ce_hyperlink block">
                    <a href="basics" className="hyperlink_txt" title="Mehr zu den Grundlagen" rel="">More about the basics ...</a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mod_article u-center last u-pt--xlarge u-pb--xlarge u-bgcolor--gray u-has-bgcolor o-shape--top-left o-shape--top-left--white block">
              <div className="row">
                <h2 className="ce_headline first u-color--white u-weight--bold u-mb--medium">Get to know BeamXpertDESIGNER</h2>
                <div className="ce_button u-inline-block u-pv">
                  <a href="product-videos" title="PRODUCT VIDEO">
                    <span className="c-btn c-btn--gray">PRODUCT VIDEO</span>
                  </a>
                </div>
                <div className="ce_button u-inline-block u-pv last">
                  <a href="demo-version" title="DEMO VERSION">
                    <span className="c-btn c-btn--blue">DEMO VERSION</span>
                  </a>
                </div>
              </div>
            </div>
          </main>

  
        </div>
      </div>

      <style jsx>{`
        /* Reset and Base */
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          line-height: 1.6;
          color: #333;
        }

        .o-wrapper {
          max-width: 100%;
          overflow-x: hidden;
        }

        /* Utility Classes */
        .u-text-transform--none {
          text-transform: none !important;
        }

        .u-bgcolor--alert {
          background-color: #dc3545;
        }

        .u-color--white {
          color: #ffffff !important;
        }

        .u-center {
          text-align: center;
        }

        .u-pt--none {
          padding-top: 0 !important;
        }

        .u-pb--none {
          padding-bottom: 0 !important;
        }

        .u-pt--large {
          padding-top: 2rem !important;
        }

        .u-pb--large {
          padding-bottom: 2rem !important;
        }

        .u-pt--xlarge {
          padding-top: 4rem !important;
        }

        .u-pb--xlarge {
          padding-bottom: 4rem !important;
        }

        .u-pt--medium {
          padding-top: 1.5rem !important;
        }

        .u-pb--medium {
          padding-bottom: 1.5rem !important;
        }

        .u-mb--medium {
          margin-bottom: 1.5rem !important;
        }

        .u-bgcolor--gray-light {
          background-color: #f8f9fa !important;
        }

        .u-bgcolor--gray {
          background-color: #6c757d !important;
        }

        .u-color--white {
          color: #ffffff !important;
        }

        .u-weight--bold {
          font-weight: 700 !important;
        }

        .u-mb--medium {
          margin-bottom: 1.5rem !important;
        }

        .u-inline-block {
          display: inline-block !important;
        }

        .u-pv {
          padding-top: 0.5rem !important;
          padding-bottom: 0.5rem !important;
        }

        .u-size--18 {
          font-size: 1.125rem !important;
        }

        .u-has-bgimage {
          background-size: cover !important;
          background-position: center !important;
        }

        .u-has-bgcolor {
          position: relative;
        }

        /* Layout */
        .row {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
        }

        .column {
          padding: 0 15px;
        }

        .medium-12 {
          flex: 0 0 100%;
          max-width: 100%;
        }

        .medium-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }

        .medium-3 {
          flex: 0 0 25%;
          max-width: 25%;
        }

        .medium-5 {
          flex: 0 0 41.66667%;
          max-width: 41.66667%;
        }

        .medium-4 {
          flex: 0 0 33.33333%;
          max-width: 33.33333%;
        }

        .large-2 {
          flex: 0 0 16.66667%;
          max-width: 16.66667%;
        }

        .medium-up-2 {
          display: flex;
          flex-wrap: wrap;
        }

        .medium-up-2 .column {
          flex: 0 0 50%;
          max-width: 50%;
        }

        .large-up-4 {
          display: flex;
          flex-wrap: wrap;
        }

        .large-up-4 .column {
          flex: 0 0 25%;
          max-width: 25%;
        }

        @media (max-width: 768px) {
          .medium-up-2 .column {
            flex: 0 0 100%;
            max-width: 100%;
          }
          
          .large-up-4 .column {
            flex: 0 0 100%;
            max-width: 100%;
          }

          .medium-6, .medium-3, .medium-5, .medium-4, .large-2 {
            flex: 0 0 100%;
            max-width: 100%;
          }

          .u-mb\\@small-only {
            margin-bottom: 1rem !important;
          }

          .hide-for-medium {
            display: block !important;
          }
        }

        @media (min-width: 769px) {
          .hide-for-medium {
            display: none !important;
          }
        }

        /* Header */
        .c-header {
          position: relative;
        }

        .c-header__inside {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 15px;
          background: #fff;
          border-bottom: 1px solid #e9ecef;
        }

        .c-logo {
          flex-shrink: 0;
        }

        .c-logo__link {
          display: block;
          width: 180px;
          height: 45px;
          background: url('/files/beamxpert/img/general/bxp-logo.svg') no-repeat center;
          background-size: contain;
          text-indent: -9999px;
        }

        .c-nav-header {
          display: flex;
          align-items: center;
          flex: 1;
          justify-content: flex-end;
        }

        .c-nav-header__menu-button {
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0.5rem;
          background: none;
          border: none;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #333;
        }

        .c-nav-header__menu-icon {
          display: inline-block;
          width: 24px;
          height: 2px;
          background: #333;
          position: relative;
          margin-right: 8px;
        }

        .c-nav-header__menu-icon::before,
        .c-nav-header__menu-icon::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 2px;
          background: #333;
          left: 0;
        }

        .c-nav-header__menu-icon::before {
          top: -6px;
        }

        .c-nav-header__menu-icon::after {
          bottom: -6px;
        }

        .c-nav-header__checkbox {
          display: none;
        }

        .c-nav-header__wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .c-nav-header__wrapper {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #fff;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 1000;
          }

          .c-nav-header__checkbox:checked ~ .c-nav-header__wrapper {
            display: flex;
          }
        }

        /* Language Switcher */
        .mod_changelanguage {
          display: flex;
          align-items: center;
        }

        .mod_changelanguage ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          gap: 0.5rem;
        }

        .mod_changelanguage li {
          display: inline-block;
        }

        .mod_changelanguage a,
        .mod_changelanguage strong {
          display: block;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          text-decoration: none;
          color: #333;
          font-weight: 600;
        }

        .mod_changelanguage .active strong {
          color: #0066b3;
          text-decoration: underline;
        }

        /* Search */
        .c-form-search-website {
          position: relative;
        }

        .c-form-search-website__button {
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0.25rem 0.5rem;
          background: none;
          border: none;
        }

        .c-header__search-icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='M21 21l-4.35-4.35'/%3E%3C/svg%3E") no-repeat center;
          background-size: contain;
        }

        .c-form-search-website__checkbox {
          display: none;
        }

        .c-form-search-website .formbody {
          display: none;
          position: absolute;
          right: 0;
          top: 100%;
          background: #fff;
          padding: 0.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-radius: 4px;
          white-space: nowrap;
        }

        .c-form-search-website__checkbox:checked ~ form .formbody {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .widget-text input[type="search"] {
          padding: 0.25rem 0.5rem;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 0.875rem;
          width: 200px;
        }

        .widget-submit button {
          padding: 0.25rem 0.75rem;
          background: #0066b3;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.75rem;
        }

        .widget-close {
          display: none;
        }

        /* Main Navigation */
        .mod_navigation ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          gap: 0.5rem;
        }

        .mod_navigation .level_1 > li {
          position: relative;
        }

        .mod_navigation .level_1 > li > a {
          display: block;
          padding: 0.5rem 0.75rem;
          text-decoration: none;
          color: #333;
          font-size: 0.875rem;
          font-weight: 500;
          transition: color 0.2s;
        }

        .mod_navigation .level_1 > li > a:hover,
        .mod_navigation .level_1 > li.active > a {
          color: #0066b3;
        }

        .mod_navigation .level_2 {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background: #fff;
          min-width: 220px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-radius: 4px;
          padding: 0.5rem 0;
          flex-direction: column;
          gap: 0;
        }

        .mod_navigation .level_1 > li:hover .level_2 {
          display: flex;
        }

        .mod_navigation .level_2 li {
          display: block;
        }

        .mod_navigation .level_2 a {
          display: block;
          padding: 0.5rem 1rem;
          color: #333;
          text-decoration: none;
          font-size: 0.75rem;
          transition: background 0.2s;
        }

        .mod_navigation .level_2 a:hover {
          background: #f8f9fa;
          color: #0066b3;
        }

        .submenu__checkbox,
        .submenu__button {
          display: none;
        }

        @media (max-width: 768px) {
          .mod_navigation ul {
            flex-direction: column;
            width: 100%;
          }

          .mod_navigation .level_2 {
            position: static;
            box-shadow: none;
            padding-left: 1rem;
          }

          .mod_navigation .level_1 > li:hover .level_2 {
            display: none;
          }

          .submenu__checkbox:checked ~ .level_2 {
            display: flex !important;
          }

          .submenu__button {
            display: inline-block;
            cursor: pointer;
            padding: 0.25rem 0.5rem;
            position: absolute;
            right: 0;
            top: 0;
          }

          .submenu__icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            border: solid #333;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
            transition: transform 0.2s;
          }

          .submenu__checkbox:checked ~ .submenu__button .submenu__icon {
            transform: rotate(-135deg);
          }
        }

        /* Hero Section */
        .c-header__hero {
          position: relative;
        }

        .c-hero {
          position: relative;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .c-hero__image {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          z-index: 0;
        }

        .c-hero__wrapper {
          position: relative;
          z-index: 1;
          text-align: center;
          color: #fff;
          padding: 2rem 15px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .c-hero__headline {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .c-hero__text {
          font-size: 1.25rem;
          font-weight: 400;
        }

        .mod_button {
          text-align: center;
          padding: 1.5rem 0;
          background: #fff;
        }

        .c-btn {
          display: inline-block;
          padding: 0.75rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 4px;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .c-btn--blue {
          background: #0066b3;
          color: #fff;
        }

        .c-btn--blue:hover {
          background: #00529c;
        }

        .c-btn--gray {
          background: #6c757d;
          color: #fff;
        }

        .c-btn--gray:hover {
          background: #5a6268;
        }

        .c-btn--large {
          padding: 1rem 3rem;
          font-size: 1.125rem;
        }

        /* Content Sections */
        .ce_headline {
          font-size: 2rem;
          font-weight: 300;
          color: #333;
          margin-bottom: 1rem;
        }

        .ce_text {
          margin-bottom: 1.5rem;
        }

        .ce_text p {
          margin: 0 0 1rem 0;
        }

        .ce_hyperlink a {
          color: #0066b3;
          text-decoration: none;
          font-weight: 500;
        }

        .ce_hyperlink a:hover {
          text-decoration: underline;
        }

        /* Video Play Button */
        .ce_vimeo {
          text-align: center;
          padding: 2rem 0;
        }

        .c-btn--play {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(0, 102, 179, 0.9);
          color: #fff;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
          position: relative;
        }

        .c-btn--play::after {
          content: '';
          display: inline-block;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 15px 0 15px 25px;
          border-color: transparent transparent transparent #fff;
          margin-left: 8px;
        }

        .c-btn--play:hover {
          transform: scale(1.05);
          background: rgba(0, 102, 179, 1);
        }

        /* USP Grid */
        .c-block-grid-container--icon {
          margin-bottom: 1.5rem;
        }

        .c-block-grid-container__wrapper {
          text-align: center;
          padding: 1rem;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          height: 100%;
          transition: box-shadow 0.2s;
        }

        .c-block-grid-container__wrapper:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }

        .c-block-grid-container__image-container {
          width: 80px;
          height: 80px;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .c-block-grid-container__image-container img {
          max-width: 100%;
          height: auto;
        }

        .c-block-grid-container__headline {
          font-size: 1rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .c-block-grid-container__text {
          font-size: 0.875rem;
          color: #6c757d;
          line-height: 1.4;
        }

        /* Footer */
        .c-footer {
          background: #1a1a2e;
          color: rgba(255,255,255,0.7);
          padding: 3rem 0 2rem;
        }

        .c-footer .row {
          display: flex;
          flex-wrap: wrap;
        }

        .c-footer .columns {
          padding: 0 15px;
        }

        .c-footer a {
          display: block;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-size: 0.875rem;
          padding: 0.25rem 0;
          transition: color 0.2s;
        }

        .c-footer a:hover {
          color: #fff;
        }

        .c-footer p {
          margin: 0 0 1rem 0;
          color: rgba(255,255,255,0.7);
          font-size: 0.875rem;
        }

        .c-footer .mod_customnav ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .c-footer .mod_customnav li {
          margin-bottom: 0.25rem;
        }

        .c-footer .mod_customnav a {
          display: block;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-size: 0.875rem;
        }

        .c-footer .mod_customnav strong {
          color: #fff;
          font-weight: 600;
        }

        /* Modal */
        .c-modal {
          display: none;
        }

        .c-modal__checkbox {
          display: none;
        }

        .c-modal__background {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          z-index: 9999;
          display: none;
          align-items: center;
          justify-content: center;
        }

        .c-modal__checkbox:checked ~ .c-modal__background {
          display: flex;
        }

        .c-modal__window {
          background: #fff;
          border-radius: 8px;
          max-width: 90%;
          max-height: 90%;
          overflow: auto;
          position: relative;
          width: 853px;
        }

        .c-modal__close {
          position: absolute;
          top: 10px;
          right: 20px;
          font-size: 2rem;
          cursor: pointer;
          color: #333;
          z-index: 1;
          line-height: 1;
        }

        .c-modal__close:hover {
          color: #000;
        }

        .c-modal__container {
          padding: 2rem;
        }

        .c-modal__container--video {
          padding: 0;
        }

        .c-modal__container--video .c-modal__close {
          color: #fff;
          top: 10px;
          right: 20px;
        }

        .o-media--video {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
        }

        .o-media--video iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        /* GDPR Form */
        .c-gdpr-note__form {
          padding: 1rem 0;
        }

        .c-gdpr-note__form h3 {
          margin-top: 0;
          font-size: 1.5rem;
          font-weight: 300;
        }

        .c-gdpr-note__checkbox-container {
          margin: 1rem 0;
        }

        .c-gdpr-note__checkbox {
          margin-right: 0.5rem;
        }

        .c-gdpr-note__message {
          font-size: 0.875rem;
          color: #666;
        }

        .c-gdpr-note__message a {
          color: #0066b3;
          text-decoration: none;
        }

        .c-gdpr-note__message a:hover {
          text-decoration: underline;
        }

        .c-gdpr-note__button-container {
          margin-top: 1rem;
        }

        .c-gdpr-note__button {
          padding: 0.5rem 2rem;
        }

        /* Shape Decorations */
        .o-shape--top-right::before,
        .o-shape--top-left::before,
        .o-shape--bottom-right::before {
          content: '';
          position: absolute;
          width: 100px;
          height: 100px;
          pointer-events: none;
        }

        .o-shape--top-right::before {
          top: 0;
          right: 0;
          background: radial-gradient(circle at top right, #fff 0%, transparent 70%);
        }

        .o-shape--top-left::before {
          top: 0;
          left: 0;
          background: radial-gradient(circle at top left, #fff 0%, transparent 70%);
        }

        .o-shape--bottom-right::before {
          bottom: 0;
          right: 0;
          background: radial-gradient(circle at bottom right, #f8f9fa 0%, transparent 70%);
        }

        .o-shape--top-right--white::before {
          background: radial-gradient(circle at top right, #fff 0%, transparent 70%);
        }

        .o-shape--bottom-right--gray-light::before {
          background: radial-gradient(circle at bottom right, #f8f9fa 0%, transparent 70%);
        }

        .o-shape--top-left--white::before {
          background: radial-gradient(circle at top left, #fff 0%, transparent 70%);
        }

        /* Responsive Media Queries */
        @media (max-width: 768px) {
          .c-hero__headline {
            font-size: 1.5rem;
          }
          
          .c-hero__text {
            font-size: 1rem;
          }
          
          .ce_headline {
            font-size: 1.5rem;
          }
          
          .c-btn--large {
            padding: 0.75rem 1.5rem;
            font-size: 0.875rem;
          }
          
          .c-footer .row {
            flex-direction: column;
          }
          
          .c-footer .columns {
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .c-hero__headline {
            font-size: 1.25rem;
          }
          
          .c-hero {
            min-height: 250px;
          }
          
          .c-modal__window {
            max-width: 100%;
            max-height: 100%;
            border-radius: 0;
          }
        }

        /* Invisible Utility */
        .invisible {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
      `}</style>
    </>
  );
}