import React from 'react';
import { ShieldCheck, Zap, Award, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const BenefitsPage = ({ onOpenTrial }) => {
  const { t } = useLanguage();

  const benefits = [
    { title: '10x Speed Improvement', desc: 'CUDA GPU parallelized ray tracing delivers real-time parameter tweaking compared to traditional sequential solvers.' },
    { title: 'Sub-Micron Simulation Accuracy', desc: 'Validated against experimental bench measurements across high-power laser laboratories worldwide.' },
    { title: 'ISO Standard Compliance', desc: 'Full adherence to ISO 11146-1 and ISO 11146-2 beam propagation and M² quality metrics.' },
    { title: 'Seamless CAD Interoperability', desc: 'Import and export STEP, IGES, SolidWorks, Zemax, and OSLO prescriptions without data loss.' },
    { title: 'Reduced R&D Prototyping Costs', desc: 'Eliminate expensive physical trial-and-error bench setups by modeling exact wave propagation virtually.' },
    { title: 'Intuitive Drag-and-Drop CAD Interface', desc: 'Designed for optical engineers and researchers to build complex layouts in minutes.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          WHY CHOOSE LASEROPTSIM
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('subBenefits')} of LaserOptSim Software
        </h1>
        <p className="text-slate-600 text-base">
          Discover why optics laboratories, photonics OEMs, and universities switch to LaserOptSim for high-precision beam simulation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((b, idx) => (
          <div key={idx} className="laser-card p-6 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{b.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
