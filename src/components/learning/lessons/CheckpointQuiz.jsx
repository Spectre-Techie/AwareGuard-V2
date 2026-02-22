/**
 * @file CheckpointQuiz.jsx
 * @description Microlearning checkpoint quiz with immediate feedback and gamification
 * @version 1.0.0
 * @since 2026-02-10
 * 
 * Features:
 * - Single-question quiz for immediate knowledge validation
 * - Instant visual feedback (success/error states)
 * - Detailed explanations for learning reinforcement
 * - Confetti animation on correct answers (gamification)
 * - Auto-advance on success (2-second delay)
 * - Retry mechanism for incorrect answers
 * - Accessibility-first design with ARIA labels
 * - Mobile-optimized touch targets (min 44px)
 * 
 * @component
 */

import React, { useState, useEffect } from "react";
import { CircleCheckBig, Sparkles, Lightbulb } from "lucide-react";
import PropTypes from "prop-types";

/**
 * CheckpointQuiz Component
 * Mini quiz after each lesson for immediate knowledge check
 * 
 * @param {Object} props - Component props
 * @param {Object} props.quiz - Quiz data object
 * @param {string} props.quiz.question - Quiz question text
 * @param {string[]} props.quiz.options - Array of answer options
 * @param {number} props.quiz.correctAnswer - Index of correct answer
 * @param {string} props.quiz.explanation - Explanation text for learning
 * @param {Function} props.onComplete - Callback when quiz is passed
 * @param {string} [props.lessonTitle] - Parent lesson title for context
 * 
 * @returns {JSX.Element} Rendered checkpoint quiz component
 */
