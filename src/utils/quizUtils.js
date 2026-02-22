/**
 * Quiz Utilities
 * 
 * Provides shuffle algorithms and quiz preparation functions for the interactive quiz system.
 * Uses Fisher-Yates algorithm for unbiased randomization.
 * 
 * @module quizUtils
 * @author AwareGuard Team
 */

/**
 * Fisher-Yates shuffle algorithm for unbiased randomization
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n) - creates a copy to avoid mutation
 * 
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled copy of the original array
 * 
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const shuffled = shuffleArray(numbers);
 * // shuffled might be [3, 1, 5, 2, 4]
 * // numbers remains [1, 2, 3, 4, 5]
 */
export function shuffleArray(array) {
    if (!Array.isArray(array)) {
        console.error('shuffleArray: Expected array, received:', typeof array);
        return array;
    }

    const shuffled = [...array]; // Create copy to avoid mutation

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

/**
 * Shuffle quiz questions while preserving metadata
 * 
 * Adds a displayOrder field to track the randomized position for analytics.
 * 
 * @param {Array<Object>} questions - Original questions array
 * @returns {Array<Object>} - Shuffled questions with displayOrder metadata
 * 
 * @example
 * const questions = [
 *   { id: 'q1', question: 'What is phishing?' },
 *   { id: 'q2', question: 'What is 2FA?' }
 * ];
 * const shuffled = shuffleQuestions(questions);
 * // Each question now has displayOrder: 1, 2, etc.
 */
export function shuffleQuestions(questions) {
    if (!Array.isArray(questions) || questions.length === 0) {
        console.warn('shuffleQuestions: Empty or invalid questions array');
        return questions;
    }

    return shuffleArray(questions).map((q, index) => ({
        ...q,
        displayOrder: index + 1, // Track display order for analytics
        originalOrder: questions.findIndex(orig => orig.id === q.id) + 1
    }));
}

/**
 * Shuffle answer options while tracking the correct answer position
 * 
 * Only shuffles MCQ and True/False questions. Other question types are returned unchanged.
 * Updates the correctAnswer index to match the new shuffled position.
 * 
 * @param {Object} question - Question object with options and correctAnswer
 * @param {string} question.type - Question type (mcq, true-false, fill-blank, etc.)
 * @param {Array<string>} question.options - Array of answer options
 * @param {number} question.correctAnswer - Index of correct answer in original order
 * @returns {Object} - Question with shuffled options and updated correctAnswer index
 * 
 * @example
 * const question = {
 *   type: 'mcq',
 *   question: 'What is 2+2?',
 *   options: ['3', '4', '5', '6'],
 *   correctAnswer: 1
 * };
 * const shuffled = shuffleOptions(question);
 * // Options are shuffled, correctAnswer index updated to new position of '4'
 */
export function shuffleOptions(question) {
    // Only shuffle MCQ and True/False questions
    if (!question || (question.type !== 'mcq' && question.type !== 'true-false')) {
        return question;
    }

    const { options, correctAnswer } = question;

    if (!Array.isArray(options) || options.length === 0) {
        console.warn('shuffleOptions: Invalid options array for question:', question.id);
        return question;
    }

    if (typeof correctAnswer !== 'number' || correctAnswer < 0 || correctAnswer >= options.length) {
        console.error('shuffleOptions: Invalid correctAnswer index:', correctAnswer);
        return question;
    }

    // Create array of option objects with original indices
    const optionsWithIndices = options.map((option, index) => ({
        text: option,
        originalIndex: index,
        isCorrect: index === correctAnswer
    }));

    // Shuffle the options
    const shuffledOptions = shuffleArray(optionsWithIndices);

    // Find new index of correct answer
    const newCorrectAnswer = shuffledOptions.findIndex(opt => opt.isCorrect);

    return {
        ...question,
        options: shuffledOptions.map(opt => opt.text),
        correctAnswer: newCorrectAnswer,
        originalCorrectAnswer: correctAnswer, // Store for analytics
        optionsShuffled: true
    };
}

/**
 * Prepare quiz for user - shuffle both questions and options
 * 
 * Main entry point for quiz preparation. Handles question shuffling,
 * option shuffling, and question limiting based on configuration.
 * 
 * @param {Object} quiz - Original quiz object
 * @param {string} quiz.id - Quiz identifier
 * @param {Array<Object>} quiz.questions - Array of question objects
 * @param {Object} quiz.shuffleConfig - Shuffle configuration (optional)
 * @param {Object} options - Runtime configuration options
 * @param {boolean} [options.shuffleQuestions=true] - Whether to shuffle question order
 * @param {boolean} [options.shuffleOptions=true] - Whether to shuffle answer options
 * @param {number|null} [options.questionLimit=null] - Limit number of questions (null = all)
 * @returns {Object} - Prepared quiz ready for display
 * 
 * @example
 * const quiz = {
 *   id: 'phishing-quiz',
 *   questions: [...],
 *   shuffleConfig: { questions: true, options: true }
 * };
 * const prepared = prepareQuiz(quiz);
 * // Returns quiz with shuffled questions and options
 */
export function prepareQuiz(quiz, options = {}) {
    if (!quiz || !quiz.questions) {
        console.error('prepareQuiz: Invalid quiz object');
        return quiz;
    }

    // Merge quiz-level config with runtime options
    const quizConfig = quiz.shuffleConfig || {};
    const {
        shuffleQuestions: shouldShuffleQuestions = quizConfig.questions ?? true,
        shuffleOptions: shouldShuffleOptions = quizConfig.options ?? true,
        questionLimit = quizConfig.limit ?? null
    } = options;

    let questions = [...quiz.questions];

    // Shuffle questions if enabled
    if (shouldShuffleQuestions) {
        questions = shuffleQuestions(questions);
    }

    // Shuffle options for each question if enabled
    if (shouldShuffleOptions) {
        questions = questions.map(q => shuffleOptions(q));
    }

    // Limit questions if specified
    if (questionLimit && questionLimit > 0 && questionLimit < questions.length) {
        questions = questions.slice(0, questionLimit);
    }

    return {
        ...quiz,
        questions,
        shuffled: shouldShuffleQuestions || shouldShuffleOptions,
        shuffleTimestamp: Date.now(),
        totalQuestions: questions.length,
        config: {
            questionsShuffled: shouldShuffleQuestions,
            optionsShuffled: shouldShuffleOptions,
            questionLimit: questionLimit
        }
    };
}

/**
 * Generate unique quiz instance ID for tracking
 * 
 * Creates a unique identifier for each quiz attempt, useful for analytics
 * and preventing duplicate submissions.
 * 
 * @returns {string} - Unique quiz instance ID
 * 
 * @example
 * const instanceId = generateQuizInstanceId();
 * // Returns: "quiz_1707598234567_a3b4c5d6e"
 */
export function generateQuizInstanceId() {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substr(2, 9);
    return `quiz_${timestamp}_${randomStr}`;
}

/**
 * Calculate quiz score and performance metrics
 * 
 * @param {Array<Object>} questions - Quiz questions
 * @param {Array<number|string>} userAnswers - User's answers (indices or text)
 * @returns {Object} - Score and performance data
 * 
 * @example
 * const result = calculateQuizScore(questions, userAnswers);
 * // Returns: { score: 8, total: 10, percentage: 80, passed: true, ... }
 */
export function calculateQuizScore(questions, userAnswers) {
    if (!Array.isArray(questions) || !Array.isArray(userAnswers)) {
        console.error('calculateQuizScore: Invalid input');
        return { score: 0, total: 0, percentage: 0, passed: false };
    }

    let correctCount = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    const results = questions.map((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = checkAnswer(question, userAnswer);
        const points = question.points || 10;

        totalPoints += points;
        if (isCorrect) {
            correctCount++;
            earnedPoints += points;
        }

        return {
            questionId: question.id,
            isCorrect,
            userAnswer,
            correctAnswer: question.correctAnswer,
            points,
            earned: isCorrect ? points : 0
        };
    });

    const percentage = questions.length > 0
        ? Math.round((correctCount / questions.length) * 100)
        : 0;

    return {
        score: correctCount,
        total: questions.length,
        percentage,
        correctCount,
        incorrectCount: questions.length - correctCount,
        totalPoints,
        earnedPoints,
        passed: percentage >= 70, // Default passing score
        results
    };
}

/**
 * Check if user's answer is correct
 * 
 * @param {Object} question - Question object
 * @param {number|string|boolean} userAnswer - User's answer
 * @returns {boolean} - Whether answer is correct
 */
export function checkAnswer(question, userAnswer) {
    if (userAnswer === null || userAnswer === undefined) {
        return false;
    }

    switch (question.type) {
        case 'mcq':
        case 'true-false':
            return userAnswer === question.correctAnswer;

        case 'fill-blank':
            // Case-insensitive comparison, trim whitespace
            const userText = String(userAnswer).trim().toLowerCase();
            const correctText = String(question.correctAnswer).trim().toLowerCase();

            // Check if matches any accepted answer
            if (Array.isArray(question.acceptedAnswers)) {
                return question.acceptedAnswers.some(
                    accepted => String(accepted).trim().toLowerCase() === userText
                );
            }

            return userText === correctText;

        default:
            return false;
    }
}

/**
 * Format time in seconds to human-readable string
 * 
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time string
 * 
 * @example
 * formatTime(125); // Returns "2m 5s"
 * formatTime(45);  // Returns "45s"
 */
export function formatTime(seconds) {
    if (typeof seconds !== 'number' || seconds < 0) {
        return '0s';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
        return `${minutes}m ${remainingSeconds}s`;
    }

    return `${remainingSeconds}s`;
}

/**
 * Get difficulty color for UI styling
 * 
 * @param {string} difficulty - Difficulty level (easy, medium, hard)
 * @returns {Object} - Tailwind color classes
 */
export function getDifficultyColor(difficulty) {
    const colors = {
        easy: {
            bg: 'bg-green-100',
            text: 'text-green-800',
            border: 'border-green-500'
        },
        medium: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800',
            border: 'border-yellow-500'
        },
        hard: {
            bg: 'bg-red-100',
            text: 'text-red-800',
            border: 'border-red-500'
        }
    };

    return colors[difficulty] || colors.medium;
}
