import React from 'react';
import { Video, BookOpen, Lightbulb, Play, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TutorialTipsPage = ({ setCurrentPage }) => {
  const { t } = useLanguage();

  const tips = [
    { title: 'Tip #1: Optimizing Rayleigh Range zR', text: 'When coupling into single-mode fibers, match the Rayleigh range of the focusing lens to the fiber Mode Field Radius (w0).' },
    { title: 'Tip #2: Minimizing Thermal Lensing Focal Shift', text: 'Use sapphire or diamond heat-spreader submounts when pumping Yb:YAG thin-disk laser crystals above 2 kW power density.' },
    { title: 'Tip #3: ABCD Astigmatic Matrix Alignment', text: 'For off-axis cylindrical optical trains, use 4x4 matrix calculations to account for cross-coupling between X and Y transverse planes.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          KNOWLEDGE BASE & TIPS
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('subTutorialTips')}
        </h1>
        <p className="text-slate-600 text-base">
          Practical optical engineering tips, video walkthroughs, and design recommendations from our PhD physics team.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-500" />
          Optical Design Tips & Engineering Best Practices
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip, idx) => (
            <div key={idx} className="laser-card p-6 bg-white border border-slate-200 rounded-xl space-y-2">
              <h4 className="font-bold text-slate-900 text-sm text-blue-600">{tip.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