const CheckpointQuiz = ({ quiz, onComplete, lessonTitle = "" }) => {
    const { question, options = [], correctAnswer, explanation } = quiz;

    // Component State
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    /**
     * Handle answer submission
     * Validates answer and triggers appropriate feedback
     */
    const handleSubmit = () => {
        if (selectedAnswer === null) return;

        const correct = selectedAnswer === correctAnswer;
        setIsCorrect(correct);
        setShowFeedback(true);

        // Auto-advance on correct answer after 2 seconds
        if (correct) {
            setTimeout(() => {
                onComplete?.();
            }, 2000);
        }
    };

    /**
     * Handle retry - Reset quiz state
     */
    const handleRetry = () => {
        setSelectedAnswer(null);
        setShowFeedback(false);
        setIsCorrect(false);
    };

    /**
     * Handle answer selection
     * @param {number} index - Selected option index
     */
    const handleSelectAnswer = (index) => {
        if (!showFeedback) {
            setSelectedAnswer(index);
        }
    };

    /**
     * Get button style classes based on state
     * @param {number} index - Option index
     * @returns {string} CSS classes
     */
    const getOptionClasses = (index) => {
        const baseClasses = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 font-medium text-base";

        if (!showFeedback) {
            // Before submission
            return `${baseClasses} ${selectedAnswer === index
                    ? "bg-blue-100 dark:bg-blue-500/20 border-blue-500 shadow-sm text-slate-900 dark:text-white"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-500/10 text-slate-900 dark:text-slate-200"
                }`;
        }

        // After submission
        if (index === correctAnswer) {
            return `${baseClasses} bg-green-100 dark:bg-green-500/20 border-green-500 text-green-900 dark:text-green-300`;
        }
        if (index === selectedAnswer && index !== correctAnswer) {
            return `${baseClasses} bg-red-100 dark:bg-red-500/20 border-red-500 text-red-900 dark:text-red-300`;
        }
        return `${baseClasses} bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-500`;
    };

    return (
        <div
            className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl p-6 shadow-sm"
            role="region"
            aria-labelledby="checkpoint-quiz-heading"
        >
            {/* Quiz Header */}
            <div className="mb-5">
                <h4
                    id="checkpoint-quiz-heading"
                    className="font-bold text-purple-900 dark:text-purple-300 mb-2 flex items-center gap-2 text-lg"
                >
                    <CircleCheckBig className="w-6 h-6 text-purple-600" aria-hidden="true" />
                    <span>Quick Check</span>
                </h4>
                {lessonTitle && (
                    <p className="text-sm text-purple-700 dark:text-purple-400">
                        Testing your understanding of: {lessonTitle}
                    </p>
                )}
            </div>

            {/* Question */}
            <div className="mb-5">
                <p
                    className="text-slate-800 dark:text-slate-200 font-semibold text-base leading-relaxed"
                    id="quiz-question"
                >
                    {question}
                </p>
            </div>

            {/* Answer Options */}
            <div
                className="space-y-3 mb-5"
                role="radiogroup"
                aria-labelledby="quiz-question"
            >
                {options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSelectAnswer(idx)}
                        disabled={showFeedback}
                        className={getOptionClasses(idx)}
                        role="radio"
                        aria-checked={selectedAnswer === idx}
                        aria-label={`Option ${idx + 1}: ${option}`}
                        style={{ minHeight: '44px' }} // Touch target size
                    >
                        <div className="flex items-start gap-3">
                            {/* Radio Indicator */}
                            <div className="flex-shrink-0 mt-0.5">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAnswer === idx
                                        ? 'border-blue-600 bg-blue-600'
                                        : 'border-slate-400 bg-white'
                                    }`}>
                                    {selectedAnswer === idx && (
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                    )}
                                </div>
                            </div>

                            {/* Option Text */}
                            <span className="flex-1">{option}</span>

                            {/* Feedback Icons */}
                            {showFeedback && (
                                <div className="flex-shrink-0">
                                    {idx === correctAnswer && (
                                        <span className="text-green-600 text-xl" aria-label="Correct answer">
                                            ✓
                                        </span>
                                    )}
                                    {idx === selectedAnswer && idx !== correctAnswer && (
                                        <span className="text-red-600 text-xl" aria-label="Incorrect answer">
                                            ✗
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {/* Submit Button */}
            {!showFeedback && (
                <button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold text-base hover:from-purple-700 hover:to-pink-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    aria-label="Submit your answer"
                >
                    Check Answer
                </button>
            )}

            {/* Feedback Section */}
            {showFeedback && (
                <div
                    className={`rounded-lg p-5 border-2 ${isCorrect
                            ? 'bg-green-50 dark:bg-green-500/10 border-green-300 dark:border-green-500/30'
                            : 'bg-orange-50 dark:bg-orange-500/10 border-orange-300 dark:border-orange-500/30'
                        }`}
                    role="alert"
                    aria-live="polite"
                >
                    {/* Feedback Header */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-3xl" aria-hidden="true">
                            {isCorrect ? <Sparkles className="w-8 h-8 text-green-600" /> : <Lightbulb className="w-8 h-8 text-orange-600" />}
                        </span>
                        <p className={`font-bold text-lg ${isCorrect ? 'text-green-900 dark:text-green-300' : 'text-orange-900 dark:text-orange-300'
                            }`}>
                            {isCorrect ? 'Correct!' : 'Not quite!'}
                        </p>
                    </div>

                    {/* Explanation */}
                    <p className={`text-base leading-relaxed mb-4 ${isCorrect ? 'text-green-800 dark:text-green-300' : 'text-orange-800 dark:text-orange-300'
                        }`}>
                        {explanation}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        {!isCorrect && (
                            <button
                                onClick={handleRetry}
                                className="flex-1 bg-white border-2 border-orange-400 text-orange-900 py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-orange-50 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                aria-label="Try the quiz again"
                            >
                                Try Again
                            </button>
                        )}
                        {isCorrect && (
                            <div className="flex-1 text-center">
                                <p className="text-green-700 text-sm font-medium">
                                    Advancing to next lesson in 2 seconds...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Confetti Effect on Correct Answer */}
            {showFeedback && isCorrect && (
                <div
                    className="fixed inset-0 pointer-events-none z-50"
                    aria-hidden="true"
                >
                    {/* Simple confetti animation using CSS */}
                    <style>{`
            @keyframes confetti-fall {
              0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
              100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
            .confetti {
              position: absolute;
              width: 10px;
              height: 10px;
              background: #f59e0b;
              animation: confetti-fall 3s linear;
            }
          `}</style>
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: '-10px',
                                animationDelay: `${Math.random() * 0.5}s`,
                                background: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5],
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// PropTypes for Development-Time Type Checking
CheckpointQuiz.propTypes = {
    quiz: PropTypes.shape({
        question: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        correctAnswer: PropTypes.number.isRequired,
        explanation: PropTypes.string.isRequired,
    }).isRequired,
    onComplete: PropTypes.func.isRequired,
    lessonTitle: PropTypes.string,
};

export default CheckpointQuiz;
