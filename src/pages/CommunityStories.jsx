import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Send, Plus, AlertCircle, Loader2, BookOpen, User, Quote, Calendar } from "lucide-react";

const BACKEND = "https://awareguard-backend.onrender.com/api/stories";

const categoryColors = {
  "Job Scam": "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  "Phishing Scam": "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  "Loan App Scam": "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  "Romance Scam": "bg-pink-100 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400",
  "Online Shopping Scam": "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
  "Investment Scam": "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  "Other": "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400",
};

const CommunityStories = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState({});
  const [commentLoading, setCommentLoading] = useState({});
  const [likingId, setLikingId] = useState(null);

  const loadStories = async () => {
    try {
      setLoading(true);
      const res = await fetch(BACKEND);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch stories");
      setStories(data.stories);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadStories(); }, []);

  const likeStory = async (id) => {
    setLikingId(id);
    try {
      const res = await fetch(`${BACKEND}/${id}/like`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStories((prev) => prev.map((s) => s._id === id ? { ...s, likesCount: data.likesCount } : s));
    } catch (err) {
      alert(err.message);
    } finally {
      setLikingId(null);
    }
  };

  const addComment = async (id) => {
    const text = commentText[id];
    if (!text) return;
    setCommentLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await fetch(`${BACKEND}/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStories((prev) => prev.map((s) => s._id === id ? { ...s, comments: data.comments } : s));
      setCommentText((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      alert(err.message);
    } finally {
      setCommentLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Hero */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Community Experiences
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Community Stories
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
              Real experiences from people who spotted, escaped, or prevented scams. Your story could save someone else.
            </p>
            <button
              onClick={() => navigate('/report')}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg shadow-blue-600/20"
            >
              <Plus className="w-4 h-4" /> Share Your Story
            </button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Stories */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">No stories yet. Be the first to share!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {stories.map((story, i) => (
              <motion.div
                key={story._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Category color bar */}
                <div className={`h-1 ${(categoryColors[story.category] || categoryColors["Other"]).split(" ")[0]}`} />

                <div className="p-6">
                  {/* Header: category badge + like */}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${categoryColors[story.category] || categoryColors["Other"]}`}>
                      {story.category}
                    </span>
                    <button
                      onClick={() => likeStory(story._id)}
                      disabled={likingId === story._id}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-300 dark:hover:border-red-500/30 transition text-sm group/like"
                    >
                      <Heart className="w-4 h-4 text-red-500 group-hover/like:scale-110 transition-transform" />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{story.likesCount}</span>
                    </button>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">{story.title}</h2>

                  {/* Story content with quote styling */}
                  <div className="relative pl-4 border-l-2 border-blue-200 dark:border-blue-500/30 mb-4">
                    <Quote className="absolute -left-2.5 -top-1 w-5 h-5 text-blue-300 dark:text-blue-500/50 bg-white dark:bg-slate-900" />
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">{story.content}</p>
                  </div>

                  {/* Author & meta */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                      {(story.name || "A").charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{story.name || "Anonymous"}</p>
                      {story.createdAt && (
                        <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(story.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5" /> {story.comments?.length || 0} Comments
                    </p>
                    {story.comments?.slice(0, 3).map((c, ci) => (
                      <div key={ci} className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 flex-shrink-0 mt-0.5">
                          {(c.name || "A").charAt(0).toUpperCase()}
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl text-sm flex-1">
                          <p className="font-medium text-slate-900 dark:text-white text-xs">{c.name}</p>
                          <p className="text-slate-600 dark:text-slate-400">{c.text}</p>
                        </div>
                      </div>
                    ))}
                    {story.comments?.length > 3 && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium pl-8">
                        + {story.comments.length - 3} more comments
                      </p>
                    )}
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        value={commentText[story._id] || ""}
                        onChange={(e) => setCommentText({ ...commentText, [story._id]: e.target.value })}
                      />
                      <button
                        onClick={() => addComment(story._id)}
                        disabled={commentLoading[story._id]}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition disabled:opacity-50 flex items-center gap-1.5"
                      >
                        {commentLoading[story._id] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityStories;
