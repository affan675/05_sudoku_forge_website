document.addEventListener('DOMContentLoaded', function () {
    // Load sidebar immediately
    const sidebarContainer = document.getElementById('sidebar-container');
    
    fetch('components/sidebar.html')
        .then(res => {
            if (!res.ok) throw new Error('Sidebar not found');
            return res.text();
        })
        .then(html => {
            sidebarContainer.innerHTML = html;
            
            // Initialize sidebar active state
            if (typeof initSidebar === 'function') {
                initSidebar();
            }
            
            // Initialize tab switching
            if (typeof initTabSwitch === 'function') {
                initTabSwitch();
            }
        })
        .catch(err => {
            console.error('Sidebar load failed:', err);
            // Fallback sidebar
            sidebarContainer.innerHTML = `
                <nav class="sidebar-nav">
                    <ul>
                        <li><a href="index.html"><span class="nav-emoji">🏠</span><span class="nav-label">Home</span></a></li>
                        <li><a href="solve.html"><span class="nav-emoji">🔧</span><span class="nav-label">Solve</span></a></li>
                        <li><a href="solver.html"><span class="nav-emoji">🤖</span><span class="nav-label">Solver</span></a></li>
                        <li><a href="learn.html"><span class="nav-emoji">📚</span><span class="nav-label">Learn</span></a></li>
                        <li><a href="settings.html"><span class="nav-emoji">⚙️</span><span class="nav-label">Settings</span></a></li>
                        <li><a href="creator.html"><span class="nav-emoji">✨</span><span class="nav-label">Creator</span></a></li>
                    </ul>
                </nav>
            `;
            if (typeof initSidebar === 'function') initSidebar();
            if (typeof initTabSwitch === 'function') initTabSwitch();
        });

    // Custom cursor - only on desktop
    if (!window.matchMedia('(hover: none)').matches && !window.matchMedia('(pointer: coarse)').matches) {
        const dot = document.getElementById('cursor-dot');
        const trail = document.getElementById('cursor-trail');
        
        if (dot && trail) {
            let mouseX = -100, mouseY = -100;
            let trailX = -100, trailY = -100;

            document.addEventListener('mousemove', function (e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
                dot.style.left = mouseX + 'px';
                dot.style.top = mouseY + 'px';
            });

            function updateTrail() {
                const dx = mouseX - trailX;
                const dy = mouseY - trailY;
                trailX += dx * 0.2;
                trailY += dy * 0.2;
                trail.style.left = trailX + 'px';
                trail.style.top = trailY + 'px';
                requestAnimationFrame(updateTrail);
            }
            updateTrail();

            document.addEventListener('mouseleave', () => {
                dot.style.opacity = '0';
                trail.style.opacity = '0';
            });
            document.addEventListener('mouseenter', () => {
                dot.style.opacity = '1';
                trail.style.opacity = '0.5';
            });

            // Enlarge cursor on clickable items
            const clickables = document.querySelectorAll('a, button, input, .feature-card, .diff-btn');
            clickables.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    dot.style.width = '20px';
                    dot.style.height = '20px';
                    trail.style.width = '36px';
                    trail.style.height = '36px';
                });
                el.addEventListener('mouseleave', () => {
                    dot.style.width = '12px';
                    dot.style.height = '12px';
                    trail.style.width = '28px';
                    trail.style.height = '28px';
                });
            });
        }
    }

    // Page entry animation
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }
});