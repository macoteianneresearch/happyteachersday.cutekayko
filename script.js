const giftBox = document.querySelector('.gift-box');
const noteContainer = document.querySelector('.note-container');
const backgroundText = document.querySelector('.background-text');

// Fill background with repeated text
let text = "Happy Teacher's Day haha cute • ";
backgroundText.textContent = text.repeat(300);

giftBox.addEventListener('click', () => {
  noteContainer.classList.add('show');
  launchConfetti();
});

// Confetti effect
function launchConfetti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Load confetti library
const script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js";
document.head.appendChild(script);
