// Surprise Reveal
const giftBox = document.getElementById("giftBox");
const surprise = document.getElementById("surprise");

giftBox.addEventListener("click", () => {
  surprise.style.display = "flex";
  startConfetti();
});

// Confetti Animation
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];
for (let i = 0; i < 200; i++) {
  confettiPieces.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    w: 5,
    h: 10,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    speed: Math.random() * 3 + 2
  });
}

function startConfetti() {
  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.w, p.h);
      p.y += p.speed;
      if (p.y > canvas.height) p.y = -10;
    });
    requestAnimationFrame(drawConfetti);
  }
  drawConfetti();
}
