import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import StatCard from '../../components/common/StatCard';
import DashboardLoader from '../../components/loading/DashboardLoader';
import { Building2, MapPin, Users, Activity, ShieldCheck, CreditCard } from 'lucide-react';

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Super Admin Command Center</h1>
          <p className="text-sm text-gray-500 mt-1">Multi-Tenant System Health, Platform Usage & Tenant Governance</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            System Operational
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Tenants"
          value={stats?.totalTenants || 0}
          icon={ShieldCheck}
          color="blue"
        />
        <StatCard
          title="Total Universities"
          value={stats?.totalUniversities || 0}
          icon={Building2}
          color="emerald"
        />
        <StatCard
          title="Total Campuses"
          value={stats?.totalCampuses || 0}
          icon={MapPin}
          color="amber"
        />
        <StatCard
          title="System Users"
          value={stats?.totalUsers || 0}
          icon={Users}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Infrastructure & Database Status
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 font-semibold uppercase">API Health</p>
              <p className="text-lg font-bold text-emerald-600 mt-1">{stats?.systemHealth || 'HEALTHY'}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 font-semibold uppercase">Database Status</p>
              <p className="text-lg font-bold text-emerald-600 mt-1">{stats?.databaseStatus || 'CONNECTED'}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 font-semibold uppercase">Storage Allocation</p>
              <p className="text-lg font-bold text-gray-800 mt-1">{stats?.storageUsage || '14.2 GB'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-purple-600" />
            Active Subscriptions
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div>
                <p className="text-sm font-semibold text-gray-900">Apex Global University</p>
                <p className="text-xs text-gray-500">Enterprise License</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-md">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
