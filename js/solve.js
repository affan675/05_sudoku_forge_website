/* =============================================
   SudokuForge – solve.js (with AI-solve cross-link)
   ============================================= */

// ---------- Utility helpers ----------
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function isValid(grid, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num || grid[x][col] === num) return false;
    }
    const sr = row - row % 3, sc = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[sr + i][sc + j] === num) return false;
        }
    }
    return true;
}

// ---------- Solution counter (used during generation) ----------
function countSolutions(grid, limit = 2) {
    const board = grid.map(r => [...r]);
    let count = 0;
    function solve() {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, r, c, num)) {
                            board[r][c] = num;
                            solve();
                            board[r][c] = 0;
                            if (count >= limit) return;
                        }
                    }
                    return;
                }
            }
        }
        count++;
    }
    solve();
    return count;
}

// ---------- Generator ----------
function fillBox(grid, rowStart, colStart) {
    const nums = [1,2,3,4,5,6,7,8,9];
    shuffleArray(nums);
    let idx = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            grid[rowStart + i][colStart + j] = nums[idx++];
        }
    }
}

function solveSudokuDirect(board) {
    // Simple backtracking that modifies board in place, returns true
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudokuDirect(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function generateCompleteSolution() {
    const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    for (let box = 0; box < 9; box += 3) fillBox(grid, box, box);
    solveSudokuDirect(grid);
    return grid;
}

const DIFFICULTY = {
    easy: 38,
    moderate: 32,
    hard: 26,
    gentle: 42,
    diabolical: 22
};

function generatePuzzle(difficulty) {
    const clues = DIFFICULTY[difficulty] || 30;
    const solution = generateCompleteSolution();
    const puzzle = solution.map(row => [...row]);
    const indexes = Array.from({ length: 81 }, (_, i) => i);
    shuffleArray(indexes);
    let removed = 0;
    for (const idx of indexes) {
        if (81 - removed <= clues) break;
        const row = Math.floor(idx / 9);
        const col = idx % 9;
        const backup = puzzle[row][col];
        puzzle[row][col] = 0;
        if (countSolutions(puzzle.map(r => [...r]), 2) !== 1) {
            puzzle[row][col] = backup;
        } else {
            removed++;
        }
    }
    return { puzzle, solution };
}

// ---------- Rendering ----------
function renderPuzzleGrid(table, grid, editable = true) {
    table.innerHTML = '';
    for (let r = 0; r < 9; r++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < 9; c++) {
            const td = document.createElement('td');
            const val = grid[r][c];
            if (editable) {
                if (val !== 0) {
                    td.textContent = val;
                    td.classList.add('given');
                } else {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.maxLength = 1;
                    input.inputMode = 'numeric';
                    input.addEventListener('input', () => {
                        input.value = input.value.replace(/[^1-9]/g, '');
                    });
                    td.appendChild(input);
                }
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.inputMode = 'numeric';
                if (val !== 0) input.value = val;
                td.appendChild(input);
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function readUserGrid(table) {
    const grid = [];
    const rows = table.querySelectorAll('tr');
    for (let r = 0; r < 9; r++) {
        const row = [];
        const cells = rows[r].querySelectorAll('td');
        for (let c = 0; c < 9; c++) {
            const input = cells[c].querySelector('input');
            if (input) {
                row.push(parseInt(input.value) || 0);
            } else {
                row.push(parseInt(cells[c].textContent) || 0);
            }
        }
        grid.push(row);
    }
    return grid;
}

function validateGrid(userGrid, solution) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (userGrid[r][c] !== solution[r][c]) return false;
        }
    }
    return true;
}

// ---------- Page initialisation ----------
function initSolvePage() {
    const gridTable = document.getElementById('sudoku-grid');
    if (!gridTable) return;

    const diffButtons = document.querySelectorAll('.diff-btn');
    const newGameBtn = document.getElementById('new-game-btn');
    const checkBtn = document.getElementById('check-solution-btn');
    const aiSolveBtn = document.getElementById('ai-solve-btn');   // NEW
    const messageDiv = document.getElementById('solve-message');

    let currentDifficulty = 'easy';
    let currentPuzzle = null;          // store the puzzle grid itself
    let puzzleSolution = null;

    function setActive(btn) {
        diffButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDifficulty = btn.dataset.diff;
    }

    function displayPuzzle() {
        try {
            const result = generatePuzzle(currentDifficulty);
            if (!result || !result.puzzle) throw new Error('Empty puzzle');
            currentPuzzle = result.puzzle;               // save for AI button
            puzzleSolution = result.solution;
            renderPuzzleGrid(gridTable, result.puzzle, true);
            messageDiv.textContent = '';

            // Store the puzzle in localStorage so solver can pick it up
            localStorage.setItem('sudokuForge_puzzle', JSON.stringify(result.puzzle));
        } catch (e) {
            console.error(e);
            messageDiv.textContent = '⚠️ Could not generate puzzle. Please try again.';
        }
    }

    diffButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setActive(btn);
            displayPuzzle();
        });
    });

    newGameBtn.addEventListener('click', displayPuzzle);

    checkBtn.addEventListener('click', () => {
        if (!puzzleSolution) {
            messageDiv.textContent = 'No puzzle generated. Click “New Game” first.';
            return;
        }
        const userGrid = readUserGrid(gridTable);
        const correct = validateGrid(userGrid, puzzleSolution);
        messageDiv.textContent = correct
            ? '🎉 Correct! You solved the puzzle.'
            : '❌ Incorrect. Keep trying.';
    });

    // ---------- AI SOLVE BUTTON ----------
    aiSolveBtn.addEventListener('click', () => {
        if (!currentPuzzle) {
            messageDiv.textContent = 'Generate a puzzle first.';
            return;
        }
        // Store puzzle and navigate to solver page
        localStorage.setItem('sudokuForge_puzzle', JSON.stringify(currentPuzzle));
        window.location.href = 'solver.html';
    });

    // Show first puzzle
    displayPuzzle();
}

