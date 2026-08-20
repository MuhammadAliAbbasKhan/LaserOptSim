import React from 'react';
import { BookOpen, Activity, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const BasicsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          PHYSICAL OPTICS THEORY
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          {t('subBasics')} of Laser Beam Optics
        </h1>
        <p className="text-xs text-slate-500 mt-1">Fundamental principles of Gaussian beams, ABCD matrices, and diffraction.</p>
      </div>

      <div className="laser-card p-8 bg-white border border-slate-200 rounded-2xl space-y-6 text-sm text-slate-700 leading-relaxed">
        <div>
          <h3 className="font-bold text-slate-900 text-lg mb-2">1. Fundamental Gaussian Beams (TEM00)</h3>
          <p>
            A laser beam operating in the fundamental TEM00 mode exhibits a transverse electric field distribution that follows a Gaussian profile. The beam waist <i>w₀</i> is the location along the optical axis where the spot size reaches its minimum radius.
          </p>
          <div className="bg-slate-900 text-cyan-300 p-3 rounded-lg font-mono text-xs mt-2">
            w(z) = w₀ · √(1 + (z / zR)²)
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-2">
          <h3 className="font-bold text-slate-900 text-lg">2. Rayleigh Range (zR) & Divergence (θ)</h3>
          <p>
            The Rayleigh range <i>zR</i> represents the distance along the propagation direction from the beam waist to where the cross-sectional area doubles. The far-field divergence angle <i>θ</i> is inversely proportional to the waist radius.
          </p>
          <div className="bg-slate-900 text-cyan-300 p-3 rounded-lg font-mono text-xs mt-2">
            zR = (π · w₀²) / (λ · M²) &nbsp;|&nbsp; θ = (λ · M²) / (π · w₀)
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-2">
          <h3 className="font-bold text-slate-900 text-lg">3. ABCD Matrix Transformation</h3>
          <p>
            Paraxial ray tracing models optical elements (lenses, mirrors, free space, crystal media) as 2x2 transfer matrices. The complex beam parameter <i>q</i> transforms according to the Kogelnik ABCD law:
          </p>
          <div className="bg-slate-900 text-cyan-300 p-3 rounded-lg font-mono text-xs mt-2">
            q₂ = (A · q₁ + B) / (C · q₁ + D)
          </div>
        </div>
      </div>
    </div>
  );
};
