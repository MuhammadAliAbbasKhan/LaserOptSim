import React, { useState } from 'react';
import { X, Sparkles, Send, Building, Mail, User } from 'lucide-react';
import { submitTrialRequest } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const TrialModal = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [softwareChoice, setSoftwareChoice] = useState('LaserOptSimDESIGNER Professional');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await submitTrialRequest({
        full_name: fullName,
        email,
        company,
        software_choice: softwareChoice,
        comments
      });

      if (res.status === 'success') {
        showToast(res.message, 'success');
        onClose();
      }
    } catch (err) {
      showToast(err.response?.data?.error || 'Trial request submission failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-100">Paid Commercial Evaluation & Quote</span>
          </div>

          <h3 className="text-2xl font-bold">Request License Quote</h3>
          <p className="text-xs text-cyan-100 mt-1">Receive an official license quote or paid 30-day evaluation pass.</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input 
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Dr. Julia Vance"
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Work Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="j.vance@optics-lab.de"
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Organization / University *
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input 
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Institute of Photonics & Quantum Systems"
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Target License Tier
            </label>
            <select 
              value={softwareChoice}
              onChange={(e) => setSoftwareChoice(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:bg-white font-medium"
            >
              <option value="Basic Engineer Tier ($99/mo)">Basic Engineer Tier ($99/mo)</option>
              <option value="Standard Professional ($299/mo)">Standard Professional ($299/mo)</option>
              <option value="Enterprise Resonator Suite ($599/mo)">Enterprise Resonator Suite ($599/mo)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Application Scope / Project Details
            </label>
            <textarea 
              rows={2}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="E.g., High-power laser diode collimation and STEP CAD export."
              className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full glow-btn-primary justify-center py-2.5"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Submitting Quote Request...' : 'Request Official License Quote'}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
