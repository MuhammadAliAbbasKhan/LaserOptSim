import React from 'react';
import { ShieldCheck, Lock, FileCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PrivacyStatementPage = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          GDPR DATA PROTECTION
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          {t('footerPrivacy')}
        </h1>
        <p className="text-xs text-slate-500 mt-1">Effective Date: January 1, 2026</p>
      </div>

      <div className="laser-card p-8 bg-white border border-slate-200 rounded-2xl space-y-6 text-sm text-slate-700 leading-relaxed">
        
        <div>
          <h3 className="font-bold text-slate-900 text-base mb-2">1. Overview of Data Protection</h3>
          <p>
            The following notes provide a simple overview of what happens to your personal information when you visit our website <strong>LaserOptSim.com</strong> or use our software license services. Personal data is any data with which you can be personally identified.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-2">
          <h3 className="font-bold text-slate-900 text-base">2. Data Collection on Our Website</h3>
          <p>
            Data collection on this website is processed by the website operator (LaserOptSim GmbH). Data is collected when you provide it to us (e.g. via contact forms, evaluation trial requests, or Stripe commercial license subscriptions).
          </p>
          <p className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
            <strong>Server Log Files:</strong> The website provider automatically collects and stores information in server log files (browser type, operating system, referrer URL, IP address, time of server query).
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-2">
          <h3 className="font-bold text-slate-900 text-base">3. Software License Telemetry & Security</h3>
          <p>
            LaserOptSimDESIGNER software client applications verify valid license keys against our secure backend endpoints (`/api/v1/auth/`). No proprietary CAD models, lens optical prescriptions, or ray tracing project data are transmitted to external servers without user consent.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-2">
          <h3 className="font-bold text-slate-900 text-base">4. Your Rights Under GDPR</h3>
          <p>
            You have the right to request information about your stored personal data, its origin, recipients, and the purpose of data processing at any time free of charge. You also have the right to request rectification, blocking, or deletion of this data.
          </p>
          <p className="text-xs font-semibold text-blue-600">
            Privacy Contact: privacy@laseroptsim.com
          </p>
        </div>

      </div>

    </div>
  );
};
