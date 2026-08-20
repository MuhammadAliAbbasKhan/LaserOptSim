import React from 'react';
import { Cpu, Zap, Layers, Activity, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FunctionsPage = ({ onOpenTrial, setCurrentPage }) => {
  const { t } = useLanguage();

  const functionsList = [
    { title: 'ABCD Matrix Ray & Wave Propagation', desc: 'Rigorous calculation of 2x2 and 4x4 astigmatic complex beam parameter matrices across paraxial and non-paraxial optical systems.' },
    { title: 'Hermite-Gaussian & Laguerre-Gaussian Modes', desc: 'Full spatial phase profile expansion for fundamental TEM00 and higher-order transverse laser modes.' },
    { title: 'ISO 11146 M² Beam Quality Analysis', desc: 'Automated beam waist location, Rayleigh length calculation, and divergence angle evaluation compliant with ISO standards.' },
    { title: 'Fiber Coupling & MFD Mode Solver', desc: 'Mode field overlap integrals for single-mode, multi-mode, and polarization-maintaining fiber optics.' },
    { title: 'Thermal Lensing & Refractive Gradients', desc: 'End-pumped crystal thermal deformation, dn/dT profile calculation, and focal shift modeling under high power.' },
    { title: '3D Optical CAD STEP / IGES Export', desc: 'Direct conversion of optical ray paths and component prescriptions to SolidWorks, Creo, and Zemax files.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          CORE PRODUCT FUNCTIONS
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('subFunctions')} of LaserOptSimDESIGNER
        </h1>
        <p className="text-slate-600 text-base">
          Explore the full suite of physical optics ray tracing, physical wave solver algorithms, and optical CAD design features built into LaserOptSim.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {functionsList.map((fn, idx) => (
          <div key={idx} className="laser-card p-6 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{fn.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{fn.desc}</p>
          </div>
        ))}
      </div>

      <div className="laser-card p-8 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h3 className="text-2xl font-bold">Experience These Functions Live</h3>
          <p className="text-xs text-slate-300">Test physical ray tracing on the interactive optics canvas or request a 30-day trial license.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setCurrentPage('designer')} className="glow-btn-primary py-2.5 px-5 text-xs font-bold">
            Open Simulator Canvas
          </button>
          <button onClick={onOpenTrial} className="glow-btn-secondary py-2.5 px-5 text-xs font-bold text-slate-900">
            Request Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};
