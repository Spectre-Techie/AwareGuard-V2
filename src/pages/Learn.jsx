/**
 * @file Learn.jsx
 * @description Main learning platform page - orchestrates complete learning experience
 * Shows learning paths, modules, progress tracking, premium features, and enterprise options
 * Designed for investor credibility, monetization, and maximum user engagement
 * Supports: Guest, Free User, Premium User, and Enterprise organizational accounts
 * @version 3.0
 * @since 2025-12-23
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useLearningEngine from "../hooks/useLearningEngine";
import { LEARNING_PATHS } from "../data/learningData";
import AuthModal from "../components/AuthModal";
import LearningHeader from "../components/learning/LearningHeader";
import PathSelector from "../components/learning/PathSelector";
import ModuleGrid from "../components/learning/ModuleGrid";
import ModuleViewer from "../components/learning/ModuleViewer";
import GuestModeNotice from "../components/learning/GuestModeNotice";
import ErrorBoundary from "../components/ErrorBoundary";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, CheckCircle2, Zap, Star, Lock, Info, Users, ChevronRight, ShieldCheck, BookOpen, TrendingUp, Award } from "lucide-react";

/**
 * Learn Component
 * Main learning page that orchestrates the entire learning experience
 * Manages path selection, module viewing, progress tracking, and monetization
 * 
 * Features:
 * - Multi-path learning system (Beginner, Advanced, Expert)
 * - Premium content differentiation
 * - Corporate training section
 * - Progress tracking and gamification
 * - Guest mode with signup prompts
 * - Full-stack ready with backend integration
 * 
 * @returns {JSX.Element} Complete learning platform UI
 */
