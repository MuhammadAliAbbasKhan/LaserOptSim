import React from 'react';
import { ShieldCheck, FileText, Building2, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LegalNoticePage = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          OFFICIAL IMPRESSUM
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          {t('footerLegal')} (Impressum)
        </h1>
        <p className="text-xs text-slate-500 mt-1">Information pursuant to Section 5 Telemediengesetz (TMG)</p>
      </div>

      <div className="laser-card p-8 bg-white border border-slate-200 rounded-2xl space-y-6 text-sm text-slate-700 leading-relaxed">
        
        <div>
          <h3 className="font-bold text-slate-900 text-base mb-2">Company Entity</h3>
          <p className="font-semibold text-slate-800">LaserOptSim GmbH</p>
          <p>Max-Planck-Straße 3</p>
          <p>12489 Berlin, Germany</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase mb-1">Represented by Managing Directors:</h4>
            <p className="font-semibold text-slate-800">Dr. Michael Steinberg</p>
            <p className="font-semibold text-slate-800">Dr. Elena Rostova</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase mb-1">Commercial Register Entry:</h4>
            <p>Registration Court: Amtsgericht Charlottenburg (Berlin)</p>
            <p className="font-mono text-xs font-bold text-blue-600">Register Number: HRB 249821 B</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase mb-1">Value Added Tax ID (VAT ID):</h4>
            <p>VAT Identification Number pursuant to § 27a Value Added Tax Act:</p>
            <p className="font-mono text-xs font-bold text-blue-600">DE 349 812 045</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase mb-1">Contact Communications:</h4>
            <p>Telephone: +49 30 40 36 69 72-0</p>
            <p>Email: <a href="mailto:info@laseroptsim.com" className="text-blue-600 hover:underline">info@laseroptsim.com</a></p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
          <h4 className="font-bold text-slate-900 text-sm">Dispute Resolution</h4>
          <p>
            The European Commission provides a platform for online dispute resolution (OS): <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://ec.europa.eu/consumers/odr</a>.
          </p>
          <p>
            We are not obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board.
          </p>
        </div>

      </div>

    </div>
  );
};
