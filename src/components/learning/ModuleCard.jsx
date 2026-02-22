/**
 * @file ModuleCard.jsx
 * @description Enhanced module card showing professional metadata
 * Displays: title, description, difficulty, category, rating, completion rate, XP, time, quiz, lessons
 * Supports premium content locking and completion status
 * University-grade quality with investor credibility
 * @version 2.0
 * @since 2025-12-23
 */

import React from "react";

/**
 * ModuleCard Component
 * Displays a single learning module with complete metadata and professional styling
 * 
 * Displays:
 * - Title and description
 * - Difficulty level (Easy, Medium, Hard)
 * - Category (Phishing, Job Scams, Password Security, etc.)
 * - Rating (4.6 - 4.9 stars)
 * - Completion rate (58% - 94%)
 * - XP reward
 * - Estimated time
 * - Quiz count and lesson count
 * - Premium badge if applicable
 * - Completion status
 * - Lock status for premium content
 * 
 * @param {Object} props
 * @param {Object} props.module - Complete module data object
 * @param {string} props.module.id - Unique identifier
 * @param {string} props.module.title - Module title
 * @param {string} props.module.description - Module description
 * @param {string} props.module.category - Content category (Phishing, etc)
 * @param {string} props.module.difficulty - Difficulty level (Easy, Medium, Hard)
 * @param {number} props.module.xp - XP reward
 * @param {number} props.module.rating - User rating (0-5)
 * @param {number} props.module.completionRate - Completion rate (0-100)
 * @param {number} props.module.lessonsCount - Number of lessons
 * @param {number} props.module.quizzesCount - Number of quizzes
 * @param {number} props.module.estimatedMinutes - Time estimate in minutes
 * @param {boolean} props.module.premium - Is premium content
 * @param {boolean} props.isCompleted - User has completed this module
 * @param {boolean} props.isLocked - Module is locked for user
 * @param {Function} props.onClick - Click callback
 * @param {boolean} props.isAuthenticated - Is user logged in
 * 
 * @returns {JSX.Element} Professional module card
 */
export default function ModuleCard({
  module,
  isCompleted,
  isLocked,
  onClick,
  isAuthenticated,
}) {
  // Get difficulty color with slate system
  const difficultyColor = {
    "Easy": "bg-emerald-100 text-emerald-700 border border-emerald-200",
    "Medium": "bg-amber-100 text-amber-700 border border-amber-200",
    "Hard": "bg-red-100 text-red-700 border border-red-200",
  }[module.difficulty] || "bg-slate-100 text-slate-700 border border-slate-200";

  // Star rating display
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-slate-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-xs font-semibold text-slate-700 ml-2">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div
      onClick={!isLocked ? onClick : null}
      className={`
        rounded-lg overflow-hidden border transition-all duration-300
        ${isLocked
          ? "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 cursor-not-allowed opacity-60"
          : isCompleted
            ? "bg-gradient-to-br from-white to-emerald-50 dark:from-slate-900 dark:to-emerald-950 border-emerald-300 dark:border-emerald-800 shadow-md hover:shadow-lg"
            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg cursor-pointer"
        }
      `}
    >
      {/* Card Content */}
      <div className="p-6">
        {/* Header: Title + Status */}
        <div className="flex items-start justify-between mb-4 gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 truncate">
              {module.title}
            </h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              {module.category || "General"}
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex-shrink-0">
            {isCompleted && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-white shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            {isLocked && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            {module.premium && !isLocked && !isCompleted && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {module.description}
        </p>

        {/* Skills Gained - Professional Badge Display */}
        {module.skillsGained && module.skillsGained.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Skills Gained</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {module.skillsGained.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-500/20"
                >
                  {skill}
                </span>
              ))}
              {module.skillsGained.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  +{module.skillsGained.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Metadata Row */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${difficultyColor}`}>
            {module.difficulty || "Medium"}
          </span>
          {module.rating && renderStars(module.rating)}
        </div>

        {/* Stats Grid - Professional */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {/* XP */}
          <div className="bg-amber-50 dark:bg-amber-500/10 rounded-lg p-3 text-center border border-amber-100 dark:border-amber-500/20">
            <p className="text-xs text-amber-600 font-bold mb-1">XP</p>
            <p className="text-xl font-bold text-amber-600">+{module.xp}</p>
          </div>

          {/* Lessons */}
          <div className="bg-blue-50 dark:bg-blue-500/10 rounded-lg p-3 text-center border border-blue-100 dark:border-blue-500/20">
            <p className="text-xs text-blue-600 font-bold mb-1">Lessons</p>
            <p className="text-xl font-bold text-blue-600">{module.lessonsCount || 3}</p>
          </div>

          {/* Quizzes */}
          <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-lg p-3 text-center border border-indigo-100 dark:border-indigo-500/20">
            <p className="text-xs text-indigo-600 font-bold mb-1">✓</p>
            <p className="text-xl font-bold text-indigo-600">{module.quizzesCount || 1}</p>
          </div>

          {/* Time */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-bold mb-1">Time</p>
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300">{module.estimatedMinutes}m</p>
          </div>
        </div>

        {/* CTA Footer */}
        {!isLocked && (
          <button
            onClick={onClick}
            className={`w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2
              ${isCompleted
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
              }
            `}
          >
            {isCompleted ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Completed
              </>
            ) : (
              <>
                Begin Training
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        )}

        {isLocked && (
          <div className="w-full py-2 px-4 rounded-lg font-semibold text-sm text-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Premium Only
          </div>
        )}
      </div>
    </div>
  );
}
