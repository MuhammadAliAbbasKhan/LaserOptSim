import React from 'react';
import { ShoppingCart, CreditCard, Building, Mail, FileCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HowToOrderPage = ({ setCurrentPage, onOpenTrial }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          PROCUREMENT GUIDE
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          {t('footerHowToOrder')}
        </h1>
        <p className="text-xs text-slate-500 mt-1">Purchasing Options for Commercial, Government & Educational Accounts</p>
      </div>

      <div className="space-y-6">
        
        {/* Step-by-Step Order Workflow */}
        <div className="laser-card p-8 bg-white border border-slate-200 rounded-2xl space-y-6">
          <h3 className="font-bold text-slate-900 text-lg">Purchasing Workflows</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Online Credit Card / Stripe */}
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                <CreditCard className="w-5 h-5" />
                <span>Option A: Online Checkout (Instant Activation)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Purchase commercial licenses online using major Credit Cards (Visa, Mastercard, AMEX) or Stripe checkout. Your license key and digital download link are generated immediately upon payment confirmation.
              </p>
              <button 
                onClick={() => setCurrentPage('shop')}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>Go to License Shop</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Corporate Purchase Order / Wire Transfer */}
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Building className="w-5 h-5 text-emerald-600" />
                <span>Option B: Corporate Purchase Order (PO)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                For organizations requiring formal pro-forma invoices, SEPA bank wire transfers, or tax exemption processing, submit an official PO to sales@laseroptsim.com.
              </p>
              <a 
                href="mailto:sales@laseroptsim.com?subject=Formal Quote Request - LaserOptSim"
                className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
                <span>Request Pro-Forma Quote</span>
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

        {/* Bank Wire Details Box */}
        <div className="laser-card p-6 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-3 text-xs">
          <h4 className="font-bold text-cyan-400 text-sm">Bank Wire Transfer Information (SEPA / SWIFT)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-slate-300">
            <div>
              <span className="text-slate-500 block text-[10px]">BENEFICIARY BANK</span>
              <span>Deutsche Bank AG (Berlin Branch)</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">ACCOUNT HOLDER</span>
              <span>LaserOptSim GmbH</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">IBAN NUMBER</span>
              <span>DE89 1007 0000 0123 4567 89</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">BIC / SWIFT CODE</span>
              <span>DEUTDEDDBER</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
