import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import {
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Heart,
  MessageSquare,
  CheckCircle,
  BookOpen,
  X,
} from 'lucide-react';

export default function AdminStories() {
  const { fetchStories, deleteStory } = useAdmin();
  const [stories, setStories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStory, setSelectedStory] = useState(null);
  const [actionLoading, setActionLoading] = useState('');

  useEffect(() => {
    loadStories();
  }, [pagination.page]);

  const loadStories = async () => {
    try {
      setLoading(true);
      const result = await fetchStories({ page: pagination.page, limit: 20 });
      setStories(result.stories || []);
      setPagination(result.pagination || { page: 1, pages: 1, total: 0 });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (story) => {
    if (!confirm(`Delete "${story.title}"? This cannot be undone.`)) return;
    setActionLoading(story._id);
    try {
      await deleteStory(story._id);
      loadStories();
    } catch (err) {
      alert('Failed: ' + err.message);
    } finally {
      setActionLoading('');
    }
  };

  if (error && !stories.length) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3">
        <AlertCircle className="w-5 h-5" />
        <p>{error}</p>
        <button onClick={loadStories} className="ml-auto text-sm font-medium underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Story Management</h1>
        <p className="text-slate-500 text-sm mt-1">{pagination.total} community stories</p>
      </div>

      {/* Stories */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
        </div>
      ) : stories.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 text-center py-20 text-slate-400">
          <BookOpen className="w-10 h-10 mx-auto mb-3 text-slate-300" />
          <p>No stories yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {story.isApproved && (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    )}
                    <h3 className="font-semibold text-slate-700 truncate text-sm">{story.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    by {story.name || 'Anonymous'} &middot; {story.category || 'General'} &middot;{' '}
                    {new Date(story.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 line-clamp-3 mb-3">{story.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" /> {story.likesCount || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" /> {story.comments?.length || 0}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedStory(story)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(story)}
                    disabled={actionLoading === story._id}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 px-4 py-3">
          <p className="text-sm text-slate-500">Page {pagination.page} of {pagination.pages}</p>
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

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedStory(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="font-semibold text-slate-800">Story Details</h3>
              <button onClick={() => setSelectedStory(null)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-slate-800">{selectedStory.title}</h4>
                <p className="text-sm text-slate-400 mt-1">
                  by {selectedStory.name || 'Anonymous'} &middot; {selectedStory.category} &middot;{' '}
                  {new Date(selectedStory.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-sm text-slate-500">
                  <Heart className="w-4 h-4" /> {selectedStory.likesCount || 0} likes
                </span>
                <span className="flex items-center gap-1 text-sm text-slate-500">
                  <MessageSquare className="w-4 h-4" /> {selectedStory.comments?.length || 0} comments
                </span>
                {selectedStory.isApproved && (
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" /> Admin approved
                  </span>
                )}
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 whitespace-pre-wrap">{selectedStory.content}</p>
              </div>

              {/* Comments */}
              {selectedStory.comments?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-2">Comments ({selectedStory.comments.length})</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedStory.comments.map((c, i) => (
                      <div key={i} className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-slate-700">{c.name || 'Anonymous'}</span>
                          <span className="text-xs text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-slate-600">{c.text}</p>
                      </div>
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
