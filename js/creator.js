function startTypingEffect(elementId, fullText, speed) {
  const el = document.getElementById(elementId);
  if (!el) return;
  let i = 0;
  el.textContent = '';
  function type() {
    if (i < fullText.length) {
      el.textContent += fullText.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Automatically start the typing effect on the creator page
(function () {
  if (document.getElementById('vision-text')) {
    // Wait until the page is fully ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        startTypingEffect('vision-text', 'Polymath in training. Building tech & business empire.', 50);
      });
    } else {
      startTypingEffect('vision-text', 'Polymath in training. Building tech & business empire.', 50);
    }
  }
})();