/**
 * @file ModuleGrid.jsx
 * @description Grid display of all modules in selected learning path
 * Shows completion progress and handles module selection
 * @version 1.0
 * @since 2025-12-23
 */

import React from "react";
import ModuleCard from "./ModuleCard";

/**
 * ModuleGrid Component
 * Displays all modules from selected path in a responsive grid
 * Handles premium content locking and completion status
 * 
 * @param {Object} props
 * @param {Array} props.modules - Array of module objects to display
 * @param {boolean} props.isAuthenticated - Is user logged in
 * @param {boolean} props.isPremium - Is user premium member (default: false)
 * @param {Function} props.onModuleClick - Callback when module is clicked
 * @param {Object} props.engine - Learning engine with progress helpers
 * @param {Function} props.engine.isCompleted - Check if module is completed
 * @param {Function} props.engine.isLocked - Check if module is locked
 * 
 * @returns {JSX.Element} Grid of module cards
 */
export default function ModuleGrid({
  modules,
  isAuthenticated,
  isPremium = false,
  onModuleClick,
  engine,
}) {
  // Calculate completion stats
  const completedCount = modules.filter(m => engine.isCompleted(m.id)).length;
  const completionPercentage = Math.round((completedCount / modules.length) * 100);

  if (!modules || modules.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 text-lg">No modules available in this path yet.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Completion Progress Bar - Professional */}
      <div className="mb-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Your Progress</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {completedCount} of {modules.length} modules completed
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{completionPercentage}%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">path complete</p>
          </div>
        </div>

        {/* Progress Bar - Animated */}
        <div className="relative">
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-indigo-600 transition-all duration-700 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Module Grid - Professional */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            isCompleted={engine.isCompleted(module.id)}
            isLocked={engine.isLocked(module)}
            onClick={() => onModuleClick(module)}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>

      {/* Completion Message - Professional */}
      {completedCount === modules.length && isAuthenticated && (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 border-2 border-emerald-200 dark:border-emerald-500/40 rounded-lg p-10 text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-2">Path Complete!</h3>
          <p className="text-emerald-800 dark:text-emerald-200 mb-6">
            You've mastered all modules in this learning path. Excellent work on building your cybersecurity knowledge.
          </p>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            Explore the other path to deepen your expertise and become a digital security expert.
          </p>
        </div>
      )}

      {/* Empty State for Guests */}
      {!isAuthenticated && (
        <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg p-6">
          <div className="flex gap-4">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-300">Track Your Progress</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                Sign in to track your progress, earn XP, unlock achievements, and maintain your learning streak.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
