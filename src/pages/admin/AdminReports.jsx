import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  X,
  BookOpen,
  FileWarning,
} from 'lucide-react';

const STATUS_CONFIG = {
  pending: { color: 'bg-orange-100 text-orange-700', icon: Clock, label: 'Pending' },
  approved: { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: 'Approved' },
  rejected: { color: 'bg-red-100 text-red-700', icon: XCircle, label: 'Rejected' },
};

export default function AdminReports() {
  const { fetchReports, approveReport, rejectReport } = useAdmin();
  const [reports, setReports] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [actionLoading, setActionLoading] = useState('');
  const [approveModal, setApproveModal] = useState(null);
  const [rejectModal, setRejectModal] = useState(null);
  const [storyTitle, setStoryTitle] = useState('');
  const [storyCategory, setStoryCategory] = useState('Scam Report');
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    loadReports();
  }, [pagination.page, statusFilter]);

  const loadReports = async () => {
    try {
      setLoading(true);
      const result = await fetchReports({
        page: pagination.page,
        limit: 20,
        status: statusFilter,
      });
      setReports(result.reports || []);
      setPagination(result.pagination || { page: 1, pages: 1, total: 0 });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!approveModal) return;
    setActionLoading(approveModal._id);
    try {
      await approveReport(approveModal._id, {
        title: storyTitle || `Scam Report: ${approveModal.details?.substring(0, 50)}...`,
        category: storyCategory,
      });
      setApproveModal(null);
      setStoryTitle('');
      setStoryCategory('Scam Report');
      loadReports();
    } catch (err) {
      alert('Failed: ' + err.message);
    } finally {
      setActionLoading('');
    }
  };

  const handleReject = async () => {
    if (!rejectModal) return;
    setActionLoading(rejectModal._id);
    try {
      await rejectReport(rejectModal._id, rejectReason);
      setRejectModal(null);
      setRejectReason('');
      loadReports();
    } catch (err) {
      alert('Failed: ' + err.message);
    } finally {
      setActionLoading('');
    }
  };

  if (error && !reports.length) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3">
        <AlertCircle className="w-5 h-5" />
        <p>{error}</p>
        <button onClick={loadReports} className="ml-auto text-sm font-medium underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Report Management</h1>
          <p className="text-slate-500 text-sm mt-1">
            Review scam reports. Approved reports become community stories.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-2 flex gap-1 flex-wrap">
        {['', 'pending', 'approved', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => { setStatusFilter(status); setPagination(p => ({ ...p, page: 1 })); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              statusFilter === status
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {status === '' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 text-center py-20 text-slate-400">
            <FileWarning className="w-10 h-10 mx-auto mb-3 text-slate-300" />
            <p>No reports found</p>
          </div>
        ) : (
          reports.map((report) => {
            const statusConf = STATUS_CONFIG[report.status] || STATUS_CONFIG.pending;
            const StatusIcon = statusConf.icon;

            return (
              <div
                key={report._id}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Status + Reporter */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConf.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConf.label}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    {/* Reporter Info */}
                    <p className="text-sm font-semibold text-slate-700">{report.name || 'Anonymous'}</p>
                    <p className="text-xs text-slate-400 mb-2">{report.email}</p>

                    {/* Report Details */}
                    <p className="text-sm text-slate-600 line-clamp-3">{report.details}</p>

                    {/* Reviewed info */}
                    {report.status !== 'pending' && report.reviewedBy && (
                      <p className="text-xs text-slate-400 mt-2">
                        Reviewed by {report.reviewedBy.name || report.reviewedBy.email} on{' '}
                        {new Date(report.reviewedAt).toLocaleDateString()}
                      </p>
                    )}

                    {report.status === 'rejected' && report.rejectionReason && (
                      <p className="text-xs text-red-500 mt-1 italic">Reason: {report.rejectionReason}</p>
                    )}

                    {report.status === 'approved' && report.publishedStoryId && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        Published as community story
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  {report.status === 'pending' && (
                    <div className="flex sm:flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => { setApproveModal(report); setStoryTitle(''); }}
                        disabled={actionLoading === report._id}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => { setRejectModal(report); setRejectReason(''); }}
                        disabled={actionLoading === report._id}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  )}

                  {report.status !== 'pending' && (
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition flex-shrink-0"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 px-4 py-3">
          <p className="text-sm text-slate-500">
            Page {pagination.page} of {pagination.pages} ({pagination.total} total)
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPagination(p => ({ ...p, page: Math.max(1, p.page - 1) }))}
              disabled={pagination.page <= 1}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPagination(p => ({ ...p, page: Math.min(p.pages, p.page + 1) }))}
              disabled={pagination.page >= pagination.pages}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {approveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setApproveModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Approve & Publish as Story</h3>
              <button onClick={() => setApproveModal(null)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-1">Report Preview</p>
                <p className="text-sm text-slate-600 line-clamp-4">{approveModal.details}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Story Title</label>
                <input
                  type="text"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  placeholder={`Scam Report: ${approveModal.details?.substring(0, 40)}...`}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={storyCategory}
                  onChange={(e) => setStoryCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                >
                  <option>Scam Report</option>
                  <option>Phishing</option>
                  <option>Fake Store</option>
                  <option>Investment Fraud</option>
                  <option>Job Scam</option>
                  <option>Romance Scam</option>
                  <option>General</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setApproveModal(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={actionLoading === approveModal._id}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition disabled:opacity-50"
              >
                {actionLoading === approveModal._id ? 'Publishing...' : 'Approve & Publish'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setRejectModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Reject Report</h3>
              <button onClick={() => setRejectModal(null)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-1">Report from {rejectModal.name}</p>
                <p className="text-sm text-slate-600 line-clamp-3">{rejectModal.details}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Rejection Reason (optional)</label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Does not meet community guidelines..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 h-20 resize-none"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setRejectModal(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading === rejectModal._id}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition disabled:opacity-50"
              >
                {actionLoading === rejectModal._id ? 'Rejecting...' : 'Reject Report'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal (for reviewed reports) */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedReport(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="font-semibold text-slate-800">Report Details</h3>
              <button onClick={() => setSelectedReport(null)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400">Name</p>
                  <p className="text-sm font-medium text-slate-700">{selectedReport.name}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="text-sm font-medium text-slate-700">{selectedReport.email}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400">Status</p>
                  <p className="text-sm font-medium text-slate-700 capitalize">{selectedReport.status}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400">Submitted</p>
                  <p className="text-sm font-medium text-slate-700">{new Date(selectedReport.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Report Details</p>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-sm text-slate-600 whitespace-pre-wrap">{selectedReport.details}</p>
                </div>
              </div>
              {selectedReport.rejectionReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-red-700">Rejection Reason</p>
                  <p className="text-sm text-red-600 mt-1">{selectedReport.rejectionReason}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
