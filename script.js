function openLetter() {
  document.getElementById('letter').style.display = 'block';
  startConfetti();
}

// Confetti animation
const confetti = document.getElementById('confetti');
const ctx = confetti.getContext('2d');
confetti.width = window.innerWidth;
confetti.height = window.innerHeight;

let pieces = [];
for (let i = 0; i < 200; i++) {
  pieces.push({
    x: Math.random() * confetti.width,
    y: Math.random() * confetti.height - confetti.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 100 + 10,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    tilt: Math.random() * 10 - 10
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, confetti.width, confetti.height);
  for (let i = 0; i < pieces.length; i++) {
    let p = pieces[i];
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.r, p.r);
    ctx.fill();
  }
  update();
}

function update() {
  for (let i = 0; i < pieces.length; i++) {
    let p = pieces[i];
    p.y += Math.cos(p.d) + 1 + p.r / 2;
    p.x += Math.sin(p.d);
    if (p.y > confetti.height) {
      pieces[i] = {
        x: Math.random() * confetti.width,
        y: -10,
        r: p.r,
        d: p.d,
        color: p.color,
        tilt: p.tilt
      };
    }
  }
}

function startConfetti() {
  setInterval(drawConfetti, 20);
}
