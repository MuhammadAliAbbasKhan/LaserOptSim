import React from 'react';

// Data arrays extracted from HTML
const infoCards = [
  {
    id: 1,
    image: "files/beamxpert/img/article/BeamXpert-Team%20im%20Treppenhaus%20-%20Ausschnitt%20von%20Bild%2028357%20jpg%20100er%20Qualit%C3%A4t%20und%20739%20Pixel%20breit.jpg",
    alt: "BeamXpert team in the staircase of the ZMM - Dr. Bernd Eppich and Dr. Guido Mann",
    title: "BeamXpert team",
    headline: "Team",
    text: "<p>We are a team of PhD physicists with more than 50 years experience in theoretical and practical laser physics who founded BeamXpert GmbH as a spin-off of the Ferdinand- Braun-Institut. Due to our daily work, the lack of an easy-to-use simulation software for laser radiation was regularly brought to our attention.</p><p>&nbsp;</p>",
    link: "/en/team",
    linkText: "Read more ..."
  },
  {
    id: 2,
    image: "files/beamxpert/img/article/human-3509144_739x520%20px%20von%20geralt.jpg",
    alt: "About us - Awards for BeamXpert GmbH - Successful at BPW and start-up competition with BeamXpertDESIGNER",
    title: "About us - Awards for BeamXpert GmbH",
    headline: "Awards",
    text: "<p>BeamXpert has already received two awards. Once in the \"Gründerwettbewerb - Digitale Innovationen\" and previously in \"BPW\" (Business Plan Competition).</p><p>&nbsp;</p><p>&nbsp;</p>",
    link: "/awards",
    linkText: "Read more ..."
  },
  {
    id: 3,
    image: "files/beamxpert/img/article/bxp-article-beamxpertdesigner-laser-propagation-anwendung-02.jpg",
    alt: "Building of the Ferdinand-Braun-Institut, Leibniz-Institut für Höchstfrequenztechnik (FBH) in Berlin-Adlershof",
    title: "FBH building in Berlin-Adlershof",
    headline: "Ferdinand-Braun-Institut (FBH)",
    text: "<p>The Ferdinand-Braun-Institut, Leibniz-Institut für Höchstfrequenztechnik (FBH) researches electronic and optical components, modules and systems based on compound semiconductors. These are key component parts for innovations in the fields of communication, energy, health and mobility. Powerful and highly brilliant diode lasers, ...</p><p>&nbsp;</p>",
    link: "/en/ferdinand-braun-institut",
    linkText: "Read more ..."
  },
  {
    id: 4,
    image: "files/beamxpert/img/article/nature-3335678_739x520%20px%20von%20tweetypics.jpg",
    alt: "BeamXpertDESIGNER developed for the laser market and BeamXpert GmbH contributes to sustainability - for protection of earth.",
    title: "BeamXpertDESIGNER and BeamXpert GmbH - Our Contribution to Sustainability",
    headline: "Sustainability",
    text: "<p>Sustainable action is important to us. Starting with small everyday items such as office supplies through to BeamXpertDESIGNER mailing materials and the associated advertising materials, we pay attention to a solution that is as sustainable and environmentally friendly as possible.</p><p>&nbsp;</p>",
    link: "/sustainability",
    linkText: "Read more ..."
  }
];

