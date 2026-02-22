import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FeedbackPanel from './FeedbackPanel';
import ConfettiEffect from './ConfettiEffect';

/**
 * TrueFalseQuestion - True/False Question Component
 * 
 * Displays a binary choice question with large True/False buttons.
 * Simplified UI for quick decision-making questions.
 * 
 * @component
 */
export default function TrueFalseQuestion({
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
     * Get button classes based on state
     */
    const getButtonClasses = (value) => {
        const baseClasses = "flex-1 py-6 px-8 rounded-lg border-2 font-bold text-lg transition-all duration-200";

        if (!showFeedback) {
            // Before submission
            if (selectedAnswer === value) {
                return `${baseClasses} ${value === 0
                        ? 'bg-green-100 border-green-500 text-green-900'
                        : 'bg-red-100 border-red-500 text-red-900'
                    } shadow-sm`;
            }
            return `${baseClasses} bg-white border-slate-200 hover:border-slate-300 text-slate-700`;
        }

        // After submission
        if (value === question.correctAnswer) {
            return `${baseClasses} bg-green-100 border-green-500 text-green-900`;
        }
        if (value === selectedAnswer && value !== question.correctAnswer) {
            return `${baseClasses} bg-red-100 border-red-500 text-red-900 ${shake ? 'animate-shake' : ''}`;
        }
        return `${baseClasses} bg-slate-50 border-slate-200 text-slate-400`;
    };

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
                    <span className="text-sm text-slate-600">
                        {question.points || 10} points
                    </span>
                </div>
            )}

            {/* Question Text */}
            <h3 className="text-xl font-bold text-slate-900 leading-relaxed">
                {question.question}
            </h3>

            {/* True/False Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={() => !showFeedback && onAnswer(0)}
                    disabled={showFeedback}
                    className={getButtonClasses(0)}
                    aria-label="True"
                >
                    <div className="flex flex-col items-center gap-2">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>TRUE</span>
                    </div>
                </button>

                <button
                    onClick={() => !showFeedback && onAnswer(1)}
                    disabled={showFeedback}
                    className={getButtonClasses(1)}
                    aria-label="False"
                >
                    <div className="flex flex-col items-center gap-2">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>FALSE</span>
                    </div>
                </button>
            </div>

            {/* Submit Button */}
            {!showFeedback && (
                <button
                    onClick={onSubmit}
                    disabled={selectedAnswer === null}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                >
                    {selectedAnswer === null ? 'Select True or False' : 'Check Answer'}
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

TrueFalseQuestion.propTypes = {
    question: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        correctAnswer: PropTypes.oneOf([0, 1]).isRequired, // 0 = True, 1 = False
        explanation: PropTypes.string.isRequired,
        difficulty: PropTypes.oneOf(['easy', 'medium', 'hard']),
        points: PropTypes.number
    }).isRequired,
    selectedAnswer: PropTypes.oneOf([0, 1, null]),
    onAnswer: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    showFeedback: PropTypes.bool.isRequired
};
