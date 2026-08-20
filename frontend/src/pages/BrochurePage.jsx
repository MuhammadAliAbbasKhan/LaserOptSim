import React from 'react';
import { Download, FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export const BrochurePage = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="border-b border-slate-200 pb-4 text-center">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          DIGITAL PRODUCT DATASHEET
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          LaserOptSim {t('subBrochure')} (2026 Edition)
        </h1>
        <p className="text-xs text-slate-500 mt-1">Official Technical Datasheet & Feature Portfolio PDF</p>
      </div>

      <div className="laser-card p-8 bg-white border border-slate-200 rounded-2xl space-y-6 text-slate-700">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="w-16 h-20 bg-blue-50 border border-blue-200 rounded-lg flex flex-col items-center justify-center text-blue-600 font-bold">
            <FileText className="w-8 h-8" />
            <span className="text-[10px] mt-1">PDF</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">LaserOptSimDESIGNER Specification Brochure</h3>
            <p className="text-xs text-slate-500 mt-0.5">8 Pages • High-Resolution Color • Complete Algorithm Specs & Bench Validation Data</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <h4 className="font-bold text-slate-900">Brochure Contents Highlight:</h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Full Physical Optics Ray Matrix Formulations & Rayleigh Calculations</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Industrial Application Case Studies (Fiber Coupling, High Power Laser Cutting)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Commercial & Academic License Tiers Comparison Matrix</span>
            </li>
          </ul>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-center">
          <button 
            onClick={() => showToast('Downloading LaserOptSimDESIGNER Official Brochure PDF...', 'success')}
            className="glow-btn-primary py-3 px-8 text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Official Brochure PDF (4.2 MB)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
