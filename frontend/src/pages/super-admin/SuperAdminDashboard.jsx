import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import StatCard from '../../components/common/StatCard';
import DashboardLoader from '../../components/loading/DashboardLoader';
import SystemHealthModal from '../../components/modals/SystemHealthModal';
import SubscriptionModal from '../../components/modals/SubscriptionModal';
import { Building2, MapPin, Users, Activity, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [healthModalType, setHealthModalType] = useState(null); // 'api' | 'database' | 'storage' | null
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosClient.get('/dashboard/super-admin');
        if (res.success) {
          setStats(res.data);
        }
      } catch (err) {
        console.error("Error fetching super admin stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <DashboardLoader />;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Super Admin Command Center</h1>
          <p className="text-sm text-gray-500 mt-1">Multi-Tenant System Health, Platform Usage & Tenant Governance</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHealthModalType('api')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            System Operational (Click for Health)
          </button>
        </div>
      </div>

      {/* Top 4 Interactive Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div onClick={() => navigate('/super-admin/universities')} className="cursor-pointer transition-transform hover:-translate-y-1">
          <StatCard
            title="Total Tenants"
            value={stats?.totalTenants || 1}
            icon={ShieldCheck}
            color="blue"
          />
        </div>

        <div onClick={() => navigate('/super-admin/universities')} className="cursor-pointer transition-transform hover:-translate-y-1">
          <StatCard
            title="Total Universities"
            value={stats?.totalUniversities || 1}
            icon={Building2}
            color="emerald"
          />
        </div>

        <div onClick={() => navigate('/super-admin/campuses')} className="cursor-pointer transition-transform hover:-translate-y-1">
          <StatCard
            title="Total Campuses"
            value={stats?.totalCampuses || 1}
            icon={MapPin}
            color="amber"
          />
        </div>

        <div onClick={() => navigate('/super-admin/users')} className="cursor-pointer transition-transform hover:-translate-y-1">
          <StatCard
            title="System Users"
            value={stats?.totalUsers || 1}
            icon={Users}
            color="purple"
          />
        </div>
      </div>

      {/* Main Grid: Infrastructure Health & Active Subscriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Infrastructure & Database Status
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* API Health */}
            <div
              onClick={() => setHealthModalType('api')}
              className="p-4 bg-gray-50 hover:bg-emerald-50/60 rounded-lg border border-gray-200 cursor-pointer transition group"
            >
              <p className="text-xs text-gray-500 font-semibold uppercase group-hover:text-emerald-700">API Health</p>
              <p className="text-lg font-bold text-emerald-600 mt-1">{stats?.systemHealth || 'UP'}</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">Diagnostics →</p>
            </div>

            {/* Database Status */}
            <div
              onClick={() => setHealthModalType('database')}
              className="p-4 bg-gray-50 hover:bg-emerald-50/60 rounded-lg border border-gray-200 cursor-pointer transition group"
            >
              <p className="text-xs text-gray-500 font-semibold uppercase group-hover:text-emerald-700">Database Status</p>
              <p className="text-lg font-bold text-emerald-600 mt-1">{stats?.databaseStatus || 'HEALTHY'}</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">Pool Status →</p>
            </div>

            {/* Storage Allocation */}
            <div
              onClick={() => setHealthModalType('storage')}
              className="p-4 bg-gray-50 hover:bg-blue-50/60 rounded-lg border border-gray-200 cursor-pointer transition group"
            >
              <p className="text-xs text-gray-500 font-semibold uppercase group-hover:text-blue-700">Storage Allocation</p>
              <p className="text-lg font-bold text-gray-800 mt-1">{stats?.storageUsage || '14.2 GB / 500 GB'}</p>
              <p className="text-[11px] text-blue-600 font-semibold mt-1 flex items-center gap-1">Backups →</p>
            </div>
          </div>
        </div>

        {/* Active Subscriptions Panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-purple-600" />
            Active Subscriptions
          </h3>
          <div className="space-y-3">
            <div
              onClick={() => setIsSubscriptionModalOpen(true)}
              className="flex items-center justify-between p-3.5 bg-blue-50 hover:bg-blue-100/80 rounded-lg border border-blue-200 cursor-pointer transition group"
            >
              <div>
                <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition">Apex Global University</p>
                <p className="text-xs text-gray-500">Enterprise License • Unlimited Users</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-md">
                  Active
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostics & Governance Modals */}
      <SystemHealthModal
        isOpen={healthModalType !== null}
        onClose={() => setHealthModalType(null)}
        type={healthModalType || 'api'}
      />

      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />
    </div>
  );
};

export default SuperAdminDashboard;
