/**
 * SudokuForge – Hint Engine
 * Finds a single empty cell that can be deduced with a "naked single" strategy,
 * assuming all currently filled numbers are correct.
 */

function isValidPlacement(grid, row, col, num) {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }
  // Check column
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false;
  }
  // Check 3x3 box
  const startRow = row - row % 3;
  const startCol = col - col % 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
}

/**
 * @param {number[][]} userGrid – current state (0 = empty)
 * @param {number[][]} solution – the complete solution
 * @returns {{row, col, value}|{error: true, message: string}}
 */
function findHintCell(userGrid, solution) {
  // First, ensure no incorrect entries exist
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = userGrid[r][c];
      if (val !== 0 && val !== solution[r][c]) {
        return {
          error: true,
          message: '⚠️ Some numbers are incorrect. Fix them before asking for a hint.',
        };
      }
    }
  }

  // Look for a cell with exactly one possible candidate (naked single)
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (userGrid[r][c] === 0) {
        let candidates = [];
        for (let num = 1; num <= 9; num++) {
          if (isValidPlacement(userGrid, r, c, num)) {
            candidates.push(num);
          }
        }
        if (candidates.length === 1) {
          return { row: r, col: c, value: candidates[0] };
        }
      }
    }
  }

  return {
    error: true,
    message: '🧠 No obvious hint available. Try looking for hidden pairs or other techniques!',
  };
}