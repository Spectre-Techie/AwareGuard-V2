import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import {
  Search,
  Crown,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  X,
  UserCheck,
  UserX,
} from 'lucide-react';

export default function AdminUsers() {
  const { fetchUsers, updateUser, deleteUser } = useAdmin();
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [premiumFilter, setPremiumFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState('');

  useEffect(() => {
    loadUsers();
  }, [pagination.page, premiumFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const result = await fetchUsers({
        page: pagination.page,
        limit: 20,
        search,
        isPremium: premiumFilter,
      });
      setUsers(result.users || []);
      setPagination(result.pagination || { page: 1, pages: 1, total: 0 });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    loadUsers();
  };

  const handleTogglePremium = async (user) => {
    if (!confirm(`${user.isPremium ? 'Remove' : 'Grant'} premium for ${user.name || user.email}?`)) return;
    setActionLoading(user._id);
    try {
      await updateUser(user._id, {
        isPremium: !user.isPremium,
        subscriptionPlan: user.isPremium ? 'none' : 'monthly',
        subscriptionExpiresAt: user.isPremium ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });
      loadUsers();
    } catch (err) {
      alert('Failed: ' + err.message);
    } finally {
      setActionLoading('');
    }
  };

  const handleDelete = async (user) => {
    if (!confirm(`Permanently delete ${user.name || user.email}? This cannot be undone.`)) return;
    setActionLoading(user._id);
    try {
      await deleteUser(user._id);
      loadUsers();
    } catch (err) {
      alert('Failed: ' + err.message);
    } finally {
      setActionLoading('');
    }
  };

  if (error && !users.length) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3">
        <AlertCircle className="w-5 h-5" />
        <p>{error}</p>
        <button onClick={loadUsers} className="ml-auto text-sm font-medium underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-500 text-sm mt-1">{pagination.total} total users</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>

          <select
            value={premiumFilter}
            onChange={(e) => { setPremiumFilter(e.target.value); setPagination(p => ({ ...p, page: 1 })); }}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
          >
            <option value="">All Plans</option>
            <option value="true">Premium</option>
            <option value="false">Free</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p>No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">User</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden md:table-cell">Joined</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Role</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Plan</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden lg:table-cell">Progress</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-700 text-xs font-bold">
                            {u.name?.[0]?.toUpperCase() || u.email?.[0]?.toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-700 truncate">{u.name || 'No name'}</p>
                          <p className="text-xs text-slate-400 truncate">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 hidden md:table-cell">
                      {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">User</span>
                    </td>
                    <td className="px-4 py-3">
                      {u.isPremium ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                          <Crown className="w-3 h-3" /> Premium
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">Free</span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Lv.{u.level || 1}</span>
                        <div className="w-16 bg-slate-100 rounded-full h-1.5">
                          <div
                            className="bg-blue-500 h-full rounded-full"
                            style={{ width: `${Math.min(((u.totalXP || 0) / 1850) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400">{u.totalXP || 0} XP</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleTogglePremium(u)}
                          disabled={actionLoading === u._id}
                          className={`p-1.5 rounded-lg transition ${u.isPremium ? 'text-amber-500 hover:bg-amber-50' : 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'}`}
                          title={u.isPremium ? 'Remove premium' : 'Grant premium'}
                        >
                          <Crown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(u)}
                          disabled={actionLoading === u._id}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                          title="Delete user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50">
            <p className="text-sm text-slate-500">
              Page {pagination.page} of {pagination.pages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPagination(p => ({ ...p, page: Math.max(1, p.page - 1) }))}
                disabled={pagination.page <= 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPagination(p => ({ ...p, page: Math.min(p.pages, p.page + 1) }))}
                disabled={pagination.page >= pagination.pages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedUser(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="font-semibold text-slate-800">User Details</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 text-xl font-bold">
                    {selectedUser.name?.[0]?.toUpperCase() || '?'}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-800">{selectedUser.name || 'No name'}</h4>
                  <p className="text-sm text-slate-500">{selectedUser.email}</p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <InfoItem label="Account" value="User" />
                <InfoItem label="Provider" value={selectedUser.provider || 'local'} />
                <InfoItem label="Premium" value={selectedUser.isPremium ? 'Yes' : 'No'} />
                <InfoItem label="Plan" value={selectedUser.subscriptionPlan || 'none'} />
                <InfoItem label="Level" value={selectedUser.level || 1} />
                <InfoItem label="Total XP" value={selectedUser.totalXP || 0} />
                <InfoItem label="Streak" value={`${selectedUser.streak || 0} days`} />
                <InfoItem label="Modules Done" value={selectedUser.completedModules?.length || 0} />
                <InfoItem label="Perfect Quizzes" value={selectedUser.perfectQuizzes || 0} />
                <InfoItem label="Joined" value={new Date(selectedUser.createdAt).toLocaleDateString()} />
              </div>

              {/* Subscription */}
              {selectedUser.isPremium && selectedUser.subscriptionExpiresAt && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-amber-800">
                    Subscription expires: {new Date(selectedUser.subscriptionExpiresAt).toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* Badges */}
              {selectedUser.badges?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-2">Badges</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.badges.map((b, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{b}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-lg p-3">
      <p className="text-xs text-slate-400 font-medium">{label}</p>
      <p className="text-sm font-semibold text-slate-700 mt-0.5">{String(value)}</p>
    </div>
  );
}
