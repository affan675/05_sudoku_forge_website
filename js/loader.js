const tipsMap = {
    'index.html': [
        '🧩 Welcome to SudokuForge — sharpen your mind! ✨',
        '🔥 Forge your logic: try a daily puzzle to level up! 🧠'
    ],
    'creator.html': [
        '🎨 Create puzzles with custom difficulty and themes ✏️',
        '✅ Tip: Validate puzzles have a single solution before sharing 🛠️'
    ],
    'learn.html': [
        '📚 Learn basics: rows, columns, and 3x3 box rules 🔎',
        '🧠 Practice techniques: naked singles, hidden pairs, and more ✨'
    ],
    'settings.html': [
        '⚙️ Customize your experience: themes & preferences 🎛️',
        '💡 Tip: Toggle hints to challenge yourself gradually 🔁'
    ],
    'solve.html': [
        '🔧 Play interactive puzzles with multiple difficulty levels 🎯',
        '🔢 Start by scanning rows/columns for single candidates first ✅'
    ],
    'solver.html': [
        '🤖 Paste a puzzle and let the AI solver find the solution 🚀',
        '📋 Tip: Use CSV or spaced digits for fastest input and parsing ✂️'
    ]
};

function getCurrentPageName() {
    try {
        let p = window.location.pathname || '';
        p = p.substring(p.lastIndexOf('/') + 1);
        if (!p) p = 'index.html';
        p = p.split('?')[0].split('#')[0];
        return p.toLowerCase();
    } catch (e) {
        return 'index.html';
    }
}

function startLoader() {
    const overlay = document.getElementById('loader-overlay');
    const tipElement = document.getElementById('tip-text');
    if (!overlay || !tipElement) return;

    // Inject site title & tagline into the loader (non-destructive)
    if (!overlay.querySelector('.loader-site')) {
        const siteWrap = document.createElement('div');
        siteWrap.className = 'loader-site';
        siteWrap.style.marginBottom = '10px';
        siteWrap.style.textAlign = 'center';
        siteWrap.innerHTML = `
            <div style="font-size:20px;font-weight:600;">🧩 SudokuForge</div>
            <div style="font-size:12px;opacity:0.9;">Forge your logic — Solve the grid 🔥</div>
        `;
        overlay.insertBefore(siteWrap, overlay.firstChild);
    }

    const page = getCurrentPageName();
    const pageTips = tipsMap[page] || Object.values(tipsMap).flat();

    let tipIndex = 0;
    tipElement.textContent = pageTips[0] || '';

    const tipInterval = setInterval(() => {
        tipIndex = (tipIndex + 1) % pageTips.length;
        tipElement.textContent = pageTips[tipIndex];
    }, 750);

    // Keep the loader duration the same as before (3s), overlay will fade-out
    setTimeout(() => {
        clearInterval(tipInterval);
        overlay.classList.add('fade-out');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', startLoader);