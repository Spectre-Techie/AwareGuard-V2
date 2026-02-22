import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { prepareQuiz, generateQuizInstanceId, calculateQuizScore } from '../../../utils/quizUtils';
import MCQQuestion from './MCQQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
import FillBlankQuestion from './FillBlankQuestion';
import QuizProgress from './QuizProgress';
import QuizResults from './QuizResults';

/**
 * QuizEngine - Main quiz orchestrator component
 * 
 * Manages quiz state, question progression, answer validation, and scoring.
 * Shuffles questions and options on mount for unique user experience.
 * 
 * @component
 * @param {Object} props
 * @param {Object} props.quiz - Quiz object with questions and configuration
 * @param {Function} props.onComplete - Callback when quiz is passed
 * @param {Function} props.onRetry - Callback when user retries quiz
 * @param {string} props.moduleId - Module identifier for progress tracking
 */
export default function QuizEngine({ quiz, onComplete, onRetry, moduleId, onCompleteModule, onNextModule, isModuleCompleted, nextModule }) {
    // Quiz instance state
    const [quizInstance, setQuizInstance] = useState(null);
    const [instanceId] = useState(generateQuizInstanceId());

    // Question navigation state
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    // Feedback state
    const [showFeedback, setShowFeedback] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState(null);

    // Quiz completion state
    const [quizComplete, setQuizComplete] = useState(false);
    const [quizResults, setQuizResults] = useState(null);

    // Timing
    const [startTime] = useState(Date.now());

    /**
     * Prepare quiz with shuffling on mount
     */
    useEffect(() => {
        if (!quiz) return;

        const prepared = prepareQuiz(quiz, {
            shuffleQuestions: true,
            shuffleOptions: true,
            questionLimit: null // Use all questions
        });

        setQuizInstance(prepared);

        // Initialize answers array
        setUserAnswers(new Array(prepared.questions.length).fill(null));
    }, [quiz]);

    /**
     * Handle answer selection
     */
    const handleAnswer = (answer) => {
        if (showFeedback) return; // Prevent changing answer after submission
        setCurrentAnswer(answer);
    };

    /**
     * Handle answer submission
     */
    const handleSubmit = () => {
        if (currentAnswer === null) return;

        // Store answer
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = currentAnswer;
        setUserAnswers(newAnswers);

        // Show feedback
        setShowFeedback(true);
    };

    /**
     * Handle next question navigation
     */
    const handleNext = () => {
        if (currentQuestionIndex < quizInstance.questions.length - 1) {
            // Move to next question
            setCurrentQuestionIndex(prev => prev + 1);
            setCurrentAnswer(null);
            setShowFeedback(false);
            // Scroll to top for next question
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Quiz complete
            handleFinishQuiz();
        }
    };

    /**
     * Handle quiz completion
     */
    const handleFinishQuiz = () => {
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        const results = calculateQuizScore(quizInstance.questions, userAnswers);

        setQuizResults({
            ...results,
            timeTaken,
            instanceId,
            moduleId,
            quizId: quiz.id,
            passingScore: quiz.passingScore || 70
        });

        setQuizComplete(true);

        // Call onComplete if passed
        if (results.passed) {
            onComplete?.({
                ...results,
                quizId: quiz.id,
                moduleId,
                xpEarned: calculateXP(results)
            });
        }
    };

    /**
     * Handle quiz retry
     */
    const handleRetry = () => {
        // Reset all state
        setCurrentQuestionIndex(0);
        setUserAnswers(new Array(quizInstance.questions.length).fill(null));
        setCurrentAnswer(null);
        setShowFeedback(false);
        setQuizComplete(false);
        setQuizResults(null);

        // Re-shuffle quiz
        const prepared = prepareQuiz(quiz, {
            shuffleQuestions: true,
            shuffleOptions: true,
            questionLimit: null
        });
        setQuizInstance(prepared);

        // Call onRetry callback
        onRetry?.();
    };

    /**
     * Calculate XP earned based on performance
     */
    const calculateXP = (results) => {
        const baseXP = 50;
        const bonusPerCorrect = 10;
        const perfectBonus = 50;

        let xp = baseXP + (results.correctCount * bonusPerCorrect);

        // Perfect score bonus
        if (results.percentage === 100) {
            xp += perfectBonus;
        }

        return xp;
    };

    // Loading state
    if (!quizInstance) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">Preparing your quiz...</p>
                </div>
            </div>
        );
    }

    const currentQuestion = quizInstance.questions[currentQuestionIndex];

    // Show results screen if quiz is complete
    if (quizComplete && quizResults) {
        return (
            <QuizResults
                results={quizResults}
                questions={quizInstance.questions}
                userAnswers={userAnswers}
                onRetry={handleRetry}
                onContinue={onComplete}
                onCompleteModule={onCompleteModule}
                onNextModule={onNextModule}
                isModuleCompleted={isModuleCompleted}
                nextModule={nextModule}
            />
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Quiz Progress Header */}
            <QuizProgress
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={quizInstance.questions.length}
                score={userAnswers.filter((ans, idx) => {
                    if (ans === null || idx >= currentQuestionIndex) return false;
                    const q = quizInstance.questions[idx];
                    return ans === q.correctAnswer;
                }).length}
            />

            {/* Question Display */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 mt-6">
                {/* Question Type Router */}
                {currentQuestion.type === 'mcq' && (
                    <MCQQuestion
                        question={currentQuestion}
                        selectedAnswer={currentAnswer}
                        onAnswer={handleAnswer}
                        onSubmit={handleSubmit}
                        showFeedback={showFeedback}
                    />
                )}

                {currentQuestion.type === 'true-false' && (
                    <TrueFalseQuestion
                        question={currentQuestion}
                        selectedAnswer={currentAnswer}
                        onAnswer={handleAnswer}
                        onSubmit={handleSubmit}
                        showFeedback={showFeedback}
                    />
                )}

                {currentQuestion.type === 'fill-blank' && (
                    <FillBlankQuestion
                        question={currentQuestion}
                        userAnswer={currentAnswer}
                        onAnswer={handleAnswer}
                        onSubmit={handleSubmit}
                        showFeedback={showFeedback}
                    />
                )}

                {/* Navigation Buttons */}
                {showFeedback && (
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleNext}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            {currentQuestionIndex < quizInstance.questions.length - 1 ? (
                                <>
                                    Next Question
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </>
                            ) : (
                                <>
                                    Finish Quiz
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Quiz Info Footer */}
            <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                <p>Passing Score: {quiz.passingScore || 70}%</p>
            </div>
        </div>
    );
}

QuizEngine.propTypes = {
    quiz: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        passingScore: PropTypes.number,
        questions: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['mcq', 'true-false', 'fill-blank', 'drag-drop']).isRequired,
            question: PropTypes.string.isRequired,
            difficulty: PropTypes.oneOf(['easy', 'medium', 'hard']),
            points: PropTypes.number
        })).isRequired,
        shuffleConfig: PropTypes.shape({
            questions: PropTypes.bool,
            options: PropTypes.bool,
            limit: PropTypes.number
        })
    }).isRequired,
    onComplete: PropTypes.func.isRequired,
    onRetry: PropTypes.func,
    moduleId: PropTypes.string.isRequired
};