// Auto‑start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSolvePage);
} else {
    initSolvePage();
}

// ---------- Page initialisation (with Hint button) ----------
function initSolvePage() {
    const gridTable = document.getElementById('sudoku-grid');
    if (!gridTable) return;

    const diffButtons = document.querySelectorAll('.diff-btn');
    const newGameBtn = document.getElementById('new-game-btn');
    const checkBtn = document.getElementById('check-solution-btn');
    const aiSolveBtn = document.getElementById('ai-solve-btn');
    const hintBtn = document.getElementById('hint-btn');             // NEW
    const messageDiv = document.getElementById('solve-message');

    let currentDifficulty = 'easy';
    let currentPuzzle = null;
    let puzzleSolution = null;

    function setActive(btn) {
        diffButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDifficulty = btn.dataset.diff;
    }

    function displayPuzzle() {
        try {
            const result = generatePuzzle(currentDifficulty);
            if (!result || !result.puzzle) throw new Error('Empty puzzle');
            currentPuzzle = result.puzzle;
            puzzleSolution = result.solution;
            renderPuzzleGrid(gridTable, result.puzzle, true);
            messageDiv.textContent = '';

            localStorage.setItem('sudokuForge_puzzle', JSON.stringify(result.puzzle));
        } catch (e) {
            console.error(e);
            messageDiv.textContent = '⚠️ Could not generate puzzle. Please try again.';
        }
    }

    // Difficulty buttons
    diffButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setActive(btn);
            displayPuzzle();
        });
    });

    // New Game
    newGameBtn.addEventListener('click', displayPuzzle);

    // Check Solution
    checkBtn.addEventListener('click', () => {
        if (!puzzleSolution) {
            messageDiv.textContent = 'No puzzle generated. Click “New Game” first.';
            return;
        }
        const userGrid = readUserGrid(gridTable);
        const correct = validateGrid(userGrid, puzzleSolution);
        messageDiv.textContent = correct
            ? '🎉 Correct! You solved the puzzle.'
            : '❌ Incorrect. Keep trying.';
    });

    // AI Solve (navigate to solver)
    aiSolveBtn.addEventListener('click', () => {
        if (!currentPuzzle) {
            messageDiv.textContent = 'Generate a puzzle first.';
            return;
        }
        localStorage.setItem('sudokuForge_puzzle', JSON.stringify(currentPuzzle));
        window.location.href = 'solver.html';
    });

    // 💡 HINT BUTTON
    hintBtn.addEventListener('click', () => {
        if (!puzzleSolution) {
            messageDiv.textContent = 'No puzzle to hint.';
            return;
        }
        const userGrid = readUserGrid(gridTable);
        const hint = findHintCell(userGrid, puzzleSolution);   // from hint.js

        if (hint.error) {
            messageDiv.textContent = hint.message;
            return;
        }

        // Fill the hinted cell
        const rows = gridTable.querySelectorAll('tr');
        const td = rows[hint.row].querySelectorAll('td')[hint.col];
        const input = td.querySelector('input');
        if (input) {
            input.value = hint.value;
            // Briefly highlight the cell
            td.classList.add('highlight-hint');
            setTimeout(() => td.classList.remove('highlight-hint'), 1500);
            messageDiv.textContent = `💡 Hint: filled cell (${hint.row+1},${hint.col+1}) with ${hint.value}.`;
        } else {
            // cell already filled (shouldn't happen)
            messageDiv.textContent = 'That cell is already filled.';
        }
    });

    // Show first puzzle
    displayPuzzle();
}