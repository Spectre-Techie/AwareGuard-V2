import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Info } from 'lucide-react';
import FeedbackPanel from './FeedbackPanel';
import ConfettiEffect from './ConfettiEffect';

/**
 * FillBlankQuestion - Fill in the Blank Question Component
 * 
 * Displays a question with a text input field for user answers.
 * Supports case-insensitive matching and multiple accepted answers.
 * 
 * @component
 */
export default function FillBlankQuestion({
    question,
    userAnswer,
    onAnswer,
    onSubmit,
    showFeedback
}) {
    const [showConfetti, setShowConfetti] = useState(false);
    const [shake, setShake] = useState(false);
    const inputRef = useRef(null);

    // Auto-focus input on mount
    useEffect(() => {
        if (inputRef.current && !showFeedback) {
            inputRef.current.focus();
        }
    }, [showFeedback]);

    // Check if answer is correct
    const isCorrect = () => {
        if (!userAnswer || !showFeedback) return false;

        const userText = userAnswer.trim().toLowerCase();
        const correctText = question.correctAnswer.trim().toLowerCase();

        // Check main correct answer
        if (userText === correctText) return true;

        // Check accepted answers if available
        if (Array.isArray(question.acceptedAnswers)) {
            return question.acceptedAnswers.some(
                accepted => accepted.trim().toLowerCase() === userText
            );
        }

        return false;
    };

    // Trigger confetti for correct answers
    useEffect(() => {
        if (showFeedback && isCorrect()) {
            setShowConfetti(true);
        }
    }, [showFeedback]);

    // Trigger shake for incorrect answers
    useEffect(() => {
        if (showFeedback && !isCorrect()) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    }, [showFeedback]);

    /**
     * Handle Enter key press
     */
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && userAnswer && userAnswer.trim()) {
            onSubmit();
        }
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
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        {question.points || 10} points
                    </span>
                </div>
            )}

            {/* Question Text with Blank */}
            <div className="text-xl text-slate-900 dark:text-white leading-relaxed">
                {question.question.split('___').map((part, index) => (
                    <span key={index}>
                        <span className="font-bold">{part}</span>
                        {index < question.question.split('___').length - 1 && (
                            <span className="inline-block mx-2 relative">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={userAnswer || ''}
                                    onChange={(e) => onAnswer(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    disabled={showFeedback}
                                    placeholder="Type your answer"
                                    className={`px-4 py-2 border-b-2 focus:outline-none min-w-[200px] text-center font-semibold ${showFeedback
                                            ? isCorrect()
                                                ? 'border-green-500 bg-green-50 text-green-900'
                                                : `border-red-500 bg-red-50 text-red-900 ${shake ? 'animate-shake' : ''}`
                                            : 'border-blue-500 focus:border-blue-600'
                                        }`}
                                    aria-label="Fill in the blank"
                                />
                                {showFeedback && (
                                    <span className="absolute -right-8 top-1/2 -translate-y-1/2">
                                        {isCorrect() ? (
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        )}
                                    </span>
                                )}
                            </span>
                        )}
                    </span>
                ))}
            </div>

            {/* Hint */}
            {!showFeedback && (
                <div className="bg-blue-50 dark:bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded">
                    <p className="text-sm text-blue-900 dark:text-blue-300">
                        <span className="font-semibold"><Info className="w-4 h-4 inline-block mr-1 -mt-0.5" />Hint:</span> Type your answer in the blank space. Press Enter or click Check Answer when ready.
                    </p>
                </div>
            )}

            {/* Submit Button */}
            {!showFeedback && (
                <button
                    onClick={onSubmit}
                    disabled={!userAnswer || !userAnswer.trim()}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                >
                    {!userAnswer || !userAnswer.trim() ? 'Type your answer' : 'Check Answer'}
                </button>
            )}

            {/* Feedback Panel */}
            {showFeedback && (
                <FeedbackPanel
                    isCorrect={isCorrect()}
                    explanation={question.explanation}
                    correctAnswer={!isCorrect() ? question.correctAnswer : null}
                />
            )}
        </div>
    );
}

FillBlankQuestion.propTypes = {
    question: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired, // Use ___ for blank
        correctAnswer: PropTypes.string.isRequired,
        acceptedAnswers: PropTypes.arrayOf(PropTypes.string), // Optional alternative answers
        explanation: PropTypes.string.isRequired,
        difficulty: PropTypes.oneOf(['easy', 'medium', 'hard']),
        points: PropTypes.number
    }).isRequired,
    userAnswer: PropTypes.string,
    onAnswer: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    showFeedback: PropTypes.bool.isRequired
};
