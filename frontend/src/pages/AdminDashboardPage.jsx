import React, { useState, useEffect } from 'react';
import { ShieldCheck, Database, Users, DollarSign, Activity, Sparkles, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';
import { 
  getMongoDBStatus, 
  getAdminAnalytics, 
  listAdminUsers, 
  updateAdminUserPlan, 
  listAdminTrials, 
  listAdminInquiries 
} from '../services/api';
import { useToast } from '../context/ToastContext';

export const AdminDashboardPage = ({ currentUser }) => {
  const { showToast } = useToast();
  const [mongoStatus, setMongoStatus] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [trials, setTrials] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [passcode, setPasscode] = useState('');
  const [authenticated, setAuthenticated] = useState(currentUser?.is_admin || false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [mongoRes, analyticsRes, usersRes, trialsRes, inquiriesRes] = await Promise.allSettled([
        getMongoDBStatus(),
        getAdminAnalytics(),
        listAdminUsers(),
        listAdminTrials(),
        listAdminInquiries()
      ]);

      if (mongoRes.status === 'fulfilled') setMongoStatus(mongoRes.value.mongodb);
      if (analyticsRes.status === 'fulfilled') setAnalytics(analyticsRes.value.metrics);
      if (usersRes.status === 'fulfilled') setUsers(usersRes.value.users || []);
      if (trialsRes.status === 'fulfilled') setTrials(trialsRes.value.trials || []);
      if (inquiriesRes.status === 'fulfilled') setInquiries(inquiriesRes.value.inquiries || []);

    } catch (err) {
      showToast('Error loading administrative telemetry', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchData();
    }
  }, [authenticated]);

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (passcode === 'aliabbas1234578!') {
      localStorage.setItem('adminPasscode', passcode);
      setAuthenticated(true);
      showToast('Authenticated as LaserOptSim Executive Admin 🛡️', 'success');
    } else {
      showToast('Invalid admin passcode credential', 'error');
    }
  };

  const handlePlanUpdate = async (userId, newTier) => {
    try {
      const res = await updateAdminUserPlan({ user_id: userId, plan_tier: newTier });
      if (res.status === 'success') {
        showToast(res.message, 'success');
        fetchData();
      }
    } catch (err) {
      showToast('Failed to update plan tier', 'error');
    }
  };

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto py-20 px-4">
        <div className="laser-card p-8 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-600 rounded-xl mx-auto flex items-center justify-center text-white">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold">Executive Control Console</h2>
            <p className="text-xs text-slate-400">Restricted administrative access for LaserOptSim system operators.</p>
          </div>

          <form onSubmit={handleAdminAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Admin Passcode</label>
              <input 
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Passcode..."
                className="w-full p-2.5 bg-slate-950 text-white border border-slate-700 rounded-lg text-sm outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <button type="submit" className="w-full glow-btn-primary justify-center py-2.5 text-xs font-bold">
              Authenticate Console
            </button>
          </form>

          <p className="text-[11px] text-center text-slate-500 font-mono">
            Default Passcode: aliabbas1234578!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Executive Admin Dashboard</h1>
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">SYSTEM ONLINE</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Real-time MongoDB telemetry, revenue telemetry, user accounts, and trial inquiries.</p>
        </div>

        <button 
          onClick={fetchData}
          disabled={loading}
          className="glow-btn-secondary text-xs py-2 px-4"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* Live MongoDB Status Card */}
      <div className={`laser-card p-6 rounded-2xl border text-white shadow-lg transition-all ${mongoStatus?.connected ? 'bg-slate-900 border-emerald-500/40' : 'bg-slate-900 border-amber-500/40'}`}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-cyan-400" />
            <div>
              <h3 className="font-bold text-lg text-white">MongoDB Atlas Database Diagnostics</h3>
              <span className="text-xs text-cyan-300 font-mono">{mongoStatus?.database_name || 'laseroptsim_db'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${mongoStatus?.connected ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
            <span className="text-xs font-bold font-mono">
              {mongoStatus?.status || 'Checking Database...'}
            </span>
          </div>
        </div>

        {mongoStatus?.stats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 font-mono text-xs text-slate-300">
            <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">USERS SYNCED</span>
              <span className="text-cyan-400 font-bold text-base">{mongoStatus.stats.users_count}</span>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">TRIALS SYNCED</span>
              <span className="text-cyan-400 font-bold text-base">{mongoStatus.stats.trials_count}</span>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">INQUIRIES SYNCED</span>
              <span className="text-cyan-400 font-bold text-base">{mongoStatus.stats.inquiries_count}</span>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">SUBSCRIPTIONS</span>
              <span className="text-cyan-400 font-bold text-base">{mongoStatus.stats.subscriptions_count}</span>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">SERVICES REQS</span>
              <span className="text-cyan-400 font-bold text-base">{mongoStatus.stats.service_requests_count}</span>
            </div>
          </div>
        )}
      </div>

      {/* Revenue Telemetry Cards */}
      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="laser-card p-6 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Registered Accounts</span>
            <div className="text-3xl font-extrabold text-slate-900">{analytics.total_users}</div>
            <span className="text-xs text-blue-600 font-semibold">{analytics.subscribed_users} Active Subscriptions</span>
          </div>

          <div className="laser-card p-6 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Recurring Revenue</span>
            <div className="text-3xl font-extrabold text-emerald-600">${analytics.monthly_recurring_revenue}</div>
            <span className="text-xs text-slate-500 font-semibold">MRR calculated from plan tiers</span>
          </div>

          <div className="laser-card p-6 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Annual Projected Revenue</span>
            <div className="text-3xl font-extrabold text-blue-600">${analytics.annual_projected_revenue}</div>
            <span className="text-xs text-slate-500 font-semibold">ARR Projection</span>
          </div>

          <div className="laser-card p-6 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trial Leads & Inquiries</span>
            <div className="text-3xl font-extrabold text-purple-600">{analytics.total_trials + analytics.total_inquiries}</div>
            <span className="text-xs text-slate-500 font-semibold">{analytics.total_trials} Evaluation Requests</span>
          </div>
        </div>
      )}

      {/* Registered Users & Subscriptions Table */}
      <div className="laser-card p-6 bg-white border border-slate-200 rounded-2xl space-y-4">
        <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          User Account Subscriptions ({users.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-3 font-bold text-slate-900">User / Email</th>
                <th className="p-3 font-bold text-slate-900">Plan Tier</th>
                <th className="p-3 font-bold text-slate-900">Ref Code</th>
                <th className="p-3 font-bold text-slate-900">Registered</th>
                <th className="p-3 font-bold text-slate-900">Action / Upgrade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-slate-400">No registered user records.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">
                      {user.username}
                      <span className="block text-[10px] text-slate-500 font-normal">{user.email}</span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${user.plan_tier === 'premium' ? 'bg-purple-100 text-purple-700' : user.plan_tier === 'standard' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                        {user.plan_tier}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[10px] text-slate-500">{user.payment_reference || 'N/A'}</td>
                    <td className="p-3 text-slate-500">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="p-3">
                      <select 
                        value={user.plan_tier}
                        onChange={(e) => handlePlanUpdate(user.id, e.target.value)}
                        className="p-1 bg-white border border-slate-300 rounded text-xs font-medium outline-none focus:border-blue-600"
                      >
                        <option value="free">Free Trial</option>
                        <option value="basic">Basic ($99/mo)</option>
                        <option value="standard">Standard ($299/mo)</option>
                        <option value="premium">Premium ($599/mo)</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trial Requests Leads Table */}
      <div className="laser-card p-6 bg-white border border-slate-200 rounded-2xl space-y-4">
        <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          Evaluation Software Trial Leads ({trials.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-3 font-bold text-slate-900">Lead Name / Email</th>
                <th className="p-3 font-bold text-slate-900">Organization</th>
                <th className="p-3 font-bold text-slate-900">Software Requested</th>
                <th className="p-3 font-bold text-slate-900">Date Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trials.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-slate-400">No trial evaluation leads.</td>
                </tr>
              ) : (
                trials.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">
                      {t.full_name}
                      <span className="block text-[10px] text-slate-500 font-normal">{t.email}</span>
                    </td>
                    <td className="p-3 text-slate-700">{t.company}</td>
                    <td className="p-3 font-semibold text-blue-600">{t.software_choice}</td>
                    <td className="p-3 text-slate-500">{new Date(t.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
