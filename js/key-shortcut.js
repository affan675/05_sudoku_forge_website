/**
 * Keyboard Shortcut System for Sudoku Forge
 * Manages global keyboard events and shortcuts for the entire Sudoku website
 */

const KeyboardShortcuts = (() => {
    // Shortcut definitions with descriptions
    const shortcuts = [
        { key: '1-9', description: 'Enter number in selected cell', handler: null },
        { key: 'Delete or 0', description: 'Clear selected cell', handler: null },
        { key: 'N', description: 'New game / new puzzle', handler: null },
        { key: 'S', description: 'Solve current puzzle (AI solver)', handler: null },
        { key: 'H', description: 'Give a hint', handler: null },
        { key: 'U', description: 'Undo last move', handler: null },
        { key: 'R', description: 'Redo', handler: null },
        { key: '← → ↑ ↓', description: 'Navigate between cells', handler: null },
    ];

    // Initialize event listeners
    const init = () => {
        document.addEventListener('keydown', handleKeyPress);
        console.log('🎮 Keyboard shortcuts initialized');
    };

    // Handle keyboard press events
    const handleKeyPress = (event) => {
        // Don't trigger shortcuts in input fields or text areas
        if (event.target.matches('input, textarea, [contenteditable]')) {
            return;
        }

        const key = event.key.toLowerCase();
        const keyCode = event.keyCode;

        // 1-9: Enter number in selected cell
        if (key >= '1' && key <= '9') {
            event.preventDefault();
            triggerCustomEvent('sudoku:enter-number', { number: parseInt(key) });
        }

        // Delete or 0: Clear selected cell
        if (key === 'Delete' || key === '0') {
            event.preventDefault();
            triggerCustomEvent('sudoku:clear-cell');
        }

        // N: New game
        if (key === 'n') {
            event.preventDefault();
            triggerCustomEvent('sudoku:new-game');
        }

        // S: Solve puzzle
        if (key === 's') {
            event.preventDefault();
            triggerCustomEvent('sudoku:solve');
        }

        // H: Hint
        if (key === 'h') {
            event.preventDefault();
            triggerCustomEvent('sudoku:hint');
        }

        // U: Undo
        if (key === 'u') {
            event.preventDefault();
            triggerCustomEvent('sudoku:undo');
        }

        // R: Redo
        if (key === 'r') {
            event.preventDefault();
            triggerCustomEvent('sudoku:redo');
        }

        // Arrow keys: Navigate
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault();
            triggerCustomEvent('sudoku:navigate', { direction: event.key });
        }
    };

    // Trigger custom DOM events for other scripts to listen to
    const triggerCustomEvent = (eventName, detail = {}) => {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    };

    // Public method to get shortcuts list
    const getShortcutsList = () => {
        return shortcuts.map(s => ({
            key: s.key,
            description: s.description,
        }));
    };

    // Cleanup
    const destroy = () => {
        document.removeEventListener('keydown', handleKeyPress);
    };

    return {
        init,
        getShortcutsList,
        destroy,
    };
})();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', KeyboardShortcuts.init);
} else {
    KeyboardShortcuts.init();
}
