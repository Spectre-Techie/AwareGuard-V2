/**
 * @file PathSelector.jsx
 * @description Allows users to choose between different learning paths (Beginner, Advanced, Corporate)
 * Shows path details and allows switching with visual feedback
 * @version 1.0
 * @since 2025-12-23
 */

import React from "react";

/**
 * PathSelector Component
 * Displays available learning paths and allows user selection
 * 
 * @param {Object} props
 * @param {Array} props.paths - Array of learning path objects
 * @param {string} props.selectedPath - Currently selected path ID
 * @param {Function} props.onPathChange - Callback when path changes
 * 
 * @returns {JSX.Element} Path selector with visual cards
 */
export default function PathSelector({ paths, selectedPath, onPathChange }) {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paths.map((path) => (
          <button
            key={path.id}
            onClick={() => onPathChange(path.id)}
            className={`relative p-8 rounded-lg text-left transition-all duration-300 border-2 group
              ${selectedPath === path.id
                ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 border-blue-400 dark:border-blue-500 shadow-lg"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md"
              }
            `}
          >
            {/* Active Badge */}
            {selectedPath === path.id && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Selected
              </div>
            )}

            {/* Path Title */}
            <h3 className={`text-2xl font-bold mb-2 ${
              selectedPath === path.id 
                ? "text-slate-900 dark:text-white" 
                : "text-slate-900 dark:text-white group-hover:text-blue-600"
            }`}>
              {path.title}
            </h3>

            {/* Description */}
            <p className={`text-base mb-6 leading-relaxed ${
              selectedPath === path.id 
                ? "text-slate-700 dark:text-slate-300" 
                : "text-slate-600 dark:text-slate-400"
            }`}>
              {path.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Modules</p>
                <p className={`text-2xl font-bold ${selectedPath === path.id ? "text-blue-600" : "text-slate-900 dark:text-white"}`}>
                  {path.modules.length}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Total XP</p>
                <p className={`text-2xl font-bold ${selectedPath === path.id ? "text-blue-600" : "text-slate-900 dark:text-white"}`}>
                  {path.modules.reduce((sum, m) => sum + m.xp, 0)}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Est. Time</p>
                <p className={`text-2xl font-bold ${selectedPath === path.id ? "text-blue-600" : "text-slate-900 dark:text-white"}`}>
                  {path.estimatedHours || "4"}h
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Helpful Tip Section */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg p-6">
        <div className="flex gap-4">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">Choosing Your Path</p>
            <p className="text-sm text-blue-800">
              Start with <strong>Foundations</strong> if you're new to cybersecurity. Each path progressively deepens your knowledge. You can switch anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
