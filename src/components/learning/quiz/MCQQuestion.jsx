import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FeedbackPanel from './FeedbackPanel';
import ConfettiEffect from './ConfettiEffect';

/**
 * MCQQuestion - Multiple Choice Question Component
 * 
 * Displays a multiple-choice question with 4 options.
 * Provides immediate visual feedback with color-coded answers.
 * Triggers confetti animation for correct answers.
 * 
 * @component
 */
export default function MCQQuestion({
    question,
    selectedAnswer,
    onAnswer,
    onSubmit,
    showFeedback
}) {
    const [showConfetti, setShowConfetti] = useState(false);
    const [shake, setShake] = useState(false);

    // Trigger confetti for correct answers
    useEffect(() => {
        if (showFeedback && selectedAnswer === question.correctAnswer) {
            setShowConfetti(true);
        }
    }, [showFeedback, selectedAnswer, question.correctAnswer]);

    // Trigger shake for incorrect answers
    useEffect(() => {
        if (showFeedback && selectedAnswer !== question.correctAnswer) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    }, [showFeedback, selectedAnswer, question.correctAnswer]);

    /**
     * Get dynamic CSS classes for option buttons
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
        if (index === question.correctAnswer) {
            return `${baseClasses} bg-green-100 dark:bg-green-500/20 border-green-500 text-green-900 dark:text-green-300`;
        }
        if (index === selectedAnswer && index !== question.correctAnswer) {
            return `${baseClasses} bg-red-100 dark:bg-red-500/20 border-red-500 text-red-900 dark:text-red-300 ${shake ? 'animate-shake' : ''}`;
        }
        return `${baseClasses} bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-500`;
    };

    /**
     * Get option letter (A, B, C, D)
     */
    const getOptionLetter = (index) => String.fromCharCode(65 + index);

    return (
        <div className="space-y-6">
            {/* Confetti Effect */}
            <ConfettiEffect
                show={showConfetti}
                onComplete={() => setShowConfetti(false)}
            />

            {/* Difficulty Badge */}
            {question.difficulty && (
                <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${question.difficulty === 'easy'
                            ? 'bg-green-100 text-green-800'
                            : question.difficulty === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                        {question.difficulty.toUpperCase()}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        {question.points || 10} points
                    </span>
                </div>
            )}

            {/* Question Text */}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => !showFeedback && onAnswer(index)}
                        disabled={showFeedback}
                        className={getOptionClasses(index)}
                        aria-label={`Option ${getOptionLetter(index)}: ${option}`}
                    >
                        <span className="flex items-center gap-3">
                            {/* Option Letter Circle */}
                            <span className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${showFeedback && index === question.correctAnswer
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : showFeedback && index === selectedAnswer && index !== question.correctAnswer
                                        ? 'bg-red-500 border-red-500 text-white'
                                        : selectedAnswer === index
                                            ? 'bg-blue-500 border-blue-500 text-white'
                                            : 'border-slate-300 text-slate-600'
                                }`}>
                                {getOptionLetter(index)}
                            </span>

                            {/* Option Text */}
                            <span className="flex-1">{option}</span>

                            {/* Check/X Icons */}
                            {showFeedback && index === question.correctAnswer && (
                                <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                            {showFeedback && index === selectedAnswer && index !== question.correctAnswer && (
                                <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </span>
                    </button>
                ))}
            </div>

            {/* Submit Button */}
            {!showFeedback && (
                <button
                    onClick={onSubmit}
                    disabled={selectedAnswer === null}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                >
                    {selectedAnswer === null ? 'Select an answer' : 'Check Answer'}
                </button>
            )}

            {/* Feedback Panel */}
            {showFeedback && (
                <FeedbackPanel
                    isCorrect={selectedAnswer === question.correctAnswer}
                    explanation={question.explanation}
                />
            )}
        </div>
    );
}

MCQQuestion.propTypes = {
    question: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        correctAnswer: PropTypes.number.isRequired,
        explanation: PropTypes.string.isRequired,
        difficulty: PropTypes.oneOf(['easy', 'medium', 'hard']),
        points: PropTypes.number
    }).isRequired,
    selectedAnswer: PropTypes.number,
    onAnswer: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    showFeedback: PropTypes.bool.isRequired
};
