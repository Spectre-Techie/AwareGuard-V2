/**
 * @file learningApi.js
 * @description Backend integration layer for learning system
 * Handles: progress fetching, module completion, XP tracking
 * Supports: graceful fallback to localStorage when backend unavailable
 * Full-stack ready with deterministic, explainable values
 * @version 1.0
 * @since 2025-12-23
 */

import api from "./api";

/**
 * BACKEND ENDPOINTS (Backend must implement these)
 * 
 * POST /api/learning/progress
 * - Returns: { level, totalXP, completedModules, streak, achievements }
 * 
 * POST /api/learning/complete
 * - Body: { moduleId, xpEarned, quizScore }
 * - Returns: { success, newXP, newLevel, xpToNextLevel }
 * 
 * GET /api/learning/modules
 * - Returns: All modules with metadata
 * 
 * GET /api/learning/achievements
 * - Returns: All achievements and user progress
 */

const LEARNING_LOCAL_STORAGE_KEY = "awareguard_learning_progress";
const BACKEND_TIMEOUT = 5000; // 5 seconds

/**
 * Fetch user learning progress from backend or localStorage
 * Graceful fallback: if backend fails, use localStorage
 * 
 * @param {string} userId - User ID from auth
 * @returns {Promise<Object>} Progress object with level, XP, streak, etc.
 * 
 * @example
 * const progress = await fetchLearningProgress(user.id);
 * // Returns: { level: 3, totalXP: 1250, completedModules: 5, streak: 7 }
 */
export const fetchLearningProgress = async (userId) => {
  try {
    // Try backend first (with timeout)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), BACKEND_TIMEOUT);

    const response = await api.post("/api/learning/progress", { userId }, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      // Cache to localStorage as backup
      localStorage.setItem(LEARNING_LOCAL_STORAGE_KEY, JSON.stringify(data));
      return data;
    }

    throw new Error("Backend unavailable");
  } catch (err) {
    console.warn("Backend learning progress fetch failed, using local cache:", err);
    // Fallback to localStorage
    return getLocalProgress();
  }
};

/**
 * Save module completion to backend
 * Optimistic update: update local first, sync with backend
 * 
 * @param {string} userId - User ID from auth
 * @param {string} moduleId - Module ID being completed
 * @param {number} xpEarned - XP for this module
 * @param {number} quizScore - Quiz score (0-100), undefined if no quiz
 * @returns {Promise<Object>} Updated progress after completion
 * 
 * @example
 * const result = await completeModule(user.id, "phishing-101", 10, 85);
 * // Returns: { success: true, newXP: 250, newLevel: 1, xpToNextLevel: 250 }
 */
export const completeModule = async (userId, moduleId, xpEarned, quizScore) => {
  try {
    // Optimistic update: update local first
    const currentProgress = getLocalProgress();
    const newProgress = {
      ...currentProgress,
      totalXP: (currentProgress.totalXP || 0) + xpEarned,
      completedModules: [...(currentProgress.completedModules || []), moduleId],
    };

    // Save optimistically
    localStorage.setItem(LEARNING_LOCAL_STORAGE_KEY, JSON.stringify(newProgress));

    // Sync with backend (non-blocking, use try/catch)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), BACKEND_TIMEOUT);

      const response = await api.post(
        "/api/learning/complete",
        {
          userId,
          moduleId,
          xpEarned,
          quizScore,
        },
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        // Update local with backend response (source of truth)
        localStorage.setItem(LEARNING_LOCAL_STORAGE_KEY, JSON.stringify(data));
        return data;
      }

      console.warn("Backend completion sync failed, local cache updated");
      return newProgress;
    } catch (backendErr) {
      console.warn("Backend sync error, but local progress saved:", backendErr);
      return newProgress;
    }
  } catch (err) {
    console.error("Module completion failed:", err);
    throw err;
  }
};

/**
 * Get all learning modules from backend
 * Used to populate module grids and learning paths
 * 
 * @returns {Promise<Array>} Array of all module objects with metadata
 */
export const fetchModules = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), BACKEND_TIMEOUT);

    const response = await api.get("/api/learning/modules", {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      return await response.json();
    }

    throw new Error("Failed to fetch modules");
  } catch (err) {
    console.error("Fetch modules failed:", err);
    // Return empty array - UI should handle gracefully
    return [];
  }
};

