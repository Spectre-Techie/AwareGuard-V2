import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import {
  Users,
  FileWarning,
  CreditCard,
  BookOpen,
  TrendingUp,
  Crown,
  Clock,
  AlertCircle,
} from 'lucide-react';

export default function AdminDashboard() {
  const { fetchDashboard } = useAdmin();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const result = await fetchDashboard();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p>{error}</p>
        <button onClick={loadDashboard} className="ml-auto text-sm font-medium underline">Retry</button>
      </div>
    );
  }

  const overview = data?.overview || {};
  const userGrowth = data?.userGrowth || [];
  const recentPayments = data?.recentPayments || [];

  const stats = [
    {
      label: 'Total Users',
      value: overview.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      sub: `+${overview.newUsersLast30Days || 0} this month`,
    },
    {
      label: 'Premium Users',
      value: overview.premiumUsers || 0,
      icon: Crown,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      sub: `${overview.premiumPercentage || 0}% of total`,
    },
    {
      label: 'Pending Reports',
      value: overview.pendingReports || 0,
      icon: FileWarning,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      sub: `${overview.totalReports || 0} total reports`,
    },
    {
      label: 'Revenue',
      value: `₦${((overview.totalRevenue || 0) / 100).toLocaleString()}`,
      icon: CreditCard,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      sub: 'Total earnings',
    },
    {
      label: 'Community Stories',
      value: overview.totalStories || 0,
      icon: BookOpen,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      sub: 'Published stories',
    },
    {
      label: 'Free Users',
      value: overview.freeUsers || 0,
      icon: TrendingUp,
      color: 'bg-slate-500',
      lightColor: 'bg-slate-50',
      textColor: 'text-slate-700',
      sub: 'Potential upgrades',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back. Here's what's happening with AwareGuard.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
              </div>
              <div className={`${stat.lightColor} p-2.5 rounded-lg`}>
                <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            User Growth (Last 7 Days)
          </h3>
          {userGrowth.length === 0 ? (
            <p className="text-slate-400 text-sm py-8 text-center">No growth data available yet</p>
          ) : (
            <div className="space-y-2">
              {userGrowth.map((day) => (
                <div key={day._id} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-20 flex-shrink-0">
                    {new Date(day._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <div className="flex-1 bg-slate-100 rounded-full h-6 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full flex items-center justify-end pr-2 transition-all"
                      style={{ width: `${Math.max(Math.min((day.count / Math.max(...userGrowth.map(d => d.count))) * 100, 100), 8)}%` }}
                    >
                      <span className="text-xs font-medium text-white">{day.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-500" />
            Recent Payments
          </h3>
          {recentPayments.length === 0 ? (
            <p className="text-slate-400 text-sm py-8 text-center">No payments recorded yet</p>
          ) : (
            <div className="space-y-3">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">
                      {payment.user?.name || payment.user?.email || 'Unknown'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {payment.plan} &middot; {new Date(payment.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600">
                    ₦{(payment.amount / 100).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <a
            href="/admin/reports"
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-100 transition"
          >
            <FileWarning className="w-4 h-4" />
            Review Reports ({overview.pendingReports || 0})
          </a>
          <a
            href="/admin/users"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition"
          >
            <Users className="w-4 h-4" />
            Manage Users
          </a>
          <a
            href="/admin/stories"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition"
          >
            <BookOpen className="w-4 h-4" />
            View Stories
          </a>
        </div>
      </div>
    </div>
  );
}
