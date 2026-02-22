/**
 * @file TextLesson.jsx
 * @description Enhanced microlearning text lesson component with visual aids and checkpoint quizzes
 * @version 1.0.0
 * @since 2026-02-10
 * 
 * Features:
 * - Concise 150-200 word content optimized for retention
 * - Key takeaways with visual hierarchy
 * - Integrated visual aids (comparisons, checklists, diagrams)
 * - Checkpoint quiz for immediate knowledge validation
 * - Duration indicator for time management
 * - Accessibility-first design (WCAG 2.1 AA compliant)
 * - Mobile-optimized responsive layout
 * 
 * @component
 */

import React from "react";
import { Target } from "lucide-react";
import PropTypes from "prop-types";
import VisualAidRenderer from "./VisualAidRenderer";
import CheckpointQuiz from "./CheckpointQuiz";

/**
 * TextLesson Component
 * Renders a microlearning text lesson with enhanced learning features
 * 
 * @param {Object} props - Component props
 * @param {Object} props.lesson - Lesson data object
 * @param {string} props.lesson.id - Unique lesson identifier
 * @param {string} props.lesson.title - Lesson title
 * @param {number} props.lesson.duration - Estimated reading time in minutes
 * @param {string} props.lesson.content - Main lesson content (150-200 words)
 * @param {string[]} props.lesson.keyPoints - Array of 3-4 key takeaways
 * @param {Object} [props.lesson.visualAid] - Optional visual learning aid
 * @param {Object} [props.lesson.checkpointQuiz] - Optional checkpoint quiz
 * @param {Function} props.onComplete - Callback when lesson is completed
 * @param {number} [props.currentIndex] - Current lesson index for progress tracking
 * @param {number} [props.totalLessons] - Total number of lessons in module
 * 
 * @returns {JSX.Element} Rendered text lesson component
 */
const TextLesson = ({
    lesson,
    onComplete,
    currentIndex = 0,
    totalLessons = 1,
}) => {
    const {
        title,
        duration = 3,
        content,
        keyPoints = [],
        visualAid,
        checkpointQuiz,
    } = lesson;

    /**
     * Handle checkpoint quiz completion
     * Triggers parent completion callback
     */
    const handleQuizComplete = () => {
        onComplete?.();
    };

    return (
        <article
            className="space-y-6 fade-in-up"
            role="article"
            aria-labelledby="lesson-title"
        >
            {/* Duration Badge - Time Management Aid */}
            <div
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                role="status"
                aria-label={`Estimated reading time: ${duration} minutes`}
            >
                <svg
                    className="w-4 h-4"
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
                <span className="font-medium">{duration} min read</span>
                {totalLessons > 1 && (
                    <span className="text-slate-400 dark:text-slate-500 ml-2">
                        • Lesson {currentIndex + 1} of {totalLessons}
                    </span>
                )}
            </div>

            {/* Main Content - Optimized for Readability */}
            <div className="prose prose-lg max-w-none">
                <div
                    className="text-slate-700 dark:text-slate-300 leading-relaxed"
                    style={{ fontSize: '1.0625rem', lineHeight: '1.75', textAlign: 'justify' }}
                >
                    {content}
                </div>
            </div>

            {/* Key Takeaways - Visual Learning Enhancement */}
            {keyPoints && keyPoints.length > 0 && (
                <div
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 border-l-4 border-blue-500 rounded-lg p-5 shadow-sm"
                    role="complementary"
                    aria-labelledby="key-takeaways-heading"
                >
                    <h3
                        id="key-takeaways-heading"
                        className="font-bold text-blue-900 dark:text-blue-300 mb-4 flex items-center gap-2 text-base"
                    >
                        <Target className="w-5 h-5 text-blue-600" />
                        <span>Key Takeaways</span>
                    </h3>
                    <ul className="space-y-3" role="list">
                        {keyPoints.map((point, idx) => (
                            <li
                                key={idx}
                                className="flex items-start gap-3"
                            >
                                <svg
                                    className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-slate-700 dark:text-slate-300 text-base leading-relaxed flex-1">
                                    {point}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Visual Aid - Multi-Modal Learning Support */}
            {visualAid && (
                <div
                    className="my-6"
                    role="complementary"
                    aria-label="Visual learning aid"
                >
                    <VisualAidRenderer visualAid={visualAid} />
                </div>
            )}

            {/* Checkpoint Quiz - Immediate Knowledge Validation */}
            {checkpointQuiz && (
                <div
                    className="mt-8"
                    role="complementary"
                    aria-label="Checkpoint quiz"
                >
                    <CheckpointQuiz
                        key={lesson.id}
                        quiz={checkpointQuiz}
                        onComplete={handleQuizComplete}
                        lessonTitle={title}
                    />
                </div>
            )}

            {/* Manual Completion - For Lessons Without Quiz */}
            {!checkpointQuiz && (
                <div className="flex justify-end pt-4">
                    <button
                        onClick={onComplete}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label="Mark lesson as complete and continue"
                    >
                        Continue →
                    </button>
                </div>
            )}
        </article>
    );
};

// PropTypes for Development-Time Type Checking
TextLesson.propTypes = {
    lesson: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        duration: PropTypes.number,
        content: PropTypes.string.isRequired,
        keyPoints: PropTypes.arrayOf(PropTypes.string),
        visualAid: PropTypes.object,
        checkpointQuiz: PropTypes.object,
    }).isRequired,
    onComplete: PropTypes.func.isRequired,
    currentIndex: PropTypes.number,
    totalLessons: PropTypes.number,
};

export default TextLesson;
