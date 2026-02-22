/**
 * @file LessonProgress.jsx
 * @description Visual progress indicator for microlearning lessons
 * @version 1.0.0
 * @since 2026-02-10
 * 
 * Features:
 * - Real-time progress bar with smooth animations
 * - Lesson counter (current/total)
 * - Estimated time remaining calculation
 * - Visual lesson dots indicator
 * - Color-coded completion states
 * - Responsive mobile layout
 * - Accessibility-first design
 * 
 * @component
 */

import React from "react";
import { PartyPopper } from "lucide-react";
import PropTypes from "prop-types";

/**
 * LessonProgress Component
 * Displays visual progress through a module's lessons
 * 
 * @param {Object} props - Component props
 * @param {number} props.currentIndex - Current lesson index (0-based)
 * @param {number} props.totalLessons - Total number of lessons
 * @param {Object[]} props.lessons - Array of lesson objects
 * @param {number} [props.lessons[].duration] - Lesson duration in minutes
 * @param {number[]} [props.completedLessons] - Array of completed lesson indices
 * 
 * @returns {JSX.Element} Rendered progress indicator
 */
const LessonProgress = ({
    currentIndex,
    totalLessons,
    lessons = [],
    completedLessons = [],
}) => {
    /**
     * Calculate estimated time remaining
     * @returns {number} Time in minutes
     */
    const calculateRemainingTime = () => {
        if (!lessons || lessons.length === 0) return 0;

        return lessons
            .slice(currentIndex)
            .reduce((sum, lesson) => sum + (lesson.duration || 5), 0);
    };

    /**
     * Calculate completion percentage
     * @returns {number} Percentage (0-100)
     */
    const calculateProgress = () => {
        if (totalLessons === 0) return 0;
        return Math.round((completedLessons.length / totalLessons) * 100);
    };

    /**
     * Get dot color based on lesson state
     * @param {number} index - Lesson index
     * @returns {string} CSS color class
     */
    const getDotColor = (index) => {
        if (completedLessons.includes(index)) {
            return 'bg-green-500';
        }
        if (index === currentIndex) {
            return 'bg-blue-500';
        }
        return 'bg-slate-300';
    };

    const remainingTime = calculateRemainingTime();
    const progressPercentage = calculateProgress();

    return (
        <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 mb-6 shadow-sm"
            role="region"
            aria-label="Lesson progress indicator"
        >
            {/* Progress Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span
                        className="text-sm font-semibold text-slate-900 dark:text-white"
                        aria-label={`Lesson ${currentIndex + 1} of ${totalLessons}`}
                    >
                        Lesson {currentIndex + 1} of {totalLessons}
                    </span>
                </div>

                {remainingTime > 0 && (
                    <div className="flex items-center gap-1.5">
                        <svg
                            className="w-4 h-4 text-slate-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span
                            className="text-sm text-slate-600 dark:text-slate-400 font-medium"
                            aria-label={`Approximately ${remainingTime} minutes remaining`}
                        >
                            ~{remainingTime} min left
                        </span>
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            <div
                className="relative w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden mb-3"
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label={`Module progress: ${progressPercentage}%`}
            >
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>

            {/* Lesson Dots Indicator */}
            <div
                className="flex gap-1.5 overflow-x-auto pb-1"
                role="list"
                aria-label="Individual lesson progress"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#cbd5e1 #f1f5f9'
                }}
            >
                {lessons.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-2 flex-shrink-0 rounded-full transition-all duration-300 ${getDotColor(idx)}`}
                        style={{
                            width: `${100 / totalLessons}%`,
                            minWidth: '8px',
                            maxWidth: '40px'
                        }}
                        role="listitem"
                        aria-label={`Lesson ${idx + 1}: ${completedLessons.includes(idx)
                                ? 'completed'
                                : idx === currentIndex
                                    ? 'in progress'
                                    : 'not started'
                            }`}
                    />
                ))}
            </div>

            {/* Completion Status Text */}
            {completedLessons.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        <span className="text-green-600 font-semibold">
                            {completedLessons.length}
                        </span>
                        {' '}of{' '}
                        <span className="font-semibold">{totalLessons}</span>
                        {' '}lessons completed
                        {completedLessons.length === totalLessons && (
                            <PartyPopper className="w-4 h-4 ml-2 inline-block text-green-600" />
                        )}
                    </p>
                </div>
            )}
        </div>
    );
};

// PropTypes for Development-Time Type Checking
LessonProgress.propTypes = {
    currentIndex: PropTypes.number.isRequired,
    totalLessons: PropTypes.number.isRequired,
    lessons: PropTypes.arrayOf(
        PropTypes.shape({
            duration: PropTypes.number,
        })
    ).isRequired,
    completedLessons: PropTypes.arrayOf(PropTypes.number),
};

LessonProgress.defaultProps = {
    completedLessons: [],
};

export default LessonProgress;
