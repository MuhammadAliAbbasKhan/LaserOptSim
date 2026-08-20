import React, { useState, useEffect } from 'react';

// Data arrays extracted from HTML
const useCases = [
  {
    id: 1,
    image: "files/beamxpert/img/use-cases/beamxpert-use-cases-laserstrahlpropagation-1.jpg",
    alt: "With the BeamXpertDESIGNER software, FAC and SAC lenses for collimating laser light from laser diodes can be quickly and easily selected and positioned.",
    title: "BeamXpertDESIGNER Application: Collimation of Laser Diode Radiation",
    caption: "© FBH/schurian.com",
    headline: "Collimation of Diode Laser Radiation",
    text: `<p>In order to apply the high beam quality of diode lasers, the highly divergent radiation has to be formed to a parallel laser beam first. This collimation is typically done by one or more microlenses. Using improper lenses can significantly deteriorate the beam quality supplied by the laser diode.</p>
<p>With the help of BeamXpertDESIGNER, the lenses best suited for this use can be determined. In addition, the effect of possible lens misalignments on the beam quality can be quantitatively determined.</p>`
  },
  {
    id: 2,
    image: "files/beamxpert/img/use-cases/beamxpert-use-cases-laserstrahlpropagation-2.jpg",
    alt: "With the BeamXpertDESIGNER software, you can quickly and easily design and optimize an optical set-up for the coupling of laser radiation to optical glass fibers.",
    title: "BeamXpertDESIGNER application: Coupling of laser beams into glass fibers",
    caption: "© FBH/schurian.com",
    headline: "Fiber Coupling",
    text: `<p>The ability to couple laser radiation into fibers allows the separation of the laser beam generation location from the beam application location. This is a great advantage in practice. To couple the laser radiation into the fiber, the laser radiation has to be transformed to a spot with a precisely specified size and has to hit the fibre core as precisely as possible. The size of the spot and the degradation of the beam quality caused by the aberration of the fiber optic coupler depend on the lenses used.</p>
<p>Both can be calculated with BeamXpertDESIGNER. In addition, it is possible to quantitatively estimate the losses during coupling due to misalignment of the lenses.</p>`
  },
  {
    id: 3,
    image: "files/beamxpert/img/use-cases/beamxpert-use-cases-laserstrahlpropagation-3.jpg",
    alt: "With BeamXpertDESIGNER software, you can quickly and easily design and optimize optical systems for frequency conversion (SHG, THG, ...) of laser light.",
    title: "BeamXpertDESIGNER Application: Design of Optical Systems for Frequency Conversion",
    caption: "© FBH/schurian.com",
    headline: "Frequency Conversion",
    text: `<p>In certain wavelength ranges, laser radiation cannot be generated directly or only with great technical difficulties. Instead, laser radiation is generated in an easily accessible wavelength range and converted into the desired wavelength range using nonlinear crystals. In order to achieve optimum conversion efficiencies, the laser radiation must be focused into the crystal while closely defined parameters (focus diameter and position, Rayleigh length, etc.) are maintained.</p>
<p>With BeamXpertDESIGNER it is possible to determine the necessary lens combinations quickly and reliably.</p>`
  },
  {
    id: 4,
    image: "files/beamxpert/img/use-cases/Fasergekoppeltes%20Pumpmodul%20mit%206%20kW%20Ausgangsleistung%20%28FBH%29.jpg",
    alt: "Simulation of the optical setup of the fiber-coupled pump module with 6 kW output power from FBH with BeamXpertDESIGNER",
    title: "BeamXpertDESIGNER Application: Fiber Coupled Diode Laser Pump Module with 6 kW (FBH)",
    caption: "© FBH/BeamXpert GmbH",
    headline: "6 kW Fiber Coupled Diode Laser Pump Module",
    text: `<p>The beams of 56 diode lasers, arranged on two stacks, are collimated separately, optically combined to a total beam and coupled into a single fiber.</p>
<p>The optical system was developed with BeamXpertDESIGNER. Despite the large number of radiation sources, fluid working in real time was still possible. With the ray model it was easy to determine the coupling losses correctly.</p>
<p>The system was realized at the Ferdinand-Braun-Institut, Leibniz-Institut für Höchstfrequenztechnik (FBH) and acts as a pump module with a maximum output power of 6 kW.</p>`
  },
  {
    id: 5,
    image: "files/beamxpert/img/use-cases/TRUMPF%20Semiconductor%20Anwendungen%20gro%C3%9F%20081220.jpg",
    alt: "TRUMPF laser development for EUV lithography - insight into laboratory practice",
    title: "TRUMPF laser development for EUV lithography using BeamXpertDESIGNER for laser beam simulation - Source: TRUMPF Group",
    caption: "© Source: TRUMPF Group",
    headline: "EUV generation devices for the semiconductor industry",
    text: `<p>The engineering of optical components for CO<sub>2</sub> high-power lasers and amplifiers for the generation of extreme ultraviolet (EUV) radiation in the semiconductor industry demands great attention and accuracy in order to achieve the required stability and precision. Simulations and analyses are as essential parts of the engineering as are tests of functional models and prototypes.</p>
<p>BeamXpertDESIGNER supports TRUMPF Lasersystems for Semiconductor Manufacturing GmbH during the design phase of the optical layout, especially by its easy usability and the immediate visualization of the 3D beam path including the consideration of the disturbing contours of all components.</p>
<p>During the following detailing of the design, simple analyses (e. g. unwanted partial beams due to residual reflection from transmitting optics) as well as the exact determination of beam parameters (beam size, power density, ...) at any point of the beam path can be performed very quickly and reliably with the help of BeamXpertDESIGNER.</p>
<p>Designing and simulating experimental setups with a few dozen optics is as easy as creating complete models with several hundred optics and a total beam length of more than one kilometer.</p>
<p>The EUV generation systems from TRUMPF are being integrated by the lithography system manufacturer ASML together with components from the company Zeiss into systems for the realization of the current 5 nm production process.</p>`
  }
];

