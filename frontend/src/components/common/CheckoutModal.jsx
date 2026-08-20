import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Check, Sparkles, Lock } from 'lucide-react';
import { processSubscription, createStripePaymentIntent } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const CheckoutModal = ({ isOpen, onClose, selectedPlan, currentUser, setCurrentUser }) => {
  const { showToast } = useToast();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !selectedPlan) return null;

  const getPrice = () => {
    let base = selectedPlan.price;
    if (billingCycle === 'yearly') base = Math.round(base * 0.8);
    return base;
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!email) {
      showToast('Please specify account email', 'warning');
      return;
    }
    setLoading(true);

    try {
      // Step 1: Initialize Stripe Payment Intent
      const intentRes = await createStripePaymentIntent({
        email,
        plan_tier: selectedPlan.tier,
        billing_cycle: billingCycle
      });

      const intentId = intentRes?.payment_intent_id || `pi_stripe_${Date.now()}`;

      // Step 2: Finalize Subscription License Activation
      const res = await processSubscription({
        email,
        plan_tier: selectedPlan.tier,
        billing_cycle: billingCycle,
        payment_method: 'stripe',
        stripe_payment_intent_id: intentId
      });

      if (res.status === 'success') {
        showToast(res.message || 'Payment authorized! License activated.', 'success');
        if (currentUser) {
          setCurrentUser({ ...currentUser, plan_tier: selectedPlan.tier });
        }
        onClose();
      }
    } catch (err) {
      showToast(err.response?.data?.error || 'Payment transaction failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Stripe Payment Gateway</span>
          </div>

          <h3 className="text-xl font-bold">Subscribe to {selectedPlan.title}</h3>
          <p className="text-xs text-slate-400 mt-1">Instant digital license activation & full feature access.</p>
        </div>

        {/* Plan Summary */}
        <div className="bg-blue-50 p-4 border-b border-blue-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block">Selected License Tier</span>
            <h4 className="text-lg font-bold text-slate-800">{selectedPlan.title}</h4>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-700">${getPrice()}</div>
            <span className="text-xs text-slate-500">per user / {billingCycle === 'monthly' ? 'month' : 'yr'}</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCheckout} className="p-6 space-y-4">
          
          {/* Billing Cycle Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Billing Interval
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all ${billingCycle === 'monthly' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-300'}`}
              >
                Monthly Billing
              </button>
              <button 
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all ${billingCycle === 'yearly' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-300'}`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Account Email
            </label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="engineer@company.com"
              className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Card Details (Simulated Stripe)
            </label>
            <div className="relative">
              <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input 
                type="text"
                required
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Expiry Date
              </label>
              <input 
                type="text"
                required
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none font-mono text-center"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                CVC / CVV
              </label>
              <input 
                type="text"
                required
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none font-mono text-center"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>256-bit TLS Encrypted. Automated receipt will be issued upon payment verification.</span>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full glow-btn-primary justify-center py-3"
          >
            {loading ? 'Processing Payment...' : `Complete Purchase ($${getPrice()})`}
          </button>
        </form>

      </div>
    </div>
  );
};
