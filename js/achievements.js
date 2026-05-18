/**
 * Achievements System for Sudoku Forge
 * Manages 50 unique achievements with tracking and unlock conditions
 */

const AchievementsManager = (() => {
    // Initialize achievements data
    const achievements = [
        // Beginner achievements
        { id: 1, name: 'First Step', description: 'Solve your first Sudoku puzzle', unlocked: true, category: 'Progress' },
        { id: 2, name: 'Puzzle Master', description: 'Solve 5 puzzles', unlocked: false, category: 'Progress' },
        { id: 3, name: 'Dedication', description: 'Solve 10 puzzles', unlocked: false, category: 'Progress' },
        { id: 4, name: 'Obsessed', description: 'Solve 25 puzzles', unlocked: false, category: 'Progress' },
        { id: 5, name: 'Legendary', description: 'Solve 50 puzzles', unlocked: false, category: 'Progress' },
        
        // Difficulty achievements
        { id: 6, name: 'Easy Peasy', description: 'Solve an Easy puzzle', unlocked: true, category: 'Difficulty' },
        { id: 7, name: 'Moderate Mastery', description: 'Solve a Moderate puzzle', unlocked: false, category: 'Difficulty' },
        { id: 8, name: 'Hard as Nails', description: 'Solve a Hard puzzle', unlocked: false, category: 'Difficulty' },
        { id: 9, name: 'Gentle Touch', description: 'Solve a Gentle puzzle', unlocked: false, category: 'Difficulty' },
        { id: 10, name: 'Diabolical Genius', description: 'Solve a Diabolical puzzle', unlocked: false, category: 'Difficulty' },
        
        // Speed achievements
        { id: 11, name: 'Speed Demon', description: 'Solve a puzzle in under 60 seconds', unlocked: false, category: 'Speed' },
        { id: 12, name: 'Lightning Fast', description: 'Solve a puzzle in under 30 seconds', unlocked: false, category: 'Speed' },
        { id: 13, name: 'Flash Gordon', description: 'Solve a puzzle in under 10 seconds', unlocked: false, category: 'Speed' },
        
        // Skill-based achievements
        { id: 14, name: 'Self-Sufficient', description: 'Solve a puzzle without using hints', unlocked: false, category: 'Skill' },
        { id: 15, name: 'Perfect Score', description: 'Solve 5 puzzles without hints', unlocked: false, category: 'Skill' },
        { id: 16, name: 'Hint Addict', description: 'Use 20 hints in total', unlocked: false, category: 'Skill' },
        
        // AI Solver achievements
        { id: 17, name: 'AI Believer', description: 'Use the AI Solver once', unlocked: false, category: 'AI' },
        { id: 18, name: 'AI Enthusiast', description: 'Use the AI Solver 10 times', unlocked: false, category: 'AI' },
        { id: 19, name: 'AI Master', description: 'Use the AI Solver 50 times', unlocked: false, category: 'AI' },
        
        // Game Creation achievements
        { id: 20, name: 'Creator', description: 'Create your first puzzle', unlocked: false, category: 'Creation' },
        { id: 21, name: 'Prolific Creator', description: 'Create 5 puzzles', unlocked: false, category: 'Creation' },
        { id: 22, name: 'Puzzle Architect', description: 'Create 10 unique puzzles', unlocked: false, category: 'Creation' },
        
        // Learning achievements
        { id: 23, name: 'Student', description: 'Complete a learning section', unlocked: false, category: 'Learning' },
        { id: 24, name: 'Scholar', description: 'Learn all Sudoku strategies', unlocked: false, category: 'Learning' },
        { id: 25, name: 'Wise One', description: 'Review learning materials 5 times', unlocked: false, category: 'Learning' },
        
        // Consistency achievements
        { id: 26, name: 'Daily Player', description: 'Play for 7 consecutive days', unlocked: false, category: 'Consistency' },
        { id: 27, name: 'Weekly Warrior', description: 'Play for 30 days total', unlocked: false, category: 'Consistency' },
        { id: 28, name: 'Monthly Master', description: 'Play for 90 days total', unlocked: false, category: 'Consistency' },
        
        // Milestone achievements
        { id: 29, name: 'Milestone Hunter', description: 'Solve 100 puzzles', unlocked: false, category: 'Milestone' },
        { id: 30, name: 'Centennial', description: 'Reach 100 total hints used', unlocked: false, category: 'Milestone' },
        { id: 31, name: 'Five Hundred', description: 'Solve 500 puzzles', unlocked: false, category: 'Milestone' },
        
        // Challenge achievements
        { id: 32, name: 'Challenge Accepted', description: 'Complete 5 challenges', unlocked: false, category: 'Challenge' },
        { id: 33, name: 'Challenge Champion', description: 'Complete 20 challenges', unlocked: false, category: 'Challenge' },
        { id: 34, name: 'Undefeated', description: 'Win 10 consecutive puzzles', unlocked: false, category: 'Challenge' },
        
        // Variety achievements
        { id: 35, name: 'Diversity Master', description: 'Solve all 5 difficulty levels', unlocked: false, category: 'Variety' },
        { id: 36, name: 'Genre Expert', description: 'Try all game modes', unlocked: false, category: 'Variety' },
        
        // Social/Share achievements
        { id: 37, name: 'Sharer', description: 'Share a puzzle with others', unlocked: false, category: 'Social' },
        { id: 38, name: 'Community Star', description: 'Share 5 puzzles', unlocked: false, category: 'Social' },
        
        // Rare/Secret achievements
        { id: 39, name: 'Persistent', description: 'Never give up - complete a puzzle after 10 attempts', unlocked: false, category: 'Rare' },
        { id: 40, name: 'Mathematical Mind', description: 'Solve 3 Hard+ puzzles in a row', unlocked: false, category: 'Rare' },
        { id: 41, name: 'Perfect Game', description: 'Solve without errors and without hints', unlocked: false, category: 'Rare' },
        { id: 42, name: 'Speedrunner', description: 'Solve 5 puzzles in under 5 minutes total', unlocked: false, category: 'Rare' },
        { id: 43, name: 'Night Owl', description: 'Play between midnight and 6 AM', unlocked: false, category: 'Rare' },
        { id: 44, name: 'Early Bird', description: 'Play between 5 AM and 8 AM', unlocked: false, category: 'Rare' },
        
        // Feature discovery achievements
        { id: 45, name: 'Feature Explorer', description: 'Use keyboard shortcuts', unlocked: false, category: 'Feature' },
        { id: 46, name: 'Menu Master', description: 'Use custom right-click menu 10 times', unlocked: false, category: 'Feature' },
        { id: 47, name: 'Settings Savvy', description: 'Visit Settings page', unlocked: true, category: 'Feature' },
        
        // Completionist achievements
        { id: 48, name: 'Completionist', description: 'Unlock 30 achievements', unlocked: false, category: 'Completionist' },
        { id: 49, name: 'Collector', description: 'Unlock 40 achievements', unlocked: false, category: 'Completionist' },
        { id: 50, name: 'Legend', description: 'Unlock all achievements', unlocked: false, category: 'Completionist' },
    ];

    // Get all achievements
    const getAll = () => {
        return [...achievements];
    };

    // Get achievement by ID
    const getById = (id) => {
        return achievements.find(a => a.id === id);
    };

    // Check and unlock achievement
    const checkAndUnlock = (achievementId, context = {}) => {
        const achievement = getById(achievementId);
        if (achievement && !achievement.unlocked) {
            achievement.unlocked = true;
            triggerCustomEvent('achievement:unlocked', { achievement });
            console.log(`🏆 Achievement unlocked: ${achievement.name}`);
            return true;
        }
        return false;
    };

    // Unlock achievement by ID
    const unlock = (achievementId) => {
        return checkAndUnlock(achievementId);
    };

    // Get count of unlocked achievements
    const getUnlockedCount = () => {
        return achievements.filter(a => a.unlocked).length;
    };

    // Get achievement completion percentage
    const getCompletionPercentage = () => {
        const unlocked = getUnlockedCount();
        return Math.round((unlocked / achievements.length) * 100);
    };

    // Get achievements by category
    const getByCategory = (category) => {
        return achievements.filter(a => a.category === category);
    };

    // Get all categories
    const getCategories = () => {
        const categories = new Set(achievements.map(a => a.category));
        return Array.from(categories).sort();
    };

    // Reset all achievements (for testing)
    const reset = () => {
        achievements.forEach(a => a.unlocked = false);
        achievements[0].unlocked = true; // Keep first achievement unlocked
        console.log('🔄 Achievements reset');
    };

    // Trigger custom DOM events
    const triggerCustomEvent = (eventName, detail = {}) => {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    };

    return {
        getAll,
        getById,
        checkAndUnlock,
        unlock,
        getUnlockedCount,
        getCompletionPercentage,
        getByCategory,
        getCategories,
        reset,
    };
})();

// Log initialization
console.log('🏆 Achievements system loaded with 50 achievements');