const newsItems = [
  {
    id: 1,
    image: "files/beamxpert/img/news/CustomProfiles_News%2090%25%20111225.jpg",
    alt: "Custom Profiles - Since the latest version, BeamXpertDESIGNER can also work with predefined intensity distributions",
    title: "Custom Profiles – New in BeamXpertDESIGNER",
    subheadline: "News",
    headline: "Version 0.98.0.13 of BeamXpertDESIGNER released",
    text: "<p>The latest version of BeamXpertDESIGNER was released in early December 2025. It is based on extensive user feedback and consistently pursues our goal of providing a practically oriented tool.</p><p>More information about the new features can be found in the changelog.</p><p>&nbsp;</p>",
    link: "https://www.beamxpert.com/en/changelog"
  },
  {
    id: 2,
    image: "files/beamxpert/img/news/laser_logo_1zeilig_rgb.jpg",
    alt: "LASER World of PHOTONICS 2022 with BeamXpertDESIGNER at booth B5.528 in hall B2",
    title: "LASER World of PHOTONICS 2022 with BeamXpertDESIGNER",
    subheadline: "News",
    headline: "LASER World of Photonics 2025 - BeamXpert exhibiting at Berlin Partner booth",
    text: "<p>The next \"LASER World of PHOTONICS\" trade show in Munich in 2025 will run from June 24 to 27.</p><p>We will be part of the Berlin Partner booth (A2.117) once again.</p><p>There, we will present the latest features of our BeamXpertDESIGNER software and the BeamXpert team is looking forward to the personal dialog with our numerous users and the contact with interested parties.</p>",
    link: "https://exhibitors.world-of-photonics.com/exhibitor-portal/2025/hallplans/hallplan/?elb=178.1100.4464.1.111&clb=178.1200.1893.1.111&lid=A2"
  },
  {
    id: 3,
    image: "files/beamxpert/img/news/Optatec%202024%20Spectaris%20Workshop%20BeamXpert.png",
    alt: "Workshop SPECTARIS @ OPTATEC 2024 with presentation given by Dr. Bernd Eppich",
    title: "Workshop SPECTARIS @ OPTATEC 2024",
    subheadline: "News",
    headline: "Optatec 2024 - BeamXpertDESIGNER to be presented at SPECTARIS workshop",
    text: "<p>As part of Optatec 2024, Dr. Eppich will present our laser beam simulation software BeamXpertDESIGNER at SPECTARIS workshop \"Professional software for the development of optical and precision mechanical components\" (from 1 pm in hall 3, conference room \"Facette\") on May 15, 2024 and will be available for a lively exchange of information afterwards.</p><p>&nbsp;</p><p>&nbsp;</p>",
    link: "https://www.spectaris.de/photonik/termine/detail/optatec-2024"
  },
  {
    id: 4,
    image: "files/beamxpert/img/news/Brandenburger%20Tor%20Ukraine%20260222.png",
    alt: "Ukraine war - Export stop BeamXpertDESIGNER - Brandenburg Gate in Ukrainian national colors",
    title: "Ukraine war - Export stop BeamXpertDESIGNER",
    subheadline: "News",
    headline: "Ukraine war - export stop to Russia and Belarus",
    text: "<p>Due to the war in Ukraine, we stop the distribution of BeamXpertDESIGNER to Russia and Belarus for an unpredictable period of time. Peacefulness is an absolute prerequisite for a business relationship.</p><p>This is independent from possible measures of sanctions on European level.</p><p>Our solidarity is with all innocent victims of this senseless conflict.</p>",
    link: "https://www.amnesty.org/en/latest/news/2022/02/russian-military-commits-indiscriminate-attacks-during-the-invasion-of-ukraine/"
  }
];

