// Helper function to calculate XP progress within current level
export const getLevelProgress = (totalXP, currentLevel) => {
    const thresholds = [0, 50, 100, 200, 350, 550, 800, 1100, 1450, 1850];

    // Get XP range for current level
    const currentThreshold = thresholds[currentLevel - 1] || 0;
    const nextThreshold = currentLevel < 10
        ? thresholds[currentLevel]
        : currentThreshold + 500;

    const xpInLevel = totalXP - currentThreshold;
    const xpNeeded = nextThreshold - currentThreshold;
    const percentage = Math.min(100, (xpInLevel / xpNeeded) * 100);

    return {
        xpInLevel,
        xpNeeded,
        percentage,
        currentThreshold,
        nextThreshold
    };
};
