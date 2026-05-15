function initTabSwitch() {
    const sidebar = document.getElementById('sidebar-container');
    if (!sidebar) return;

    const links = sidebar.querySelectorAll('a');
    const pageMap = {
        'index': 'Home',
        'solve': 'Solve',
        'solver': 'Solver',
        'learn': 'Learn',
        'settings': 'Settings',
        'creator': 'Creator'
    };

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href) {
                const pageName = href.replace('.html', '');
                document.title = `SudokuForge – ${pageMap[pageName] || 'Page'}`;
            }
        });
    });

    // Set initial title
    const path = window.location.pathname.split('/').pop().replace('.html', '');
    if (pageMap[path]) {
        document.title = `SudokuForge – ${pageMap[path]}`;
    }
}