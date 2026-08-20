import React from 'react';
import { Sparkles, FileText, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ChangelogPage = () => {
  const { t } = useLanguage();

  const releaseNotes = [
    {
      version: 'v2026.1 Build 4920 (Current Stable Release)',
      date: 'February 15, 2026',
      changes: [
        'Added NVIDIA CUDA 12.x GPU parallel ray tracing engine (10x speedup).',
        'Implemented ISO 11146-2 astigmatic second-order moment calculation.',
        'Enhanced STEP / IGES 3D Optical CAD export fidelity.',
        'Added direct Zemax .zmx lens catalog prescription parser.'
      ]
    },
    {
      version: 'v2025.4 Build 4100',
      date: 'October 10, 2025',
      changes: [
        'Added end-pumped laser crystal thermal lensing solver (dn/dT gradients).',
        'Added single-mode fiber overlap integral Mode Field Diameter (MFD) tool.',
        'Updated UI theme matching soft light-blue BeamXpert layout.'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          SOFTWARE UPDATES & ROADMAP
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          {t('subChangelog')}
        </h1>
        <p className="text-xs text-slate-500 mt-1">Version Release Notes, Bug Fixes & Feature Outlook</p>
      </div>

      <div className="space-y-6">
        {releaseNotes.map((rel, idx) => (
          <div key={idx} className="laser-card p-6 bg-white border border-slate-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-bold text-slate-900 text-base">{rel.version}</span>
              <span className="text-xs font-mono text-slate-500">{rel.date}</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {rel.changes.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
