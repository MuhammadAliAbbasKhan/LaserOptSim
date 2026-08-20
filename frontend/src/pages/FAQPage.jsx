import React from 'react';
import { HelpCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FAQPage = () => {
  const { t } = useLanguage();

  const faqs = [
    { q: 'How does LaserOptSim calculate M² beam quality degradation?', a: 'LaserOptSim implements full second-order intensity moment algorithms compliant with ISO 11146-1.' },
    { q: 'Does LaserOptSim support multi-wavelength laser systems?', a: 'Yes! You can define spectral distributions or multi-line laser diode stacks (e.g. 808nm + 976nm).' },
    { q: 'Can I export ray tracing prescriptions to STEP / SolidWorks?', a: 'Yes, full 3D CAD geometry export is supported in STEP AP203/AP214 formats.' },
    { q: 'Is a perpetual license available?', a: 'Yes, we offer both perpetual commercial licenses with optional maintenance and annual subscriptions.' },
    { q: 'What floating license managers are supported?', a: 'Our software connects seamlessly to FlexLM and RLM network license managers.' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          QUESTIONS & ANSWERS
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          {t('subFaq')} - Frequently Asked Questions
        </h1>
        <p className="text-xs text-slate-500 mt-1">Common technical and licensing queries answered.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((f, idx) => (
          <div key={idx} className="laser-card p-6 bg-white border border-slate-200 rounded-xl space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>{f.q}</span>
            </h3>
            <p className="text-xs text-slate-600 pl-6 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
