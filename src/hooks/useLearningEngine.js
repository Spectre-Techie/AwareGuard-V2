// src/hooks/useLearningEngine.js
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * SINGLE SOURCE OF TRUTH FOR LEARNING LOGIC - BACKEND VERSION
 *
 * This hook:
 * - Loads progress from backend (source of truth)
 * - Falls back to localStorage for guests only
 * - Trusts backend for XP, level, and progress calculations
 * - Provides clean helpers to the UI
 * 
 * IMPORTANT: All XP calculations, duplicate prevention, and premium validation
 * now happen on the backend. Frontend is display-only.
 */

const API_BASE = "https://awareguard-backend.onrender.com";
const LOCAL_KEY = "awareguard_learning_progress";

/**
 * Calculate level from XP (client-side for guests only)
 * Backend is source of truth for authenticated users
 * 
 * BALANCED PROGRESSION:
 * Level 1: 0-50 XP | Level 2: 50-100 XP | Level 3: 100-200 XP
 * Level 4: 200-350 XP | Level 5: 350-550 XP | Level 6+: +250 XP each
 */
const calculateLevel = (xp) => {
  const thresholds = [0, 50, 100, 200, 350, 550, 800, 1100, 1450, 1850];

  let level = 1;
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i]) {
      level = i + 1;
      break;
    }
  }

  // Beyond level 10: +500 XP per level
  if (xp >= 1850) {
    const extraXP = xp - 1850;
    const extraLevels = Math.floor(extraXP / 500);
    level = 10 + extraLevels;
  }

  return level;
};

export default function useLearningEngine(modules = []) {
  const { user, token } = useAuth();

  const [progress, setProgress] = useState({
    completedModules: [],
    totalXP: 0,
    level: 1,
    streak: 0,
    lastActivity: null,
  });

  const [loading, setLoading] = useState(true);

  /* ------------------------------
   * LOAD PROGRESS (Backend is Source of Truth)
   * ------------------------------ */
  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true);

      // 1. AUTHENTICATED → BACKEND IS SOURCE OF TRUTH
      if (token) {
        console.log('[useLearningEngine] Loading progress for authenticated user...');
        console.log('Token:', token ? 'Present' : 'Missing');

        try {
          const res = await fetch(`${API_BASE}/api/learning/progress`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log('[useLearningEngine] Backend response status:', res.status);

          if (res.ok) {
            const data = await res.json();
            console.log('[useLearningEngine] Progress loaded:', data);

            setProgress({
              completedModules: data.completedModules || [],
              totalXP: data.totalXP || 0,
              level: data.level || 1, // BACKEND CALCULATED
              streak: data.streak || 0,
              lastActivity: data.lastActivity || null,
            });
            setLoading(false);
            return;
          } else {
            const errorData = await res.json();
            console.error('[useLearningEngine] Backend error:', errorData);
          }
        } catch (err) {
          console.error('[useLearningEngine] Backend unavailable:', err);
          console.warn("Backend unavailable, falling back to localStorage");
        }
      } else {
        console.log('[useLearningEngine] No token, loading as guest');
      }

      // 2. GUEST MODE FALLBACK → LOCAL STORAGE ONLY
      const local = JSON.parse(localStorage.getItem(LOCAL_KEY));
      if (local) {
        console.log('[useLearningEngine] Loading from localStorage:', local);
        setProgress({
          ...local,
          level: calculateLevel(local.totalXP || 0), // Guest mode only
        });
      }

      setLoading(false);
    };

    loadProgress();
  }, [token]);

  /* ------------------------------
   * PERSIST LOCAL FALLBACK (GUESTS ONLY)
   * ------------------------------ */
  useEffect(() => {
    // Only save to localStorage for guests
    if (!token) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(progress));
    }
  }, [progress, token]);

  /* ------------------------------
   * CORE ACTION: COMPLETE MODULE (Backend Handles All Logic)
   * ------------------------------ */
  const completeModule = async (module) => {
    console.log('[completeModule] Starting completion for:', module.id);
    console.log('User:', user);
    console.log('Token:', token ? 'Present' : 'Missing');

    // 1. AUTHENTICATED → BACKEND VALIDATES AND AWARDS XP
    if (token) {
      try {
        console.log('[completeModule] Calling backend...');

        const res = await fetch(`${API_BASE}/api/learning/complete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            moduleId: module.id,
          }),
        });

        console.log('[completeModule] Response status:', res.status);
        const data = await res.json();
        console.log('[completeModule] Response data:', data);

        if (!res.ok) {
          // Handle specific errors
          if (res.status === 403) {
            throw new Error("This is a premium module. Please upgrade to continue.");
          }
          if (res.status === 400 && data.error && data.error.includes("already completed")) {
            throw new Error("You've already completed this module!");
          }
          throw new Error(data.error || "Failed to complete module");
        }

        // SUCCESS: Update local state with backend response
        console.log('[completeModule] Success! Updating progress...');
        console.log('User data from response:', data.user);

        setProgress({
          completedModules: data.user.completedModules,
          totalXP: data.user.totalXP,
          level: data.user.level, // Backend calculated
          streak: data.user.streak,
          lastActivity: data.user.lastActivity,
        });

        console.log('[completeModule] Progress updated!');
        return data; // Return success message with XP gained
      } catch (error) {
        console.error("[completeModule] Failed:", error);
        throw error; // Re-throw for UI to handle
      }
    }

    // 2. GUEST MODE → LOCAL ONLY (No XP validation, just tracking)
    console.log('[completeModule] Guest mode - saving to localStorage');

    if (progress.completedModules.includes(module.id)) {
      throw new Error("You've already completed this module! Sign in to track progress.");
    }

    // Simple guest mode tracking (no premium check)
    const newXP = progress.totalXP + module.xp;
    const updatedProgress = {
      ...progress,
      completedModules: [...progress.completedModules, module.id],
      totalXP: newXP,
      level: calculateLevel(newXP),
      lastActivity: new Date().toISOString(),
    };

    setProgress(updatedProgress);
    return { xpGained: module.xp, user: updatedProgress };
  };

  /* ------------------------------
   * QUIZ SUBMISSION (Backend Tracked)
   * ------------------------------ */
  const submitQuiz = async (quizId, score, totalQuestions) => {
    if (!token) {
      // Guests can take quizzes but can't track them
      return {
        success: true,
        quiz: {
          quizId,
          score,
          totalQuestions,
          percentage: Math.round((score / totalQuestions) * 100),
          passed: (score / totalQuestions) >= 0.7,
        },
        message: "Sign in to save your quiz results!",
      };
    }

    try {
      const res = await fetch(`${API_BASE}/api/learning/quiz-submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quizId,
          score,
          totalQuestions,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit quiz");
      }

      return data;
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      throw error;
    }
  };

  /* ------------------------------
   * HELPERS (USED BY UI)
   * ------------------------------ */
  const isCompleted = (moduleId) =>
    progress.completedModules.includes(moduleId);

  const isLocked = (module) =>
    module.premium && !user?.isPremium;

  /**
   * Simple recommendation logic:
   * Same level → not completed → highest XP first
   */
  const recommendedModules = useMemo(() => {
    return modules
      .filter(
        (m) =>
          !progress.completedModules.includes(m.id) &&
          !isLocked(m)
      )
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 3);
  }, [modules, progress.completedModules, user?.isPremium]);

  return {
    loading,
    progress,
    completeModule,
    submitQuiz,
    isCompleted,
    isLocked,
    recommendedModules,
  };
}