/**
 * Get user achievements and badges
 * Used in progress dashboard and achievement display
 * 
 * @param {string} userId - User ID from auth
 * @returns {Promise<Object>} User achievements with unlock status
 */
export const fetchAchievements = async (userId) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), BACKEND_TIMEOUT);

    const response = await api.get(`/api/learning/achievements/${userId}`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      return await response.json();
    }

    throw new Error("Failed to fetch achievements");
  } catch (err) {
    console.warn("Fetch achievements failed:", err);
    // Return empty achievements - UI should handle gracefully
    return { achievements: [], unlockedCount: 0 };
  }
};

/**
 * Get local progress from localStorage
 * Fallback when backend is unavailable
 * 
 * @returns {Object} Last known progress or default empty progress
 */
export const getLocalProgress = () => {
  try {
    const stored = localStorage.getItem(LEARNING_LOCAL_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.error("Failed to parse local progress:", err);
  }

  // Return default progress structure
  return {
    totalXP: 0,
    level: 1,
    completedModules: [],
    streak: 0,
    achievements: [],
  };
};

/**
 * Clear all local learning progress
 * Used for account reset or logout
 */
export const clearLocalProgress = () => {
  try {
    localStorage.removeItem(LEARNING_LOCAL_STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear local progress:", err);
  }
};

/**
 * Sync all local changes with backend
 * Called on app startup or after reconnection
 * 
 * @param {string} userId - User ID from auth
 * @returns {Promise<Object>} Server response with latest progress
 */
export const syncProgress = async (userId) => {
  try {
    console.log("Syncing progress with backend...");

    const localProgress = getLocalProgress();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), BACKEND_TIMEOUT);

    const response = await api.post(
      "/api/learning/sync",
      {
        userId,
        localProgress,
      },
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

    if (response.ok) {
      const serverProgress = await response.json();
      // Backend is source of truth - update local with server data
      localStorage.setItem(LEARNING_LOCAL_STORAGE_KEY, JSON.stringify(serverProgress));
      return serverProgress;
    }

    throw new Error("Sync failed");
  } catch (err) {
    console.warn("Progress sync failed, using local cache:", err);
    // Return local progress as fallback
    return getLocalProgress();
  }
};

/**
 * BACKEND IMPLEMENTATION EXAMPLE
 * 
 * // POST /api/learning/progress
 * app.post("/api/learning/progress", authenticate, async (req, res) => {
 *   try {
 *     const { userId } = req.body;
 *     const user = await User.findById(userId);
 *     
 *     const level = Math.floor(user.totalXP / 500) + 1; // Deterministic
 *     
 *     res.json({
 *       totalXP: user.totalXP,
 *       level,
 *       completedModules: user.completedModules,
 *       streak: calculateStreak(user),
 *       achievements: user.achievements,
 *     });
 *   } catch (err) {
 *     res.status(500).json({ error: err.message });
 *   }
 * });
 * 
 * // POST /api/learning/complete
 * app.post("/api/learning/complete", authenticate, async (req, res) => {
 *   try {
 *     const { userId, moduleId, xpEarned, quizScore } = req.body;
 *     const user = await User.findById(userId);
 *     
 *     if (user.completedModules.includes(moduleId)) {
 *       return res.json({ error: "Already completed" });
 *     }
 *     
 *     // Add XP and mark module complete
 *     user.totalXP += xpEarned;
 *     if (quizScore >= 70) user.totalXP += Math.floor(xpEarned * 0.3); // Quiz bonus
 *     user.completedModules.push(moduleId);
 *     await user.save();
 *     
 *     const newLevel = Math.floor(user.totalXP / 500) + 1;
 *     const xpToNextLevel = (newLevel * 500) - user.totalXP;
 *     
 *     res.json({
 *       success: true,
 *       newXP: user.totalXP,
 *       newLevel,
 *       xpToNextLevel,
 *     });
 *   } catch (err) {
 *     res.status(500).json({ error: err.message });
 *   }
 * });
 */

export default {
  fetchLearningProgress,
  completeModule,
  fetchModules,
  fetchAchievements,
  getLocalProgress,
  clearLocalProgress,
  syncProgress,
};
