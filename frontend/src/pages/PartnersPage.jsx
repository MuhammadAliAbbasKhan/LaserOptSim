import React from 'react';
import { Building2, Globe, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PartnersPage = () => {
  const { t } = useLanguage();

  const partners = [
    { name: 'Max-Planck-Institute for Quantum Optics', type: 'Research Partner', location: 'Garching / Munich, Germany' },
    { name: 'Ferdinand-Braun-Institut (FBH)', type: 'Diode Laser Technology Partner', location: 'Berlin, Germany' },
    { name: 'Fraunhofer Institute for Laser Technology (ILT)', type: 'Industrial Laser Processing', location: 'Aachen, Germany' },
    { name: 'Institute of Photonics & Quantum Systems', type: 'Academic Partner', location: 'Zurich, Switzerland' },
    { name: 'European Photonics Industry Consortium (EPIC)', type: 'Industry Association Member', location: 'Brussels, Belgium' },
    { name: 'Laser Components Systems GmbH', type: 'OEM Optical Vendor', location: 'Olching, Germany' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          GLOBAL NETWORK
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('subPartners')} & Research Alliances
        </h1>
        <p className="text-slate-600 text-base">
          LaserOptSim GmbH collaborates closely with world-leading optical research institutes, universities, and industrial photonics manufacturers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((p, idx) => (
          <div key={idx} className="laser-card p-6 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="w-10 h-10 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{p.name}</h3>
              <span className="text-xs font-semibold text-blue-600 block mt-0.5">{p.type}</span>
            </div>
            <p className="text-xs text-slate-500">{p.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
