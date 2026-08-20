import React from 'react';
import { FileCheck, Shield, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TermsConditionsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          EULA & TERMS OF SERVICE
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          {t('footerTerms')}
        </h1>
        <p className="text-xs text-slate-500 mt-1">End User License Agreement for LaserOptSim Software</p>
      </div>

      <div className="laser-card p-8 bg-white border border-slate-200 rounded-2xl space-y-6 text-sm text-slate-700 leading-relaxed">
        
        <div>
          <h3 className="font-bold text-slate-900 text-base mb-2">1. Scope of Agreement</h3>
          <p>
            This Software License Agreement ("Agreement") is a legal contract between the licensee (individual or corporate entity) and <strong>LaserOptSim GmbH</strong> for the licensing of LaserOptSimDESIGNER software, documentation, and maintenance updates.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-2">
          <h3 className="font-bold text-slate-900 text-base">2. Software License Grant</h3>
          <p>
            Subject to payment of applicable license fees, LaserOptSim GmbH grants licensee a non-exclusive, non-transferable license to install and execute the software in accordance with the purchased tier:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Single User Commercial License:</strong> Restricted to installation on a single workstation.</li>
            <li><strong>Floating Engineering License:</strong> Allows seat sharing up to the specified concurrency limit across local networks.</li>
            <li><strong>Evaluation License:</strong> 30-day time-limited license strictly for evaluation purposes.</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-2">
          <h3 className="font-bold text-slate-900 text-base">3. Intellectual Property Rights</h3>
          <p>
            The software, source code algorithms, ABCD solver kernels, and documentation are protected by German copyright law and international IP treaties. Reverse engineering, decompiling, or modification of license keys is strictly prohibited.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-2">
          <h3 className="font-bold text-slate-900 text-base">4. Warranty & Liability</h3>
          <p>
            LaserOptSim GmbH warrants that the software operates substantially in accordance with published service specifications. In no event shall liability exceed the total license fees paid by licensee during the 12-month period preceding the claim.
          </p>
        </div>

      </div>

    </div>
  );
};
