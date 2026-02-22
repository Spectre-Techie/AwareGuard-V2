/**
 * @file LearningHeader.jsx
 * @description Displays user's learning progress: level, total XP, modules completed, streak
 * Designed to motivate users and show clear progression to investors
 * @version 1.0
 * @since 2025-12-23
 */

import React from "react";
import { Flame, GraduationCap } from "lucide-react";

/**
 * LearningHeader Component
 * Shows user's cumulative progress across all learning paths
 * 
 * @param {Object} props
 * @param {Object} props.progress - Progress object from useLearningEngine
 * @param {number} props.progress.level - Current user level (calculated from XP)
 * @param {number} props.progress.totalXP - Total XP earned
 * @param {Array} props.progress.completedModules - List of completed module IDs
 * @param {number} props.progress.streak - Current daily streak
 * @param {boolean} props.isAuthenticated - Is user logged in
 * 
 * @returns {JSX.Element} Header component with progress stats
 */
export default function LearningHeader({ progress, isAuthenticated }) {
  // Calculate percentage to next level using threshold-based system
  const thresholds = [0, 50, 100, 200, 350, 550, 800, 1100, 1450, 1850];
  const currentLevel = progress.level || 1;
  const currentThreshold = thresholds[currentLevel - 1] || 0;
  const nextThreshold = currentLevel < 10 ? thresholds[currentLevel] : currentThreshold + 500;
  const xpInCurrentLevel = progress.totalXP - currentThreshold;
  const xpNeededForLevel = nextThreshold - currentThreshold;
  const progressToNextLevel = Math.min(100, (xpInCurrentLevel / xpNeededForLevel) * 100);

  return (
    <div className="mb-12">
      {/* Main Progress Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Level */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mb-3">
              <span className="text-4xl font-bold">
                {isAuthenticated ? progress.level : "—"}
              </span>
            </div>
            <p className="text-sm font-semibold opacity-90">Your Level</p>
            {isAuthenticated && (
              <p className="text-xs opacity-75 mt-1">Professional</p>
            )}
          </div>

          {/* XP Progress */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold mb-2">Total XP</p>
            <p className="text-3xl font-bold mb-3">{progress.totalXP}</p>
            {isAuthenticated && (
              <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressToNextLevel}%` }}
                />
              </div>
            )}
            {isAuthenticated && (
              <p className="text-xs opacity-75 mt-1">
                {Math.max(0, xpNeededForLevel - xpInCurrentLevel)} XP to level {progress.level + 1}
              </p>
            )}
          </div>

          {/* Modules Completed */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mb-3">
              <span className="text-3xl font-bold">
                {isAuthenticated ? progress.completedModules.length : "—"}
              </span>
            </div>
            <p className="text-sm font-semibold opacity-90">Modules</p>
            <p className="text-xs opacity-75 mt-1">Completed</p>
          </div>

          {/* Streak (if authenticated) */}
          {isAuthenticated && (
            <div className="flex flex-col items-center justify-center">
              <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mb-3">
                <span className="text-3xl font-bold flex items-center gap-1">
                  <Flame className="w-6 h-6 text-orange-400" /> {progress.streak || 0}
                </span>
              </div>
              <p className="text-sm font-semibold opacity-90">Streak</p>
              <p className="text-xs opacity-75 mt-1">Days Active</p>
            </div>
          )}

          {/* Guest Notice */}
          {!isAuthenticated && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm font-semibold opacity-90">Sign in</p>
              <p className="text-xs opacity-75 mt-2">to track your progress</p>
            </div>
          )}
        </div>
      </div>

      {/* Sub Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Learning Paths */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
            Learning Paths
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">2</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Beginner & Advanced</p>
        </div>

        {/* Estimated Hours */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
            Course Hours
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {isAuthenticated ? "8+" : "8+"}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Total content</p>
        </div>

        {/* Certification */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
            <GraduationCap className="w-4 h-4 inline-block mr-1 -mt-0.5" /> Certificate
          </p>
          <p className="text-2xl font-bold text-blue-600">Coming</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Premium feature</p>
        </div>
      </div>

      {/* Info Message for Guests */}
      {!isAuthenticated && (
        <div className="mt-6 bg-blue-50 dark:bg-blue-500/10 border-l-4 border-blue-600 p-4 rounded">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold">New to AwareGuard?</span> Sign in to track your learning progress, earn XP, unlock achievements, and see your improvement over time.
          </p>
        </div>
      )}
    </div>
  );
}
