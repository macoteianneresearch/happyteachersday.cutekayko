/* script.js
   - populates many hollow background texts
   - handles gift open animation, reveal card, and confetti
   - expects: background.png and boquete.png in same folder
*/

const FLOAT_COUNT = 220;
const FLT = document.getElementById('floatingText');
const GIFT = document.getElementById('giftBtn');
const CARD = document.getElementById('card');
const WRAPPER = document.getElementById('cardWrapper');

// safety: if element missing, stop
if (!FLT || !GIFT || !CARD || !WRAPPER) {
  console.error("Missing DOM elements. Make sure HTML matches filenames/IDs.");
}

// 1) populate many spaced, hollow text spans to fill the background
(function populateFloating(){
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const text = "Happy Teacher's Day haha cute • ";
  for (let i=0;i<FLOAT_COUNT;i++){
    const s = document.createElement('span');
    s.textContent = text;
    // randomize size and position so the page is covered
    const size = 12 + Math.random() * 32; // px
    s.style.fontSize = `${size}px`;
    const left = Math.random() * (vw * 1.25) - (vw * 0.125);
    const top = Math.random() * (vh * 1.05) - (vh * 0.02);
    s.style.left = `${left}px`;
    s.style.top = `${top}px`;
    s.style.opacity = (0.22 + Math.random() * 0.4).toString();
    s.style.transform = `rotate(${(Math.random()-0.5)*20}deg) scale(${0.85 + Math.random()*0.7})`;
    // slight slow animation up/down
    s.style.transition = `transform ${30 + Math.random()*40}s linear`;
    FLT.appendChild(s);
  }
})();

// gentle continuous nudge for variety (keeps lightweight)
setInterval(()=> {
  const nodes = FLT.children;
  for (let i=0;i<nodes.length;i+=7) { // nudge every nth element so not too heavy
    const el = nodes[i];
    if (!el) continue;
    const dx = (Math.random()-0.5)*8;
    const dy = (Math.random()-0.5)*8;
    el.style.transform = el.style.transform + ` translate(${dx}px,${dy}px)`;
  }
}, 3800);

// 2) gift open: animate lid + reveal card + run confetti
GIFT.addEventListener('click', () => {
  GIFT.classList.add('open');
  // reveal card
  setTimeout(() => {
    CARD.classList.add('visible');
    WRAPPER.setAttribute('aria-hidden', 'false');
    // fire confetti bursts (uses canvas-confetti loaded by HTML)
    burstConfetti();
  }, 520);
});

// 3) confetti helper (multiple bursts)
function burstConfetti(){
  if (typeof confetti !== 'function') {
    console.warn("confetti library not found; confetti will not show. Confirm CDN loaded.");
    return;
  }
  const duration = 1500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 10,
      startVelocity: 30,
      spread: 160,
      ticks: 50,
      origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() * 0.2 + 0.2}
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

/* 4) make sure wrapper/card exist; if not, create fallback (defensive) */
if (!WRAPPER) {
  // nothing else to do
  console.warn("Card wrapper missing from DOM.");
}
