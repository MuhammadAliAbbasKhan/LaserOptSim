import React, { useState } from 'react';
import { Download, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { submitTrialRequest } from '../services/api';
import { useToast } from '../context/ToastContext';

export const DemoVersionPage = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitTrialRequest({ full_name: fullName, email, company, software_choice: 'LaserOptSim 30-Day Evaluation Demo' });
      if (res.status === 'success') {
        showToast(res.message, 'success');
        setFullName('');
        setEmail('');
        setCompany('');
      }
    } catch (err) {
      showToast('Error requesting demo installer.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="border-b border-slate-200 pb-4 text-center">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          FREE SOFTWARE EVALUATION
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          {t('subDemoVersion')} Download (LaserOptSim 2026.1)
        </h1>
        <p className="text-xs text-slate-500 mt-1">Full-featured 30-day trial license with complete ray tracing features.</p>
      </div>

      <div className="laser-card p-8 bg-white border border-slate-200 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 space-y-4 text-xs text-slate-700">
          <h3 className="text-xl font-bold text-slate-900">Demo Package Includes:</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Full-wave physical optics & ABCD matrix solver</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Interactive 2D LaserOptSimDESIGNER Canvas</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Sample Optical Prescription Library (Fiber, Resonators)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Complete PDF User Manual & Tutorials</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-6 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 text-xs">
          <h4 className="font-bold text-slate-900 text-sm">Request Evaluation Key</h4>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Full Name</label>
            <input 
              type="text" 
              required 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Dr. Julia Vance"
              className="w-full p-2 bg-white border border-slate-300 rounded outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Work Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="j.vance@lab.de"
              className="w-full p-2 bg-white border border-slate-300 rounded outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Organization</label>
            <input 
              type="text" 
              required 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Institute of Photonics"
              className="w-full p-2 bg-white border border-slate-300 rounded outline-none focus:border-blue-600"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full glow-btn-primary justify-center py-2.5 font-bold">
            <Download className="w-4 h-4" />
            <span>{loading ? 'Dispatching...' : 'Get Demo Download Link'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