export function ApplicationsPage() {
  return (
    <>
      <div className="o-wrapper">
        <main className="c-main" itemScope itemType="http://schema.org/WebPageElement" itemProp="mainContentOfPage">
          <div className="mod_article first u-pt--large u-pb--large block">
            <div className="row">
              <div className="u-mb@small-only column medium-12 large-12 ce_responsive_column_start first">
                <h2 className="ce_headline">
                  Make light matter
                </h2>
                <div className="ce_text block">
                  <p>BeamXpertDESIGNER was developed by Dr. Eppich according to the needs of the employees of the Ferdinand-Braun-Institut in their daily practical work in connection with the shaping, guidance and collimation of laser diode radiation. Furthermore, BeamXpertDESIGNER has already impressively proven its reliability and usefulness in the field of laser development, laser material processing, data transmission and metrology to 50 users in other research institutes and companies in its beta versions. The feedback of the beta testers has continuously led to the further development and improvement of BeamXpertDESIGNER.</p>
                </div>
                <div className="ce_text u-size--18 block">
                  <p><strong>Outcome:</strong> Increased added value through significantly accelerated workflow!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mod_article last u-pt--large u-pb--large u-bgcolor--gray-light u-has-bgcolor o-shape--bottom-left o-shape--bottom-left--gray-light block">
            <div className="row">
              <h2 className="ce_headline column first">
                Use Cases
              </h2>
              <div className="medium-up-2 large-up-2 js-up-2@medium js-up-2@large" data-equalizer="">
                {useCases.map((useCase) => (
                  <div key={useCase.id} className="c-block-grid-container column column-block ce_block_grid_item">
                    <div className="c-block-grid-container__wrapper">
                      <div className="c-block-grid-container__image-container">
                        <figure>
                          <img 
                            className="lazyloaded" 
                            data-expand="200" 
                            data-src={useCase.image} 
                            src={useCase.image} 
                            style={{width: '100%', height: '100%'}} 
                            alt={useCase.alt} 
                            title={useCase.title}
                          />
                          <figcaption className="caption" itemProp="caption">{useCase.caption}</figcaption>
                        </figure>
                      </div>
                      <div className="c-block-grid-container__text-container">
                        <h4 className="c-block-grid-container__headline js-equalizer__item">{useCase.headline}</h4>
                        <div className="c-block-grid-container__text js-equalizer__item--second" dangerouslySetInnerHTML={{ __html: useCase.text }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
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

        .u-pb--large {
          padding-bottom: 2.8125rem;
        }

        .u-pt--none {
          padding-top: 0;
        }

        .u-pb--none {
          padding-bottom: 0;
        }

        .u-bgcolor--gray-light {
          background-color: #f2f2f2;
        }

        .u-has-bgcolor {
          position: relative;
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

        .ce_text:last-child {
          margin-bottom: 0;
        }

        .u-size--18 {
          font-size: 1.125rem;
        }

        .u-mb\\@small-only {
          margin-bottom: 1.25rem;
        }

        .medium-up-2 {
          display: flex;
          flex-wrap: wrap;
        }

        .large-up-2 {
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

        .c-block-grid-container__image-container .caption {
          position: absolute;
          bottom: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.7);
          color: #ffffff;
          padding: 0.3125rem 0.625rem;
          font-size: 0.75rem;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          border-top-left-radius: 0.3125rem;
        }

        .c-block-grid-container__text-container {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
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

        .c-block-grid-container__text sub {
          font-size: 0.75rem;
          vertical-align: sub;
        }

        .ce_block_grid_item {
          margin-bottom: 1.875rem;
        }

        .ce_block_grid_item.last {
          margin-bottom: 0;
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
          .large-up-2 .c-block-grid-container {
            flex: 0 0 50%;
            max-width: 50%;
          }

          .large-up-2 .c-block-grid-container:nth-child(2n) {
            padding-left: 0.9375rem;
          }

          .large-up-2 .c-block-grid-container:nth-child(2n+1) {
            padding-right: 0.9375rem;
          }

          .ce_headline {
            font-size: 2rem;
          }
        }

        @media screen and (min-width: 40em) and (max-width: 63.9375em) {
          .js-up-2\\@medium .c-block-grid-container {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }

        @media screen and (min-width: 64em) {
          .js-up-2\\@large .c-block-grid-container {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }

        .first {
          order: -1;
        }

        .last {
          order: 1;
        }

        .ce_responsive_column_start {
          display: flex;
          flex-direction: column;
        }

        /* Lazy loading placeholder */
        .lazyload {
          opacity: 0;
          transition: opacity 0.3s ease-in;
        }

        .lazyloaded {
          opacity: 1;
        }

        .invisible {
          position: absolute !important;
          clip: rect(1px, 1px, 1px, 1px);
          overflow: hidden;
          height: 1px;
          width: 1px;
          word-wrap: normal;
        }
      `}</style>
    </>
  );
}