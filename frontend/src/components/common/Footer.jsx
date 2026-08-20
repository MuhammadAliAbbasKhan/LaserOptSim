import React from 'react';
import { Mail, Phone, MapPin, Video, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer = ({ setCurrentPage }) => {
  const { t } = useLanguage();

  return (
    <footer className="beam-footer">
      <div className="max-w-7xl mx-auto">
        {/* Brand Logo Header Line */}
        <div className="mb-8 flex items-center gap-3 border-b border-slate-300/60 pb-6">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">
            ✕
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-light tracking-tight text-slate-800">LaserOpt</span>
            <span className="text-2xl font-bold tracking-tight text-slate-900">Sim</span>
          </div>
        </div>

        {/* 4 Column Layout matching BeamXpert Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Contact Address Details */}
          <div>
            <p className="font-bold text-slate-900 mb-2">{t('footerCompany')}</p>
            <p className="text-slate-700 leading-relaxed mb-4 text-xs">
              Max-Planck-Straße 3<br />
              12489 Berlin<br />
              Germany
            </p>
            <p className="text-slate-800 font-semibold mb-1 flex items-center gap-2 text-xs">
              <Phone className="w-4 h-4 text-blue-600" />
              {t('footerPhone')}
            </p>
            <p className="text-slate-800 font-semibold flex items-center gap-2 text-xs">
              <Mail className="w-4 h-4 text-blue-600" />
              <a href="mailto:info@laseroptsim.com" className="hover:underline text-blue-700">
                {t('footerEmail')}
              </a>
            </p>

            <div className="mt-6 pt-4 border-t border-slate-300/60">
              <h5 className="font-bold text-slate-900 text-xs tracking-wider uppercase mb-2">Company Sub-pages</h5>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setCurrentPage('whoweare')} className="text-xs text-slate-700 hover:text-blue-600">Overview</button>
                <span className="text-slate-300">•</span>
                <button onClick={() => setCurrentPage('partners')} className="text-xs text-slate-700 hover:text-blue-600">Partners</button>
                <span className="text-slate-300">•</span>
                <button onClick={() => setCurrentPage('testimonials')} className="text-xs text-slate-700 hover:text-blue-600">Testimonials</button>
              </div>
            </div>
          </div>

          {/* Column 2: Legal & Order Agreement Pages */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm tracking-wider uppercase mb-3">
              {t('footerLegal')} & DOCUMENTS
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setCurrentPage('legal')}
                  className="beam-footer-link text-left uppercase text-xs tracking-wider"
                >
                  {t('footerLegal')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('privacy')}
                  className="beam-footer-link text-left uppercase text-xs tracking-wider"
                >
                  {t('footerPrivacy')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('terms')}
                  className="beam-footer-link text-left uppercase text-xs tracking-wider"
                >
                  {t('footerTerms')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('servicespecs')}
                  className="beam-footer-link text-left uppercase text-xs tracking-wider"
                >
                  {t('footerSpecs')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('howtoorder')}
                  className="beam-footer-link text-left uppercase text-xs tracking-wider"
                >
                  {t('footerHowToOrder')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Software & CAD Features */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm tracking-wider uppercase mb-3">
              SOFTWARE & CAD FEATURES
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => setCurrentPage('designer')} className="beam-footer-link text-left uppercase text-xs tracking-wider font-bold">
                  {t('navDesigner')}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('functions')} className="text-slate-700 hover:text-blue-600 text-left">
                  • Software Functions
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('benefits')} className="text-slate-700 hover:text-blue-600 text-left">
                  • Key Benefits & ROI
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('basics')} className="text-slate-700 hover:text-blue-600 text-left">
                  • Physical Optics Basics
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('systemrequirements')} className="text-slate-700 hover:text-blue-600 text-left">
                  • System Requirements
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('demoversion')} className="text-slate-700 hover:text-blue-600 text-left">
                  • Evaluation Demo Version
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Support, Documentation & Videos */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm tracking-wider uppercase mb-3">
              SUPPORT & GUIDES
            </h4>
            <ul className="space-y-1.5 text-xs mb-4">
              <li>
                <button onClick={() => setCurrentPage('tutorialtips')} className="text-slate-700 hover:text-blue-600 text-left">
                  • Tutorial Tips & Tricks
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('faq')} className="text-slate-700 hover:text-blue-600 text-left">
                  • Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('handbook')} className="text-slate-700 hover:text-blue-600 text-left">
                  • User Handbook & Docs
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('changelog')} className="text-slate-700 hover:text-blue-600 text-left">
                  • Version Release Changelog
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('productvideos')} className="text-slate-700 hover:text-blue-600 text-left">
                  • Product Videos Library
                </button>
              </li>
            </ul>
            
            {/* Vimeo Badge */}
            <a 
              href="https://vimeo.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold italic px-3 py-1.5 rounded shadow hover:bg-blue-600 transition-colors text-xs"
            >
              <Video className="w-4 h-4 text-cyan-400" />
              <span className="text-sm tracking-wider">vimeo</span>
            </a>
          </div>

        </div>

        {/* Sub-footer copyright */}
        <div className="border-t border-slate-300/80 pt-6 text-center text-xs text-slate-600">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
};
