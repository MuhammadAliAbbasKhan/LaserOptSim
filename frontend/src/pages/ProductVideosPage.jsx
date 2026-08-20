import React from 'react';
import { Video, Play, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ProductVideosPage = () => {
  const { t } = useLanguage();

  const videos = [
    { title: 'LaserOptSimDESIGNER 2026.1 Feature Overview', duration: '8:45', desc: 'Walkthrough of the physical optics engine, ABCD matrix solver, and M² analysis tool.' },
    { title: 'Single-Mode Fiber Coupling Alignment Tutorial', duration: '12:30', desc: 'Step-by-step optimization of lens focal length and sub-micron positioning for maximum coupling efficiency.' },
    { title: 'Thermal Lensing & Crystal Gradient Simulation', duration: '15:10', desc: 'Modeling temperature-dependent refractive index shifts under high-power laser pumping.' },
    { title: '3D Optical CAD STEP Export Workflow', duration: '6:15', desc: 'Converting ray paths and component prescriptions directly into SolidWorks and Zemax.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          VIDEO PORTAL
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('subProductVideos')}
        </h1>
        <p className="text-slate-600 text-base">
          Watch feature demonstrations, simulation tutorials, and optical CAD workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((vid, idx) => (
          <div key={idx} className="laser-card p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="w-full h-48 bg-slate-900 rounded-lg flex items-center justify-center relative group cursor-pointer border border-slate-800">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
              <span className="absolute bottom-3 right-3 bg-slate-950/80 text-cyan-300 font-mono text-xs px-2 py-0.5 rounded">
                {vid.duration}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{vid.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{vid.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
