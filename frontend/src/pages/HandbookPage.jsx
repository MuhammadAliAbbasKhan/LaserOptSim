import React from 'react';
import { BookOpen, Download, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export const HandbookPage = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const chapters = [
    { num: 'Ch. 1', title: 'Introduction & GUI Bench Layout', pages: 'p. 1-24' },
    { num: 'Ch. 2', title: 'ABCD Matrix Transfer Formulations', pages: 'p. 25-68' },
    { num: 'Ch. 3', title: 'Hermite-Gaussian Mode Solver', pages: 'p. 69-112' },
    { num: 'Ch. 4', title: 'Fiber Coupling Efficiency & MFD Matching', pages: 'p. 113-156' },
    { num: 'Ch. 5', title: 'Thermal Lensing & Crystal Refractive Index', pages: 'p. 157-204' },
    { num: 'Ch. 6', title: 'Python & C++ Automation API Reference', pages: 'p. 205-260' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          USER REFERENCE MANUAL
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          LaserOptSim {t('subHandbook')} (2026 Edition)
        </h1>
        <p className="text-xs text-slate-500 mt-1">Complete Software Reference Handbook & API Documentation</p>
      </div>

      <div className="laser-card p-8 bg-white border border-slate-200 rounded-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-bold text-slate-900 text-lg">LaserOptSimDESIGNER Official User Handbook</h3>
              <span className="text-xs text-slate-500">260 Pages • Version 2026.1 • ISO 11146 Reference Guide</span>
            </div>
          </div>
          <button 
            onClick={() => showToast('Downloading LaserOptSim Handbook PDF...', 'info')}
            className="glow-btn-primary py-2 px-4 text-xs font-bold"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapters.map((ch, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-600 font-mono">{ch.num}:</span>
                <span className="font-semibold text-slate-800">{ch.title}</span>
              </div>
              <span className="text-slate-400 font-mono text-[10px]">{ch.pages}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
