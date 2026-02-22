import PropTypes from 'prop-types';

/**
 * QuizProgress - Progress indicator for quiz
 * 
 * Shows current question number, total questions, and current score.
 * Sticky header that stays visible while scrolling.
 * 
 * @component
 */
export default function QuizProgress({ currentQuestion, totalQuestions, score }) {
    const progress = (currentQuestion / totalQuestions) * 100;

    return (
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 shadow-sm">
            <div className="max-w-3xl mx-auto p-4">
                {/* Question Counter and Score */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Question {currentQuestion} of {totalQuestions}
                    </span>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        Score: {score}/{currentQuestion - 1 > 0 ? currentQuestion - 1 : 0}
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label={`Quiz progress: ${Math.round(progress)}%`}
                    />
                </div>

                {/* Progress Percentage */}
                <div className="mt-2 text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        {Math.round(progress)}% Complete
                    </span>
                </div>
            </div>
        </div>
    );
}

QuizProgress.propTypes = {
    currentQuestion: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired
};
