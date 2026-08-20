import React from 'react';
import { Award, Star, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TestimonialsPage = () => {
  const { t } = useLanguage();

  const reviews = [
    {
      author: 'Prof. Dr. Karl-Heinz Weber',
      role: 'Director of Applied Laser Physics, University of Stuttgart',
      text: 'LaserOptSimDESIGNER has transformed our cavity design workflow. The ABCD matrix calculations and M² mode solvers match our experimental optical bench measurements within sub-percent tolerances.'
    },
    {
      author: 'Dr. Sarah Jenkins',
      role: 'Lead Optical Engineer, Photonics Solutions Europe',
      text: 'The fiber coupling optimization solver in LaserOptSim saved our team weeks of trial-and-error alignment. The real-time interactive canvas UI is unmatched.'
    },
    {
      author: 'Dipl.-Ing. Marc Obermeier',
      role: 'Head of R&D, HighPower Optics Technology GmbH',
      text: 'Simulating thermal lensing distortion under 5kW laser pumping used to take hours. LaserOptSim GPU multithreading gives us results in under a minute.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          USER FEEDBACK & CITATIONS
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Customer {t('subTestimonials')}
        </h1>
        <p className="text-slate-600 text-base">
          Read how researchers and optical engineers use LaserOptSim to solve complex physical optics problems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((r, idx) => (
          <div key={idx} className="laser-card p-6 bg-white border border-slate-200 rounded-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">"{r.text}"</p>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <h4 className="font-bold text-slate-900 text-sm">{r.author}</h4>
              <p className="text-[11px] text-blue-600 font-semibold mt-0.5">{r.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