export function WhoWeArePage() {
  return (
    <>
      <div className="o-wrapper">
        <main className="c-main" itemScope itemType="http://schema.org/WebPageElement" itemProp="mainContentOfPage">
          <div className="mod_article first u-pt--large u-pb--medium block">
            <div className="row">
              <div className="u-mb@small-only column medium-12 large-12 ce_responsive_column_start first">
                <h2 className="ce_headline">
                  The BeamXpert GmbH in Berlin
                </h2>
                <div className="ce_text block">
                  <p>BeamXpert GmbH was founded as a spin-off of the Ferdinand-Braun-Institut, Leibniz-Institut für Höchstfrequenztechnik (FBH) in Berlin. The company headquarters in Berlin-Adlershof in the city for science, economy and media offers us a stimulating scientific environment.</p>
                  <p>The BeamXpert team consists of PhD physicists with more than 50 years experience in theoretical and practical laser physics. Due to our daily work, the lack of an easy-to-use simulation software for laser radiation, which allows to calculate the propagation of laser radiation in optical systems, has been regularly brought to our attention.</p>
                  <p>A national and international network in research and industry guarantees us regular feedback on the everyday use of software.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mod_article u-pt--large u-pb--medium u-bgcolor--gray-light u-has-bgcolor o-shape--bottom-left o-shape--bottom-left--gray-light block">
            <div className="row">
              <h2 className="ce_headline column first u-mb">
                MORE INFO ABOUT BEAMXPERT
              </h2>
              <div className="medium-up-2 large-up-4 js-up-2@medium js-up-4@large" data-equalizer="">
                {infoCards.map((card) => (
                  <div key={card.id} className="c-block-grid-container column column-block ce_block_grid_item">
                    <div className="c-block-grid-container__wrapper">
                      <div className="c-block-grid-container__image-container">
                        <figure>
                          <img
                            className="lazyloaded"
                            data-expand="200"
                            data-src={card.image}
                            src={card.image}
                            style={{ width: '100%', height: '100%' }}
                            alt={card.alt}
                            title={card.title}
                          />
                        </figure>
                      </div>
                      <div className="c-block-grid-container__text-container">
                        <h4 className="c-block-grid-container__headline js-equalizer__item">{card.headline}</h4>
                        <div className="c-block-grid-container__text js-equalizer__item--second" dangerouslySetInnerHTML={{ __html: card.text }} />
                      </div>
                      <div className="c-block-grid-container__button-container">
                        <a className="c-block-grid-container__button" href={card.link} itemprop="url" title={`The ${card.headline}`}>
                          {card.linkText}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mod_article u-pt--large u-pb--large u-bgcolor--gray u-has-bgcolor o-shape--top-left o-shape--top-left--gray-light block">
            <div className="row">
              <h2 className="ce_headline column first u-color--white u-mb--large">
                NEWS AND DATES
              </h2>
              <div className="medium-up-2 large-up-4 js-up-2@medium js-up-4@large" data-equalizer="">
                {newsItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`c-block-grid-container column column-block ${index === 0 ? 'first even' : ''} ${index === newsItems.length - 1 ? 'last odd' : index % 2 === 0 ? 'even' : 'odd'}`}
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <a className="c-block-grid-container__wrapper" href={item.link} itemprop="url" title={item.headline} target="_blank" rel="noopener">
                      <div className="c-block-grid-container__image-container">
                        <figure className="image_container float_above" style={{ marginTop: '-3%', marginBottom: '-2%' }} itemScope itemType="http://schema.org/ImageObject" itemprop="associatedMedia">
                          <img
                            className="lazyload"
                            data-expand="200"
                            data-src={item.image}
                            src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                            style={{ width: '100%', height: '100%' }}
                            alt={item.alt}
                            title={item.title}
                          />
                        </figure>
                      </div>
                      <div className="c-block-grid-container__text-container js-equalizer__item">
                        <div className="c-box__headline-container">
                          <div className="c-block-grid-container__subheadline">
                            {item.subheadline}
                          </div>
                          <h3 className="c-block-grid-container__headline js-equalizer__item--second" itemprop="name">{item.headline}</h3>
                        </div>
                        <div className="c-block-grid-container__text" itemprop="description" dangerouslySetInnerHTML={{ __html: item.text }} />
                      </div>
                      <div className="c-block-grid-container__button-container">
                        <div className="c-block-grid-container__button">
                          Read more ...
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mod_article last u-pt--none u-pb--none o-shape--top-right o-shape--top-right--gray lazyload u-has-bgimage block" style={{ backgroundPosition: 'center center' }} data-bg="files/beamxpert/img/background/background-2.jpg" data-expand="100">
            <div className="row u-bgimage--size">
            </div>
          </div>
        </main>
      </div>

      <style>{`
        /* Reset and base styles */
        .o-wrapper {
          max-width: 100%;
          overflow: hidden;
        }

        .c-main {
          display: block;
        }

        .mod_article {
          display: block;
        }

        .block {
          display: block;
        }

        .row {
          max-width: 62.5rem;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          flex-wrap: wrap;
        }

        .column {
          padding-left: 0.9375rem;
          padding-right: 0.9375rem;
          flex: 0 0 100%;
          max-width: 100%;
        }

        .medium-12 {
          flex: 0 0 100%;
          max-width: 100%;
        }

        .large-12 {
          flex: 0 0 100%;
          max-width: 100%;
        }

        .u-pt--large {
          padding-top: 2.8125rem;
        }

        .u-pt--none {
          padding-top: 0;
        }

        .u-pb--medium {
          padding-bottom: 2.1875rem;
        }

        .u-pb--large {
          padding-bottom: 2.8125rem;
        }

        .u-pb--none {
          padding-bottom: 0;
        }

        .u-bgcolor--gray-light {
          background-color: #f2f2f2;
        }

        .u-bgcolor--gray {
          background-color: #4d4d4d;
        }

        .u-has-bgcolor {
          position: relative;
        }

        .u-has-bgimage {
          position: relative;
          background-size: cover;
          min-height: 18.75rem;
        }

        .u-bgimage--size {
          min-height: 18.75rem;
        }

        .o-shape--bottom-left {
          position: relative;
        }

        .o-shape--bottom-left::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 0 100px 100px;
          border-color: transparent transparent #ffffff transparent;
          pointer-events: none;
        }

        .o-shape--bottom-left--gray-light::after {
          border-color: transparent transparent #f2f2f2 transparent;
        }

        .o-shape--top-left {
          position: relative;
        }

        .o-shape--top-left::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 100px 0 0 100px;
          border-color: #f2f2f2 transparent transparent transparent;
          pointer-events: none;
        }

        .o-shape--top-left--gray-light::before {
          border-color: #f2f2f2 transparent transparent transparent;
        }

        .o-shape--top-right {
          position: relative;
        }

        .o-shape--top-right::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 100px 100px 0;
          border-color: transparent #4d4d4d transparent transparent;
          pointer-events: none;
        }

        .o-shape--top-right--gray::before {
          border-color: transparent #4d4d4d transparent transparent;
        }

        .ce_headline {
          font-family: 'Montserrat', Arial, Helvetica, sans-serif;
          font-weight: 700;
          font-size: 1.625rem;
          line-height: 1.2;
          margin-bottom: 1.25rem;
          color: #333333;
        }

        .ce_headline.column {
          padding-left: 0.9375rem;
          padding-right: 0.9375rem;
        }

        .ce_headline.u-color--white {
          color: #ffffff;
        }

        .ce_headline.u-mb--large {
          margin-bottom: 2.1875rem;
        }

        .u-mb {
          margin-bottom: 1.25rem;
        }

        .ce_text {
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 1rem;
          line-height: 1.6;
          color: #333333;
          margin-bottom: 1.25rem;
        }

        .ce_text p {
          margin-bottom: 1.25rem;
        }

        .ce_text p:last-child {
          margin-bottom: 0;
        }

        .ce_text a {
          color: #0066cc;
          text-decoration: underline;
          transition: color 0.2s ease;
        }

        .ce_text a:hover {
          color: #004080;
        }

        .u-mb\\@small-only {
          margin-bottom: 1.25rem;
        }

        .ce_responsive_column_start {
          display: flex;
          flex-direction: column;
        }

        .first {
          order: -1;
        }

        .last {
          order: 1;
        }

        .medium-up-2 {
          display: flex;
          flex-wrap: wrap;
        }

        .large-up-4 {
          display: flex;
          flex-wrap: wrap;
        }

        .c-block-grid-container {
          padding-left: 0.9375rem;
          padding-right: 0.9375rem;
          flex: 0 0 100%;
          max-width: 100%;
          margin-bottom: 1.875rem;
        }

        .c-block-grid-container__wrapper {
          background-color: #ffffff;
          border-radius: 0.3125rem;
          overflow: hidden;
          box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1);
          height: 100%;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.3s ease;
        }

        .c-block-grid-container__wrapper:hover {
          box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.15);
        }

        .c-block-grid-container__image-container {
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .c-block-grid-container__image-container figure {
          margin: 0;
          position: relative;
        }

        .c-block-grid-container__image-container img {
          display: block;
          width: 100%;
          height: auto;
        }

        .c-block-grid-container__text-container {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .c-block-grid-container__subheadline {
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #0066cc;
          letter-spacing: 0.0625rem;
          margin-bottom: 0.3125rem;
        }

        .c-block-grid-container__headline {
          font-family: 'Montserrat', Arial, Helvetica, sans-serif;
          font-weight: 600;
          font-size: 1.125rem;
          line-height: 1.3;
          margin-bottom: 0.625rem;
          color: #333333;
        }

        .c-block-grid-container__text {
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 0.9375rem;
          line-height: 1.6;
          color: #555555;
          flex: 1;
        }

        .c-block-grid-container__text p {
          margin-bottom: 0.9375rem;
        }

        .c-block-grid-container__text p:last-child {
          margin-bottom: 0;
        }

        .c-block-grid-container__button-container {
          padding: 0 1.25rem 1.25rem 1.25rem;
        }

        .c-block-grid-container__button {
          display: inline-block;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          color: #0066cc;
          text-decoration: none;
          transition: color 0.2s ease;
          position: relative;
        }

        .c-block-grid-container__button::after {
          content: ' →';
          transition: transform 0.2s ease;
          display: inline-block;
        }

        .c-block-grid-container__button:hover {
          color: #004080;
        }

        .c-block-grid-container__button:hover::after {
          transform: translateX(0.3125rem);
        }

        .c-box__headline-container {
          margin-bottom: 0.625rem;
        }

        .ce_block_grid_item {
          margin-bottom: 1.875rem;
        }

        .lazyload {
          opacity: 0;
          transition: opacity 0.3s ease-in;
        }

        .lazyloaded {
          opacity: 1;
        }

        .float_above {
          margin-top: -3%;
          margin-bottom: -2%;
        }

        .invisible {
          position: absolute !important;
          clip: rect(1px, 1px, 1px, 1px);
          overflow: hidden;
          height: 1px;
          width: 1px;
          word-wrap: normal;
        }

        /* Responsive breakpoints */
        @media screen and (min-width: 40em) {
          .u-mb\\@small-only {
            margin-bottom: 0;
          }

          .medium-up-2 .c-block-grid-container {
            flex: 0 0 50%;
            max-width: 50%;
          }

          .medium-up-2 .c-block-grid-container:nth-child(2n) {
            padding-left: 0.9375rem;
          }

          .medium-up-2 .c-block-grid-container:nth-child(2n+1) {
            padding-right: 0.9375rem;
          }
        }

        @media screen and (min-width: 64em) {
          .large-up-4 .c-block-grid-container {
            flex: 0 0 25%;
            max-width: 25%;
          }

          .large-up-4 .c-block-grid-container:nth-child(4n) {
            padding-left: 0.9375rem;
          }

          .large-up-4 .c-block-grid-container:nth-child(4n+1) {
            padding-right: 0.9375rem;
          }

          .ce_headline {
            font-size: 2rem;
          }

          .u-has-bgimage {
            min-height: 25rem;
          }

          .u-bgimage--size {
            min-height: 25rem;
          }
        }

        @media screen and (min-width: 40em) and (max-width: 63.9375em) {
          .js-up-2\\@medium .c-block-grid-container {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }

        @media screen and (min-width: 64em) {
          .js-up-4\\@large .c-block-grid-container {
            flex: 0 0 25%;
            max-width: 25%;
          }
        }
      `}</style>
    </>
  );
}