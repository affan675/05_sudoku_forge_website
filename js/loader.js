const tips = [
    "Sudoku grids have 9 rows, 9 columns, and 9 boxes.",
    "Each row must contain digits 1-9 without repeats.",
    "The same digit cannot appear twice in a column.",
    "A 3x3 box must also have all digits 1-9.",
    "Start by scanning rows and columns for single candidates.",
    "Advanced techniques like X-Wing can crack tough puzzles.",
    "Practice daily to improve your logical reasoning.",
    "There is only one valid solution to a well-formed Sudoku."
];

function startLoader() {
    const overlay = document.getElementById('loader-overlay');
    const tipElement = document.getElementById('tip-text');
    if (!overlay || !tipElement) return;

    let tipIndex = 0;
    tipElement.textContent = tips[0];
    const tipInterval = setInterval(() => {
        tipIndex = (tipIndex + 1) % tips.length;
        tipElement.textContent = tips[tipIndex];
    }, 750);

    setTimeout(() => {
        clearInterval(tipInterval);
        overlay.classList.add('fade-out');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', startLoader);