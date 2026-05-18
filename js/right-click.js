/**
 * Custom Right-Click Context Menu for Sudoku Grid
 * Provides a custom context menu with Sudoku-specific options
 */

const RightClickMenu = (() => {
    let menu = null;
    let targetCell = null;
    const GRID_SELECTOR = '#sudoku-grid, #solver-grid';

    // Menu options with descriptions
    const menuOptions = [
        { id: 'set-1', label: '1', action: 'setNumber', value: 1 },
        { id: 'set-2', label: '2', action: 'setNumber', value: 2 },
        { id: 'set-3', label: '3', action: 'setNumber', value: 3 },
        { id: 'set-4', label: '4', action: 'setNumber', value: 4 },
        { id: 'set-5', label: '5', action: 'setNumber', value: 5 },
        { id: 'set-6', label: '6', action: 'setNumber', value: 6 },
        { id: 'set-7', label: '7', action: 'setNumber', value: 7 },
        { id: 'set-8', label: '8', action: 'setNumber', value: 8 },
        { id: 'set-9', label: '9', action: 'setNumber', value: 9 },
        { id: 'clear', label: 'Clear cell', action: 'clearCell' },
        { id: 'hint', label: 'Show hint', action: 'hint' },
        { id: 'notes', label: 'Toggle pencil marks', action: 'toggleNotes' },
    ];

    // Initialize context menu
    const init = () => {
        // Create menu container
        menu = createMenuElement();
        document.body.appendChild(menu);

        // Attach event listeners to grid cells
        attachGridListeners();
        console.log('🖱️ Custom right-click context menu initialized');
    };

    // Create the context menu HTML element
    const createMenuElement = () => {
        const menuDiv = document.createElement('div');
        menuDiv.id = 'sudoku-context-menu';
        menuDiv.className = 'context-menu';
        menuDiv.style.cssText = `
            position: fixed;
            display: none;
            background: var(--bg-card);
            border: 2px solid var(--primary);
            border-radius: 8px;
            box-shadow: var(--shadow-md);
            z-index: 10000;
            min-width: 200px;
            overflow: hidden;
        `;

        // Add menu items
        const menuContainer = document.createElement('div');
        menuContainer.style.cssText = 'display: flex; flex-wrap: wrap; padding: 8px;';

        // Number buttons
        for (let i = 1; i <= 9; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.style.cssText = `
                flex: 0 0 calc(33.333% - 6px);
                padding: 8px;
                margin: 3px;
                background: var(--primary);
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.2s ease;
            `;
            btn.addEventListener('mouseenter', () => {
                btn.style.background = '#1e4e6e';
                btn.style.transform = 'scale(1.05)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'var(--primary)';
                btn.style.transform = 'scale(1)';
            });
            btn.addEventListener('click', () => {
                triggerCustomEvent('sudoku:set-number', { number: i, cell: targetCell });
                hideMenu();
            });
            menuContainer.appendChild(btn);
        }

        // Divider
        const divider = document.createElement('div');
        divider.style.cssText = 'width: 100%; height: 1px; background: var(--grid-lines); margin: 6px 0;';
        menuContainer.appendChild(divider);

        // Action buttons
        const actions = [
            { label: 'Clear', action: 'clear', color: '#E74C3C' },
            { label: 'Hint', action: 'hint', color: 'var(--secondary)' },
            { label: 'Notes', action: 'notes', color: 'var(--primary)' },
        ];

        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.textContent = action.label;
            btn.style.cssText = `
                flex: 0 0 calc(50% - 6px);
                padding: 10px;
                margin: 3px;
                background: ${action.color};
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.2s ease;
                font-size: 0.9rem;
            `;
            btn.addEventListener('mouseenter', () => {
                btn.style.opacity = '0.8';
                btn.style.transform = 'translateY(-2px)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            });
            btn.addEventListener('click', () => {
                triggerCustomEvent(`sudoku:${action.action}`, { cell: targetCell });
                hideMenu();
            });
            menuContainer.appendChild(btn);
        });

        menuDiv.appendChild(menuContainer);
        return menuDiv;
    };

    // Attach context menu listeners to grid
    const attachGridListeners = () => {
        document.addEventListener('contextmenu', (e) => {
            const grid = e.target.closest('table[id*="grid"]');
            if (grid) {
                const cell = e.target.closest('td');
                if (cell) {
                    e.preventDefault();
                    targetCell = cell;
                    showMenu(e.pageX, e.pageY);
                }
            }
        });
    };

    // Show context menu at coordinates
    const showMenu = (x, y) => {
        if (!menu) return;

        menu.style.display = 'block';
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';

        // Adjust position if menu goes off-screen
        setTimeout(() => {
            const rect = menu.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                menu.style.left = (window.innerWidth - rect.width - 10) + 'px';
            }
            if (rect.bottom > window.innerHeight) {
                menu.style.top = (window.innerHeight - rect.height - 10) + 'px';
            }
        }, 0);
    };

    // Hide context menu
    const hideMenu = () => {
        if (menu) {
            menu.style.display = 'none';
        }
    };

    // Close menu when clicking elsewhere
    const attachGlobalListeners = () => {
        document.addEventListener('click', hideMenu);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') hideMenu();
        });
    };

    // Trigger custom DOM events
    const triggerCustomEvent = (eventName, detail = {}) => {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    };

    // Public method to get right-click menu details
    const getRightClickDetails = () => {
        return {
            title: 'Custom Right-Click Menu',
            description: 'Right-click on any Sudoku cell to access quick options.',
            options: [
                '💯 Set number 1-9: Quickly fill in a number',
                '🗑️ Clear cell: Remove the current value',
                '💡 Show hint: Get assistance on the current cell',
                '📝 Toggle pencil marks: Add/remove notes in a cell',
            ],
        };
    };

    // Initialize
    const start = () => {
        init();
        attachGlobalListeners();
    };

    return {
        init: start,
        getRightClickDetails,
        hideMenu,
        showMenu,
    };
})();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', RightClickMenu.init);
} else {
    RightClickMenu.init();
}
