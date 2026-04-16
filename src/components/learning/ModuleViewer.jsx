/**
 * @file ModuleViewer.jsx
 * @description Full module view with all lessons, interactive content, and AI tutor
 * Displays multiple lessons per module with integrated AI assistance
 * Features: lessons, quizzes, AI tutor, completion tracking
 * @version 2.0
 * @since 2025-12-23
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, CheckCircle2, Lightbulb, Award, ClipboardCheck, ShieldCheck, Lock, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LearningAI from "./LearningAI";
import LessonProgress from "./LessonProgress";
import TextLesson from "./lessons/TextLesson";
import QuizEngine from "./quiz/QuizEngine";

/**
 * ModuleViewer Component
 * Shows complete module with all lessons and completion mechanics
 *
 * @param {Object} props
 * @param {Object} props.module - Module object with lessons
 * @param {string} props.module.id - Module ID
 * @param {string} props.module.title - Module title
 * @param {string} props.module.description - Module description
 * @param {Array} props.module.lessons - Array of lesson content
 * @param {number} props.module.xp - XP reward
 * @param {boolean} props.module.premium - Is premium
 * @param {Array} props.allModules - All modules in the path (for next button)
 * @param {boolean} props.isCompleted - Has user completed this
 * @param {Function} props.onComplete - Callback to complete module
 * @param {Function} props.onBack - Callback to go back to grid
 * @param {Function} props.onNextModule - Callback to go to next module
 * @param {boolean} props.isAuthenticated - Is user logged in
 *
 * @returns {JSX.Element} Full module view with lessons
 */
