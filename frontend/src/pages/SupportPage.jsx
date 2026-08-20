import React, { useState } from 'react';
import { BookOpen, Video, HelpCircle, FileText, Send, Download, CheckCircle, Search } from 'lucide-react';
import { submitContactInquiry } from '../services/api';
import { useToast } from '../context/ToastContext';

export const SupportPage = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const faqs = [
    {
      q: 'How does LaserOptSimDESIGNER differ from paraxial ray tracers?',
      a: 'LaserOptSim incorporates full physical wave optics (diffraction integrals, spatial phase profiles, and M² beam degradation) alongside classical paraxial ABCD matrix calculations.'
    },
    {
      q: 'Can I import Zemax or OSLO lens prescription files?',
      a: 'Yes! LaserOptSim supports direct loading of Zemax (.zmx, .seq) and OSLO (.len) lens catalog files as well as STEP/IGES CAD geometries.'
    },
    {
      q: 'Is hardware GPU acceleration supported?',
      a: 'Yes, our software utilizes CUDA parallel kernels to accelerate millions of ray path calculations by up to 10x compared to CPU solvers.'
    },
    {
      q: 'How do floating licenses work for multi-user labs?',
      a: 'Floating licenses connect to your local network license manager (FlexLM compliant), allowing dynamic seat sharing across engineering workstations.'
    }
  ];

  const handleSupportTicket = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitContactInquiry({ name, email, subject, message });
      if (res.status === 'success') {
        showToast(res.message, 'success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch (err) {
      showToast('Could not deliver support ticket.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          DOCUMENTATION & SUPPORT PORTAL
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          How Can We Assist Your Optical Engineering?
        </h1>
        <p className="text-slate-600 text-base">
          Access complete documentation manuals, video tutorials, software update release notes, or submit a technical ticket directly to our optical physics team.
        </p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="laser-card p-6 space-y-3 border border-slate-200 rounded-xl">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-900">User Manual & API Docs</h3>
          <p className="text-xs text-slate-600">
            Comprehensive HTML & PDF manuals detailing ABCD matrix theory, Hermite-Gaussian mode expansions, and Python API reference.
          </p>
          <button 
            onClick={() => showToast('Downloading LaserOptSimDESIGNER 2026 Manual PDF...', 'info')}
            className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1 pt-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Documentation PDF</span>
          </button>
        </div>

        <div className="laser-card p-6 space-y-3 border border-slate-200 rounded-xl">
          <Video className="w-8 h-8 text-cyan-600" />
          <h3 className="text-lg font-bold text-slate-900">Video Tutorials Library</h3>
          <p className="text-xs text-slate-600">
            Step-by-step video walkthroughs covering fiber coupler alignment, high-power laser resonator design, and thermal lens modeling.
          </p>
          <a 
            href="https://vimeo.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold text-cyan-600 hover:underline inline-flex items-center gap-1 pt-2"
          >
            <span>Watch on Vimeo Channel</span>
          </a>
        </div>

        <div className="laser-card p-6 space-y-3 border border-slate-200 rounded-xl">
          <FileText className="w-8 h-8 text-emerald-600" />
          <h3 className="text-lg font-bold text-slate-900">Software Updates & Release Notes</h3>
          <p className="text-xs text-slate-600">
            Review version changelogs, algorithm updates, and performance patches for LaserOptSim 2026.1 build 4920.
          </p>
          <span className="text-xs font-bold text-emerald-600 inline-block pt-2">
            Current Build: v2026.1 (Stable)
          </span>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="laser-card p-8 bg-white border border-slate-200 rounded-2xl space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-blue-600" />
          Frequently Asked Technical Questions
        </h3>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="text-blue-600 font-extrabold">Q:</span> {faq.q}
              </h4>
              <p className="text-xs text-slate-600 pl-5 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Support Ticket Submission Form */}
      <div className="laser-card p-8 bg-slate-900 text-white rounded-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            DIRECT ENGINEERING SUPPORT
          </span>
          <h3 className="text-3xl font-bold">Submit a Technical Ticket</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Need help configuring a complex optical layout or modeling a specific crystal medium? Fill out the brief and our senior optical physicists will respond within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSupportTicket} className="lg:col-span-7 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Your Name</label>
              <input 
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Julia Vance"
                className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded text-xs outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Work Email</label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="j.vance@lab.de"
                className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded text-xs outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Subject</label>
            <input 
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Mode Field Overlap Solver Question"
              className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded text-xs outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Problem Description</label>
            <textarea 
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Provide optical layout parameters..."
              className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded text-xs outline-none focus:border-cyan-500"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full glow-btn-primary justify-center py-2.5 text-xs font-bold"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{loading ? 'Submitting...' : 'Dispatch Ticket to Support Desk'}</span>
          </button>
        </form>
      </div>

    </div>
  );
};
