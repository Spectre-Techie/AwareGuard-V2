import PropTypes from 'prop-types';
import { formatTime, checkAnswer } from '../../../utils/quizUtils';

/**
 * QuizResults - Comprehensive quiz results screen
 * 
 * Displays score, pass/fail status, performance metrics, and question review.
 * Provides retry and continue actions.
 * 
 * @component
 */
export default function QuizResults({
    results,
    questions,
    userAnswers,
    onRetry,
    onContinue,
    onCompleteModule = null,
    onNextModule = null,
    isModuleCompleted = false,
    nextModule = null
}) {
    const {
        percentage,
        correctCount,
        total,
        passed,
        timeTaken,
        earnedPoints,
        totalPoints,
        passingScore
    } = results;

    /**
     * Calculate XP earned
     */
    const xpEarned = () => {
        const baseXP = 50;
        const bonusPerCorrect = 10;
        const perfectBonus = 50;

        let xp = baseXP + (correctCount * bonusPerCorrect);

        if (percentage === 100) {
            xp += perfectBonus;
        }

        return xp;
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 border border-slate-200 dark:border-slate-800">
                {/* Header with Pass/Fail */}
                <div className="text-center mb-8">
                    {passed ? (
                        <>
                            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-green-900 dark:text-green-300 mb-2">
                                Quiz Passed!
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">Great job! You've mastered this topic.</p>
                        </>
                    ) : (
                        <>
                            <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-orange-900 dark:text-orange-300 mb-2">
                                Keep Learning!
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">Review the material and try again.</p>
                        </>
                    )}
                </div>

                {/* Score Circle */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-48 h-48">
                        {/* Background Circle */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="#e5e7eb"
                                strokeWidth="12"
                                fill="none"
                            />
                            {/* Progress Circle */}
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke={passed ? '#10b981' : '#f59e0b'}
                                strokeWidth="12"
                                fill="none"
                                strokeDasharray={`${(percentage / 100) * 553} 553`}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        {/* Percentage Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-4xl font-bold ${passed ? 'text-green-600' : 'text-orange-600'}`}>
                                {percentage}%
                            </span>
                            <span className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                {correctCount}/{total} correct
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {/* Correct Answers */}
                    <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-lg p-4 text-center">
                        <svg className="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-2xl font-bold text-green-900 dark:text-green-300">{correctCount}</div>
                        <div className="text-xs text-green-700 dark:text-green-400">Correct</div>
                    </div>

                    {/* Time Taken */}
                    <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg p-4 text-center">
                        <svg className="w-8 h-8 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">{formatTime(timeTaken)}</div>
                        <div className="text-xs text-blue-700 dark:text-blue-400">Time</div>
                    </div>

                    {/* XP Earned */}
                    <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-lg p-4 text-center">
                        <svg className="w-8 h-8 text-yellow-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-300">+{xpEarned()}</div>
                        <div className="text-xs text-yellow-700 dark:text-yellow-400">XP</div>
                    </div>
                </div>

                {/* Question Review */}
                <div className="mb-8">
                    <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Question Review</h3>
                    <div className="space-y-3">
                        {questions.map((question, index) => {
                            const userAnswer = userAnswers[index];
                            const isCorrect = checkAnswer(question, userAnswer);

                            return (
                                <div
                                    key={question.id}
                                    className={`p-4 rounded-lg border-2 ${isCorrect
                                        ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30'
                                        : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Icon */}
                                        <div className="flex-shrink-0 mt-1">
                                            {isCorrect ? (
                                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            )}
                                        </div>

                                        {/* Question Info */}
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                                                Q{index + 1}: {question.question}
                                            </p>
                                            {!isCorrect && question.type === 'mcq' && (
                                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                                    <span className="font-semibold">Correct answer:</span>{' '}
                                                    {question.options[question.correctAnswer]}
                                                </p>
                                            )}
                                        </div>

                                        {/* Points */}
                                        <div className="flex-shrink-0">
                                            <span className={`text-xs font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'
                                                }`}>
                                                {isCorrect ? `+${question.points || 10}` : '0'} pts
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    {/* Retake Quiz Button */}
                    <button
                        onClick={onRetry}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Retake Quiz
                    </button>

                    {/* Complete Module Button (only if passed and not completed) */}
                    {passed && !isModuleCompleted && (
                        <button
                            onClick={onCompleteModule}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Complete Module
                        </button>
                    )}

                    {/* Next Module Button (only if passed and next module exists) */}
                    {passed && nextModule && onNextModule && (
                        <button
                            onClick={() => onNextModule(nextModule)}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            Next Module: {nextModule.title}
                        </button>
                    )}
                </div>

                {/* Passing Score Info */}
                <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                    <p>Passing score: {passingScore}% • You scored: {percentage}%</p>
                </div>
            </div>
        </div>
    );
}

QuizResults.propTypes = {
    results: PropTypes.shape({
        percentage: PropTypes.number.isRequired,
        correctCount: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        passed: PropTypes.bool.isRequired,
        timeTaken: PropTypes.number.isRequired,
        earnedPoints: PropTypes.number.isRequired,
        totalPoints: PropTypes.number.isRequired,
        passingScore: PropTypes.number.isRequired
    }).isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    userAnswers: PropTypes.arrayOf(PropTypes.any).isRequired,
    onRetry: PropTypes.func.isRequired,
    onContinue: PropTypes.func.isRequired,
    onCompleteModule: PropTypes.func,
    onNextModule: PropTypes.func,
    isModuleCompleted: PropTypes.bool,
    nextModule: PropTypes.object
};
