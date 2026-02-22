import PropTypes from 'prop-types';
import { Sparkles, Lightbulb } from 'lucide-react';

/**
 * FeedbackPanel - Displays immediate feedback after answer submission
 * 
 * Shows success or encouragement message with detailed explanation.
 * Color-coded based on correctness.
 * 
 * @component
 */
export default function FeedbackPanel({ isCorrect, explanation, correctAnswer }) {
    return (
        <div
            className={`rounded-lg p-6 border-2 ${isCorrect
                    ? 'bg-green-50 dark:bg-green-500/10 border-green-500 dark:border-green-500/50'
                    : 'bg-orange-50 dark:bg-orange-500/10 border-orange-500 dark:border-orange-500/50'
                }`}
            role="alert"
            aria-live="polite"
        >
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                    {isCorrect ? (
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    ) : (
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1">
                    {/* Title */}
                    <h4 className={`text-lg font-bold mb-2 ${isCorrect ? 'text-green-900 dark:text-green-300' : 'text-orange-900 dark:text-orange-300'
                        }`}>
                        {isCorrect ? <><Sparkles className="w-5 h-5 inline-block mr-1 -mt-0.5" /> Excellent!</> : <><Lightbulb className="w-5 h-5 inline-block mr-1 -mt-0.5" /> Not quite!</>}
                    </h4>

                    {/* Explanation */}
                    <p className={`text-base leading-relaxed ${isCorrect ? 'text-green-800 dark:text-green-300' : 'text-orange-800 dark:text-orange-300'
                        }`}>
                        {explanation}
                    </p>

                    {/* Show correct answer for fill-in-blank if wrong */}
                    {!isCorrect && correctAnswer && (
                        <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded border border-orange-200 dark:border-orange-500/30">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-semibold">Correct answer:</span>{' '}
                                <span className="font-mono text-green-700">{correctAnswer}</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

FeedbackPanel.propTypes = {
    isCorrect: PropTypes.bool.isRequired,
    explanation: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string // Optional, for fill-in-blank questions
};