export default function ModuleViewer({
  module,
  allModules = [],
  isCompleted,
  onComplete,
  onBack,
  onNextModule,
  isAuthenticated,
  onQuizSubmit = () => { },
}) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showSignupWall, setShowSignupWall] = useState(false);

  const navigate = useNavigate();
  const GUEST_LESSON_LIMIT = 5;

  // Track guest lessons completed across sessions via sessionStorage
  const getGuestLessonCount = () => {
    if (isAuthenticated) return 0;
    return parseInt(sessionStorage.getItem('AG_GUEST_LESSONS') || '0', 10);
  };

  const incrementGuestLessonCount = () => {
    if (isAuthenticated) return;
    const count = getGuestLessonCount() + 1;
    sessionStorage.setItem('AG_GUEST_LESSONS', String(count));
    if (count >= GUEST_LESSON_LIMIT) {
      setShowSignupWall(true);
    }
  };

  // Reset state when module changes (e.g., moving to next module)
  useEffect(() => {
    setCurrentLessonIndex(0);
    setCompletedLessons([]);
    setShowQuiz(false);
    setQuizCompleted(false);
    setShowAITutor(false);
    setShowCompletionModal(false);
  }, [module.id]);

  // Scroll to top when navigating between lessons
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentLessonIndex]);

  // Check if guest has already hit the lesson limit on mount
  useEffect(() => {
    if (!isAuthenticated && getGuestLessonCount() >= GUEST_LESSON_LIMIT) {
      setShowSignupWall(true);
    }
  }, [isAuthenticated]);

  // Ensure lessons array exists
  const lessons = module.lessons && Array.isArray(module.lessons)
    ? module.lessons.map((lesson, idx) => {
      if (typeof lesson === "string") {
        return {
          id: `lesson-${idx}`,
          title: `Lesson ${idx + 1}`,
          content: lesson,
          tips: [],
        };
      }
      return {
        ...lesson,
        id: lesson.id || `lesson-${idx}`,
        title: lesson.title || `Lesson ${idx + 1}`,
        content: lesson.content || lesson,
        tips: lesson.tips || [],
      };
    })
    : [];

  if (lessons.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 dark:text-slate-400">No lessons available in this module yet.</p>
      </div>
    );
  }

  const currentLesson = lessons[currentLessonIndex];
  const lessonsCompleted = completedLessons.length;
  const allLessonsCompleted = completedLessons.length === lessons.length;
  const completionPercentage = Math.round((lessonsCompleted / lessons.length) * 100);

  const handleCompleteLesson = () => {
    if (!completedLessons.includes(currentLessonIndex)) {
      setCompletedLessons([...completedLessons, currentLessonIndex]);
      // Track guest lesson completions
      if (!isAuthenticated) {
        incrementGuestLessonCount();
        // Check if wall should show immediately
        if (getGuestLessonCount() + 1 >= GUEST_LESSON_LIMIT) {
          setShowSignupWall(true);
          return; // Don't advance, show wall
        }
      }
    }
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handleCompleteModule = async () => {
    if (!isAuthenticated) {
      // Completion not allowed without auth - parent component handles message
      return;
    }

    // Don't allow completion if already completed
    if (isCompleted) {
      return;
    }

    setShowCompletionModal(true);
    // Actual completion happens in parent
    await onComplete?.();
    setShowCompletionModal(false);
  };

  /**
   * Get next module
   */
  const getNextModule = () => {
    if (!allModules || allModules.length === 0) return null;
    const currentIndex = allModules.findIndex(m => m.id === module.id);
    if (currentIndex >= 0 && currentIndex < allModules.length - 1) {
      return allModules[currentIndex + 1];
    }
    return null;
  };

  const nextModule = getNextModule();

  /**
   * Handle quiz completion from QuizEngine
   */
  const handleQuizComplete = (results) => {
    setQuizCompleted(true);

    // Show quiz result via toast
    const passingScore = module.quiz?.passingScore || 70;
    const scorePercentage = results.percentage || results.scorePercentage || 0;

    if (results.passed) {
      onQuizSubmit(`Quiz Passed! You scored ${scorePercentage}%`, "success");
    } else {
      onQuizSubmit(`Quiz Failed. You scored ${scorePercentage}%. Try again!`, "error");
    }
  };

  /**
   * Handle quiz retry
   */
  const handleQuizRetry = () => {
    setShowQuiz(false);
    setQuizCompleted(false);
    // Small delay before allowing restart
    setTimeout(() => {
      setShowQuiz(true);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header with Back Button */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition text-sm"
          >
            ← Back to Modules
          </button>
          <div className="text-right">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium uppercase">Progress</p>
            <p className="font-bold text-slate-900 dark:text-white">
              {completionPercentage}%
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Module Header */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-blue-100 dark:bg-blue-500/10 text-blue-600 rounded-lg p-3 text-2xl">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">{module.title}</h1>
              <p className="text-slate-700 dark:text-slate-400 text-base mt-2 leading-relaxed">{module.description}</p>
            </div>
          </div>

          {/* Module Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-500/5 rounded-lg p-4 border border-blue-200 dark:border-blue-500/20">
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold uppercase mb-1">
                Lessons
              </p>
              <p className="text-2xl font-bold text-blue-600">{lessons.length}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-500/10 dark:to-orange-500/5 rounded-lg p-4 border border-orange-200 dark:border-orange-500/20">
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold uppercase mb-1">
                XP Reward
              </p>
              <p className="text-2xl font-bold text-orange-600">+{module.xp}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-500/5 rounded-lg p-4 border border-green-200 dark:border-green-500/20">
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold uppercase mb-1">
                Completed
              </p>
              <p className="text-2xl font-bold text-green-600">{lessonsCompleted}/{lessons.length}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-500/5 rounded-lg p-4 border border-purple-200 dark:border-purple-500/20">
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold uppercase mb-1">
                Progress
              </p>
              <p className="text-2xl font-bold text-purple-600">{completionPercentage}%</p>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Module Progress
            </p>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Lesson Progress Indicator */}
        <LessonProgress
          currentIndex={currentLessonIndex}
          totalLessons={lessons.length}
          lessons={lessons}
          completedLessons={completedLessons}
        />

        {/* Lessons Container */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8 mb-12">
          {/* Lesson List Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 sticky top-32">
              <p className="text-sm font-bold text-slate-900 dark:text-white uppercase mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                <BookOpen className="w-4 h-4 inline-block mr-1.5 -mt-0.5" /> All Lessons
              </p>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLessonIndex(idx)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${currentLessonIndex === idx
                      ? "bg-blue-600 text-white font-semibold"
                      : completedLessons.includes(idx)
                        ? "bg-green-100 dark:bg-green-500/10 text-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-500/20"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      {completedLessons.includes(idx) ? (
                        <span className="text-green-600">✓</span>
                      ) : currentLessonIndex === idx ? (
                        <span className="text-white">▶</span>
                      ) : (
                        <span className="text-gray-400">{idx + 1}</span>
                      )}
                      <span className="text-sm font-medium">
                        {lesson.title || `Lesson ${idx + 1}`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Current Lesson Content */}
          <div className="lg:col-span-3">
            {currentLesson ? (
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-8">
                {/* Lesson Type Router - Microlearning Support */}
                {currentLesson.type === 'text' ? (
                  <TextLesson
                    lesson={currentLesson}
                    onComplete={handleCompleteLesson}
                    currentIndex={currentLessonIndex}
                    totalLessons={lessons.length}
                  />
                ) : (
                  /* Fallback for old lesson format (backward compatibility) */
                  <React.Fragment>
                    {/* Lesson Header */}
                    <div className="mb-8">
                      <span className="inline-block bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold mb-3 uppercase tracking-widest">
                        Lesson {currentLessonIndex + 1} of {lessons.length}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {currentLesson.title}
                      </h2>
                    </div>

                    {/* Lesson Content */}
                    <div className="mb-8 bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                      <div className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                        {currentLesson.content}
                      </div>

                      {/* Tips if available */}
                      {currentLesson.tips && currentLesson.tips.length > 0 && (
                        <div className="bg-blue-50 dark:bg-blue-500/10 border-l-4 border-blue-500 p-4 mt-8 rounded">
                          <p className="font-bold text-blue-900 dark:text-blue-300 mb-3 text-base flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-blue-600" />
                            Key Tips
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 text-base">
                            {currentLesson.tips.map((tip, idx) => (
                              <li key={idx} className="text-slate-700 dark:text-slate-300">{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                )}

                {/* Quiz/Reflection (Optional) */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-500/5 border border-blue-200 dark:border-blue-500/30 rounded-lg p-6 mb-8">
                  <p className="font-semibold text-blue-900 dark:text-blue-300 mb-3 text-sm uppercase">
                    Got it?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleCompleteLesson}
                      className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
                    >
                      Yes, Continue
                    </button>
                    <button
                      onClick={() => setShowAITutor(!showAITutor)}
                      className="flex-1 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 py-2.5 px-4 rounded-lg border border-blue-300 dark:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition font-semibold text-sm"
                    >
                      {showAITutor ? "Close Help" : "Need Help?"}
                    </button>
                  </div>
                </div>

                {/* AI Tutor Section */}
                {showAITutor && (
                  <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10 border border-purple-200 dark:border-purple-500/30 rounded-lg p-6">
                    <LearningAI
                      module={module}
                      lesson={currentLesson}
                      lessonIndex={currentLessonIndex}
                      quiz={module.quiz}
                      isCompact={true}
                    />
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center sm:justify-between">
                  {currentLessonIndex > 0 && (
                    <button
                      onClick={() => setCurrentLessonIndex(currentLessonIndex - 1)}
                      className="px-5 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition font-semibold text-sm text-center"
                    >
                      ← Previous
                    </button>
                  )}
                  {!completedLessons.includes(currentLessonIndex) && (
                    <button
                      onClick={handleCompleteLesson}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg hover:shadow-lg transition font-semibold flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" /> Mark Complete
                    </button>
                  )}
                  {currentLessonIndex < lessons.length - 1 && (
                    <button
                      onClick={() => setCurrentLessonIndex(currentLessonIndex + 1)}
                      className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-center"
                    >
                      Next Lesson →
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400">Lesson content not found.</p>
                <button
                  onClick={() => setCurrentLessonIndex(0)}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Return to start of module
                </button>
              </div>
            )}
            {/* End of Current Lesson Content (lg:col-span-3) */}
          </div>
          {/* End of grid grid-cols-1 lg:grid-cols-4 */}
        </div>

        {/* Module Completion Section */}
        {allLessonsCompleted && !showQuiz && !isCompleted && (
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-500/10 dark:to-yellow-500/10 rounded-xl border border-orange-200 dark:border-orange-500/30 p-8 text-center mb-12">
            <ClipboardCheck className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              Time for Your Quiz!
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-base leading-relaxed">
              You've completed all {lessons.length} lessons. Test your knowledge and earn bonus XP!
            </p>
            <button
              onClick={() => setShowQuiz(true)}
              className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition inline-block"
            >
              Start Quiz ({module.quiz?.questions?.length || 0} Q's)
            </button>
          </div>
        )}

        {/* QUIZ SECTION - New QuizEngine */}
        {showQuiz && module.quiz && (
          <QuizEngine
            quiz={module.quiz}
            moduleId={module.id}
            onComplete={handleQuizComplete}
            onRetry={handleQuizRetry}
            onCompleteModule={handleCompleteModule}
            onNextModule={onNextModule}
            isModuleCompleted={isCompleted}
            nextModule={nextModule}
          />
        )}

        {/* Module Completion Section (Old) */}
        {allLessonsCompleted && !showQuiz && !isCompleted && !module.quiz && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-500/10 dark:to-blue-500/10 rounded-xl border-2 border-green-400 dark:border-green-500/50 p-8 text-center">
            <Award className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              All Lessons Complete!
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              You've completed all {lessons.length} lessons in this module. Ready to earn your XP and complete this module?
            </p>
            <div className="flex gap-4">
              {!isCompleted ? (
                <button
                  onClick={handleCompleteModule}
                  disabled={isCompleted}
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Complete Module & Earn {module.xp} XP
                </button>
              ) : (
                <div className="flex-1 bg-green-100 border-2 border-green-500 text-green-800 px-8 py-4 rounded-lg font-bold text-lg text-center">
                  Module Completed!
                </div>
              )}
              {nextModule && (
                <button
                  onClick={() => {
                    onNextModule?.(nextModule);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition"
                >
                  {isCompleted ? 'Next Module →' : 'Complete & Next Module →'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Guest Signup Wall - Strict popup after 5 lessons */}
      <AnimatePresence>
        {showSignupWall && !isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-8 text-center relative"
            >
              {/* Shield icon */}
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Sign Up to Continue Learning
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                You've completed <span className="font-bold text-blue-600 dark:text-blue-400">{GUEST_LESSON_LIMIT} free lessons</span> as a guest. Create an account to unlock:
              </p>

              <ul className="text-left space-y-3 my-6">
                {[
                  "Unlimited access to all lessons",
                  "Track progress and earn XP",
                  "Take quizzes and earn certificates",
                  "Personalized learning recommendations"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate('/signup')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 mb-3"
              >
                <UserPlus className="w-5 h-5" />
                Create Free Account
              </button>
              <button
                onClick={() => navigate('/signin')}
                className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-3 rounded-xl font-semibold transition text-sm"
              >
                Already have an account? Sign In
              </button>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
                It's completely free. No credit card required.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}