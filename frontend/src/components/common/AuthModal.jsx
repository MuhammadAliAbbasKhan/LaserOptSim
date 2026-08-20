import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, CheckCircle } from 'lucide-react';
import { loginUser, signupUser } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AuthModal = ({ isOpen, onClose, setCurrentUser, setCurrentPage }) => {
  const { showToast } = useToast();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [planTier, setPlanTier] = useState('free');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLoginMode) {
        const res = await loginUser({ email, password });
        if (res.status === 'success') {
          setCurrentUser(res.user);
          showToast(res.message || 'Login successful!', 'success');
          if (res.user.is_admin) {
            setCurrentPage('admin');
          }
          onClose();
        }
      } else {
        const res = await signupUser({ username, email, password, plan_tier: planTier });
        if (res.status === 'success') {
          setCurrentUser(res.user);
          showToast(res.message || 'Account created successfully!', 'success');
          onClose();
        }
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || err.response?.data?.messages?.[0]?.message || 'Authentication error. Please check details.';
      showToast(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setLoading(true);
    try {
      const res = await loginUser({ email: demoEmail, password: demoPass });
      if (res.status === 'success') {
        setCurrentUser(res.user);
        showToast(res.message, 'success');
        if (res.user.is_admin) setCurrentPage('admin');
        onClose();
      }
    } catch (err) {
      showToast('Demo login error', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden relative">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-cyan-600 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-cyan-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-200">LaserOptSim Portal</span>
          </div>

          <h3 className="text-2xl font-bold">
            {isLoginMode ? 'Sign In to Workspace' : 'Create Workspace Account'}
          </h3>
          <p className="text-sm text-cyan-100 mt-1">
            {isLoginMode ? 'Access your physical optics ray tracing workspace.' : 'Join researchers and engineers worldwide.'}
          </p>
        </div>

        {/* Demo Quick Logins */}
        <div className="bg-slate-50 p-4 border-b border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Quick Demo Access:</p>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => handleDemoLogin('demouser@laseroptsim.com', 'password123')}
              className="text-xs font-semibold bg-white border border-slate-300 hover:border-blue-500 text-slate-700 p-2 rounded-lg text-left shadow-sm hover:shadow transition-all"
            >
              <div className="flex items-center gap-1.5 text-blue-600 font-bold">
                <CheckCircle className="w-3.5 h-3.5" /> Premium Demo User
              </div>
              <span className="text-[10px] text-slate-500">Dr. Hans Weber</span>
            </button>

            <button 
              onClick={() => handleDemoLogin('admin@laseroptsim.com', 'LaserOpt#2026!Admin')}
              className="text-xs font-semibold bg-slate-900 border border-slate-800 text-white p-2 rounded-lg text-left shadow-sm hover:bg-slate-800 transition-all"
            >
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Console
              </div>
              <span className="text-[10px] text-slate-400">Passcode Pre-filled</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLoginMode && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name / Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Dr. Hans Weber"
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@laseroptsim.com"
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>
          </div>

          {!isLoginMode && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Target License Tier
              </label>
              <select 
                value={planTier}
                onChange={(e) => setPlanTier(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:bg-white font-medium"
              >
                <option value="free">Free Evaluation License (Trial)</option>
                <option value="basic">Basic Commercial ($99/mo)</option>
                <option value="standard">Standard Engineering ($299/mo)</option>
                <option value="premium">Premium Enterprise ($599/mo)</option>
              </select>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full glow-btn-primary justify-center py-2.5 mt-2"
          >
            {loading ? 'Authenticating...' : isLoginMode ? 'Sign In to Account' : 'Create New Account'}
          </button>
        </form>

        {/* Modal Switch Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-600">
          {isLoginMode ? (
            <p>
              Don't have an account?{' '}
              <button 
                onClick={() => setIsLoginMode(false)}
                className="font-bold text-blue-600 hover:underline"
              >
                Register for Free
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button 
                onClick={() => setIsLoginMode(true)}
                className="font-bold text-blue-600 hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