const Learn = () => {
  const { user } = useAuth();
  const isAuthenticated = Boolean(user);
  const isPremium = user?.isPremium || false; // Assume this exists in user object

  // State management
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState("beginner");
  const [selectedModule, setSelectedModule] = useState(null);
  const [toast, setToast] = useState(null);

  // Simple toast notification helper
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Learning engine hook - handles all progress logic
  const engine = useLearningEngine(
    LEARNING_PATHS.flatMap((path) => path.modules)
  );

  // Get current learning path with proper metadata
  const currentPath = LEARNING_PATHS.find((p) => p.id === selectedPath);

  /**
   * Handle module click - check if premium and prompt if needed
   */
  const handleModuleClick = (module) => {
    if (module.premium && !isPremium && !isAuthenticated) {
      setAuthOpen(true);
      return;
    }
    if (module.premium && !isPremium) {
      handleUpgrade();
      return;
    }
    setSelectedModule(module);
  };

  /**
   * Handle module completion
   * Updates progress in backend and local storage
   */
  const handleCompleteModule = async (module) => {
    try {
      if (!isAuthenticated) {
        showToast("Please sign in to track your progress and earn XP", "error");
        setAuthOpen(true);
        return;
      }

      // Call backend to complete module
      const result = await engine.completeModule(module);

      // Show success toast with XP gained
      if (result && result.xpGained) {
        showToast(`Module Completed! +${result.xpGained} XP earned`, "success");
      } else {
        showToast("Module Completed!", "success");
      }

      // Module viewer will see completion state update automatically
    } catch (err) {
      console.error("Failed to complete module:", err);

      // Show appropriate error toast
      if (err.message.includes("already completed")) {
        showToast("You've already completed this module!", "error");
      } else if (err.message.includes("premium")) {
        showToast("Upgrade to Premium to access this module", "error");
      } else {
        showToast(err.message || "Failed to complete module. Please try again.", "error");
      }
    }
  };

  /**
   * Handle premium upgrade
   * Redirects to pricing page
   */
  const handleUpgrade = () => {
    navigate('/pricing?plan=premium&source=learn');
  };

  /**
   * Handle corporate sales inquiry
   */
  const handleContactSales = () => {
    navigate('/contact?type=enterprise');
  };


  if (selectedModule) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <ErrorBoundary onReset={() => setSelectedModule(null)}>
          <ModuleViewer
            key={selectedModule.id} // FORCE RESET on module change
            module={selectedModule}
            allModules={currentPath?.modules || []}
            isCompleted={engine.isCompleted(selectedModule.id)}
            onComplete={() => handleCompleteModule(selectedModule)}
            onBack={() => setSelectedModule(null)}
            onNextModule={(nextModule) => setSelectedModule(nextModule)}
            isAuthenticated={isAuthenticated}
            onQuizSubmit={showToast}
          />
        </ErrorBoundary>
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

        {/* Toast Notification */}
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-lg text-white font-semibold z-50 ${toast.type === "success" ? "bg-blue-600" : "bg-red-600"}`}
          >
            {toast.message}
          </motion.div>
        )}
      </div>
    );
  }

  // Main learning page view
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* ===== HERO SECTION - Modern Professional Design ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-5 lg:gap-16 items-center">
            {/* Left: Value Proposition - 3 cols */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  AwareGuard Learning Platform
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
                  Learn to Stay
                  <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Safe Online
                  </span>
                </h1>

                <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
                  Structured, bite-sized cybersecurity lessons. Identify threats, protect your data, and outsmart scammers — all at your own pace.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-6 mb-8">
                  {[
                    { icon: BookOpen, label: "14+ Lessons", color: "text-blue-400" },
                    { icon: Award, label: "XP & Badges", color: "text-amber-400" },
                    { icon: TrendingUp, label: "Track Progress", color: "text-emerald-400" },
                  ].map(({ icon: Icon, label, color }) => (
                    <div key={label} className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${color}`} />
                      <span className="text-sm font-medium text-slate-300">{label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {!isAuthenticated ? (
                    <>
                      <button
                        onClick={() => setAuthOpen(true)}
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30"
                      >
                        Start Learning Free
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const el = document.getElementById('learning-paths');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200"
                      >
                        Browse Courses
                      </button>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-slate-300 font-medium">
                        Welcome back, <span className="text-white font-bold">{user?.name || "learner"}</span>
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {isPremium && (
                          <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-300 px-3 py-1.5 rounded-lg text-sm font-semibold">
                            <Star className="w-3.5 h-3.5" /> Premium
                          </span>
                        )}
                        <button
                          onClick={() => {
                            const el = document.getElementById('learning-paths');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 text-sm"
                        >
                          Continue Learning <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right: Progress Card or Feature Highlights - 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-2"
            >
              {isAuthenticated ? (
                /* Authenticated: Progress Card */
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Your Progress
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {engine.progress.totalXP || 0} XP total
                    </span>
                  </div>

                  {/* Level display */}
                  <div className="flex items-end gap-3 mb-5">
                    <div className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums">
                      {engine.progress.level || 1}
                    </div>
                    <div className="pb-1">
                      <p className="text-sm font-semibold text-slate-300">Level</p>
                      <p className="text-xs text-slate-500">
                        {(() => {
                          const currentXP = engine.progress.totalXP || 0;
                          const currentLevel = engine.progress.level || 1;
                          const thresholds = [0, 50, 100, 200, 350, 550, 800, 1100, 1450, 1850];
                          const currentThreshold = thresholds[currentLevel - 1] || 0;
                          const nextThreshold = currentLevel < 10 ? thresholds[currentLevel] : currentThreshold + 500;
                          const xpNeeded = nextThreshold - currentXP;
                          return `${Math.max(0, xpNeeded)} XP to next level`;
                        })()}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                        style={{
                          width: `${(() => {
                            const currentXP = engine.progress.totalXP || 0;
                            const currentLevel = engine.progress.level || 1;
                            const thresholds = [0, 50, 100, 200, 350, 550, 800, 1100, 1450, 1850];
                            const currentThreshold = thresholds[currentLevel - 1] || 0;
                            const nextThreshold = currentLevel < 10 ? thresholds[currentLevel] : currentThreshold + 500;
                            const xpInLevel = currentXP - currentThreshold;
                            const xpNeeded = nextThreshold - currentThreshold;
                            return Math.min(100, (xpInLevel / xpNeeded) * 100);
                          })()}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                      <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                        {engine.progress.completedModules?.length || 0}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">Modules done</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                      <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                        {engine.progress.streak || 0}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">Day streak</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Guest: Feature Cards */
                <div className="space-y-4">
                  {[
                    {
                      icon: BookOpen,
                      title: "Bite-Sized Lessons",
                      desc: "3-5 minute modules designed for busy learners. Master one concept at a time.",
                      color: "text-blue-400",
                      bg: "bg-blue-500/10",
                    },
                    {
                      icon: Zap,
                      title: "Interactive Quizzes",
                      desc: "Test your knowledge with real-world scenarios. Earn XP and track your score.",
                      color: "text-amber-400",
                      bg: "bg-amber-500/10",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Real Protection Skills",
                      desc: "Learn to spot phishing, scams, and social engineering before they hurt you.",
                      color: "text-emerald-400",
                      bg: "bg-emerald-500/10",
                    },
                  ].map(({ icon: Icon, title, desc, color, bg }) => (
                    <div
                      key={title}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/[0.08] transition-colors"
                    >
                      <div className="flex gap-4">
                        <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-slate-50 dark:bg-slate-950 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Path Selector - Professional Section */}
          <div className="mb-16" id="learning-paths">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Choose Your Learning Path</h2>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Select a path aligned with your goals. Switch anytime as you progress.
              </p>
            </div>
            <PathSelector
              paths={LEARNING_PATHS}
              selectedPath={selectedPath}
              onPathChange={setSelectedPath}
            />
          </div>

          {/* Resume Learning Section - Next Best Action */}
          {isAuthenticated && engine.progress.completedModules.length > 0 && selectedPath && (
            <div className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Continue Learning</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                    Resume Your Progress
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                    You've completed {engine.progress.completedModules.length} module{engine.progress.completedModules.length !== 1 ? 's' : ''}
                    {' '}so far and earned {engine.progress.totalXP} XP. Keep the momentum going!
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 max-w-xs">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">Path Progress</span>
                        <span className="text-sm font-bold text-blue-600">
                          {engine.progress.completedModules.length}/{currentPath?.modules?.length || 0}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                          style={{ width: `${currentPath?.modules?.length ? (engine.progress.completedModules.length / currentPath.modules.length) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const nextIncompleteModule = currentPath?.modules?.find(
                      m => !engine.isCompleted(m.id)
                    );
                    if (nextIncompleteModule) {
                      setSelectedModule(nextIncompleteModule);
                    }
                  }}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 whitespace-nowrap shadow-md hover:shadow-lg text-center flex-shrink-0"
                >
                  Resume Learning
                  <ArrowRight className="w-4 h-4 ml-1 inline" />
                </button>
              </div>
            </div>
          )}

          {/* Guest Mode Notice - Professional Conversion */}
          {!isAuthenticated && (
            <div className="mb-12">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 sm:p-8 text-center mb-6">
                <svg className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Track Your Progress</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Sign in to earn XP, unlock achievements, build your learning streak, and get personalized recommendations based on your learning patterns.
                </p>
              </div>
              <GuestModeNotice onSignIn={() => setAuthOpen(true)} />
            </div>
          )}

          {/* Module Grid - Main Learning Content */}
          {currentPath && (
            <div className="mb-16">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {selectedPath === "beginner" ? "Foundations" : "Advanced Techniques"}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {selectedPath === "beginner"
                    ? "Master essential cybersecurity knowledge every person needs"
                    : "Deep-dive into sophisticated threat patterns and defense strategies"
                  }
                </p>
              </div>
              <ModuleGrid
                modules={currentPath.modules}
                isAuthenticated={isAuthenticated}
                isPremium={isPremium}
                onModuleClick={handleModuleClick}
                engine={engine}
              />
            </div>
          )}

          {/* Premium Lock Notice - Professional */}
          {!isPremium && selectedPath !== "beginner" && (
            <div className="mb-16 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 border border-amber-200 dark:border-amber-500/30 rounded-lg p-8 md:p-10">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <Lock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-300 mb-2">
                    Premium Content
                  </h3>
                  <p className="text-amber-800 dark:text-amber-200 mb-6">
                    These modules contain advanced threat simulations and real-world attack scenarios. Upgrade to access them and master enterprise-level security practices.
                  </p>
                  <button
                    onClick={() => handleUpgrade()}
                    className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Unlock Premium
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Learning Tips Section - Professional */}
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How to Learn Effectively</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Evidence-based strategies to maximize retention and real-world application
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Tip 1 */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-8 hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Take Your Time</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Spacing out learning over days improves retention by 300%. Focus on understanding, not speed.
                </p>
              </div>

              {/* Tip 2 */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-8 hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Complete Quizzes</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Testing yourself immediately after learning strengthens memory consolidation. Earn bonus XP on 70%+ scores.
                </p>
              </div>

              {/* Tip 3 */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-8 hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Build Your Streak</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Consistent learning activates habit formation. Even 15 minutes daily outperforms weekend cramming sessions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Professional Authority */}
      <section className="bg-slate-900 dark:bg-slate-950 text-white py-16 md:py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Protect Yourself and Others
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Every person deserves to feel confident navigating the digital world safely. Start your learning journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => setAuthOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleContactSales()}
                  className="inline-flex items-center justify-center gap-2 border-2 border-slate-400 text-slate-300 hover:border-white hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  For Teams
                  <Users className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setSelectedPath("beginner")}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Continue Learning
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      {/* Toast Notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-lg text-white font-semibold z-50 ${toast.type === "success" ? "bg-blue-600" : "bg-red-600"}`}
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
};

export default Learn;
