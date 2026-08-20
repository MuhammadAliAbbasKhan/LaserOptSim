import React, { useState } from 'react';
import { Check, Sparkles, Shield, Zap, Cpu, Award, ArrowRight, HelpCircle } from 'lucide-react';

export function ShopPage({ onOpenCheckout, onOpenTrial }) {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'basic',
      tier: 'basic',
      title: 'Basic Engineer Tier',
      priceMonthly: 99,
      priceYearly: 79,
      tagline: 'Ideal for independent optical researchers & single workstation ray tracing.',
      features: [
        'Physical Optics & ABCD Matrix Calculation',
        'Gaussian Beam Propagation Simulation',
        'Single Workstation Node License',
        'Standard Refractive Optics Element Library',
        '2D Beam Profile Image Export (PNG / SVG)',
        'Community Forum & Documentation Access'
      ],
      popular: false,
      btnText: 'Order Basic License'
    },
    {
      id: 'standard',
      tier: 'standard',
      title: 'Standard Professional',
      priceMonthly: 299,
      priceYearly: 239,
      tagline: 'Complete software package for optical design teams & laser equipment manufacturers.',
      features: [
        'All Basic Features Included',
        'Up to 3 Floating Workstation Licenses',
        'Full 3D CAD STEP & IGES Prescription Export',
        'Optical Resonator Stability & Mode Analyzer',
        'Custom Intensity Profile Import & Hermite-Gaussian TEM Modes',
        'Priority Technical Support (24h Response)'
      ],
      popular: true,
      btnText: 'Order Standard License'
    },
    {
      id: 'premium',
      tier: 'premium',
      title: 'Enterprise & Resonator Suite',
      priceMonthly: 599,
      priceYearly: 479,
      tagline: 'Ultimate physical optics simulation suite for high-power laser R&D.',
      features: [
        'All Standard Features Included',
        'Unlimited Floating Network Licenses',
        'Thermal Lensing & Crystal Gradient Real-Time Simulation',
        'Fiber Coupling Efficiency & Stray Light Safety Solver',
        'Direct Integration with Zemax / OSLO / CodeV',
        '1-on-1 Dedicated Optical Engineer Consultation'
      ],
      popular: false,
      btnText: 'Order Enterprise Suite'
    }
  ];

  return (
    <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Page Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Commercial License Catalog 2026.1
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            LaserOptSimDESIGNER Pricing & Orders
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Select the optimal software license for your optical simulation needs. Fully integrated with instant automated Stripe digital license issuance.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex justify-center items-center gap-4">
            <span className={`text-sm font-semibold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="w-14 h-8 bg-slate-300 rounded-full p-1 transition-colors relative"
            >
              <div className={`w-6 h-6 bg-blue-600 rounded-full transition-transform transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-semibold flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-500'}`}>
              Annual Plan
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
            return (
              <div 
                key={plan.id}
                className={`bg-white rounded-2xl p-8 border relative flex flex-col justify-between transition-all hover:shadow-xl ${plan.popular ? 'border-blue-600 shadow-lg ring-2 ring-blue-600/20' : 'border-slate-200 shadow-sm'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{plan.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{plan.tagline}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">${price}</span>
                    <span className="text-xs text-slate-500">/ user / {billingCycle === 'monthly' ? 'mo' : 'mo billed annually'}</span>
                  </div>

                  <ul className="space-y-3 border-t border-slate-100 pt-6 text-xs text-slate-700">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => onOpenCheckout && onOpenCheckout({ title: plan.title, price, tier: plan.tier })}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                  >
                    <span>{plan.btnText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Educational / Organizational Purchase Guarantee */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="space-y-2 lg:col-span-2">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              University & Research Academic Discounts Available
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We offer specialized multi-seat licenses for university laboratories, PhD research groups, and non-profit national institutes. Contact our sales department to receive an official formal quote.
            </p>
          </div>
          <div className="text-right">
            <button 
              onClick={onOpenTrial}
              className="w-full lg:w-auto bg-white text-slate-900 font-bold text-xs px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors uppercase tracking-wider"
            >
              Request Paid Evaluation Quote
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}