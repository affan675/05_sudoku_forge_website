// Home page photo carousel: cycles 8 placeholder images every 3 seconds
(function(){
    const images = [
        'assets/sudoku/1.JPG','assets/sudoku/2.JPG','assets/sudoku/3.JPG','assets/sudoku/4.JPG',
        'assets/sudoku/5.JPG','assets/sudoku/6.JPG','assets/sudoku/7.JPG','assets/sudoku/8.JPG'
    ];
    const INTERVAL = 3000;
    const imgEl = document.getElementById('carousel-img');
    if (!imgEl) return;

    // Preload images
    images.forEach(src=>{const i=new Image();i.src=src});

    let idx = 0;
    setInterval(()=>{
        if (!imgEl) return;
        // fade out
        imgEl.classList.remove('visible');
        imgEl.classList.add('hidden');
        // after fade, swap src then fade in
        setTimeout(()=>{
            idx = (idx + 1) % images.length;
            imgEl.src = images[idx];
            imgEl.classList.remove('hidden');
            imgEl.classList.add('visible');
        }, 420);
    }, INTERVAL);
})();
