/* script.js
   - popuplates moving background text strips
   - opens gift, reveals card, shows confetti
   - expects: background.png and boquete.png in same folder
*/

// Elements
const FLOAT = document.getElementById('floatingText');
const GIFT = document.getElementById('giftBtn');
const CARD = document.getElementById('card');
const WRAPPER = document.getElementById('cardWrapper');
const CANVAS = document.getElementById('confettiCanvas');
const ctx = CANVAS.getContext && CANVAS.getContext('2d');

// ----- 1) Create repeating moving rows to fill bg -----
// number of horizontal rows to cover background visually
const ROWS = 6;
const PHRASE = "Happy Teacher's Day haha cute • ";

function createRows(){
  // clear if exist
  FLOAT.innerHTML = "";
  for(let r=0;r<ROWS;r++){
    const row = document.createElement('div');
    row.className = 'f-strip';
    // set vertical placement and font-size variety
    row.style.top = `${(r/ROWS)*100}%`;
    row.style.height = `${100/ROWS}%`;
    // alternate direction and speed
    const speed = 18 + (r % 3) * 6 + Math.random()*6; // seconds
    row.style.animation = `${r % 2 === 0 ? 'slideLeft' : 'slideRight'} ${speed}s linear infinite`;
    row.style.animationDelay = `${-Math.random()*speed}s`;
    // build long content (enough repeats to fill 200% width)
    const repeats = 40;
    for(let i=0;i<repeats;i++){
      const span = document.createElement('span');
      span.textContent = PHRASE;
      // slight random font size per row for texture
      span.style.fontSize = `${14 + Math.round(Math.random()*20)}px`;
      row.appendChild(span);
    }
    FLOAT.appendChild(row);
  }
}

// define keyframes via injected style so slideLeft/Right exist
(function injectKeyframes(){
  const s = document.createElement('style');
  s.innerHTML = `
    @keyframes slideLeft { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes slideRight{ from{transform:translateX(-50%)} to{transform:translateX(0)} }
  `;
  document.head.appendChild(s);
})();

createRows();

// ----- 2) Resize handling for confetti canvas -----
function resizeCanvas(){
  if (!CANVAS) return;
  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ----- 3) Gift open: animate and reveal card -----
// gift button visual: add .open class to animate lid (css uses .gift.open)
GIFT.addEventListener('click', () => {
  GIFT.classList.add('open');
  // show card (ensure card exists)
  setTimeout(()=> {
    if (CARD) {
      CARD.classList.add('visible');
      WRAPPER.setAttribute('aria-hidden','false');
    }
    // start confetti burst
    startConfettiBurst();
  }, 520);
});

// ----- 4) Lightweight confetti particle system -----
let particles = [];
function random(min,max){ return Math.random()*(max-min)+min; }

function spawnConfetti(amount=220){
  particles = [];
  for(let i=0;i<amount;i++){
    particles.push({
      x: random(0, CANVAS.width),
      y: random(-CANVAS.height, 0),
      vx: random(-2.5, 2.5),
      vy: random(2, 6),
      size: random(6, 14),
      rot: random(0, Math.PI*2),
      color: `hsl(${Math.floor(random(0,360))},70%,55%)`,
      life: Math.floor(random(80, 240))
    });
  }
}

function drawConfetti(){
  if (!ctx) return;
  ctx.clearRect(0,0,CANVAS.width,CANVAS.height);
  particles.forEach((p, idx) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
    ctx.restore();

    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.03; // gravity
    p.rot += 0.07;
    p.life--;
    if (p.life <= 0 || p.y > CANVAS.height + 50) {
      // recycle
      p.x = random(0, CANVAS.width);
      p.y = -10;
      p.life = Math.floor(random(80,240));
      p.vx = random(-2.5,2.5);
      p.vy = random(2,6);
    }
  });
  if (particles.length) requestAnimationFrame(drawConfetti);
}

let confettiTimeout = null;
function startConfettiBurst(){
  spawnConfetti(240);
  drawConfetti();
  // stop after ~3.5s by clearing particles
  clearTimeout(confettiTimeout);
  confettiTimeout = setTimeout(()=> { particles = []; if (ctx) ctx.clearRect(0,0,CANVAS.width,CANVAS.height); }, 3500);
}
