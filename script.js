// Gift click event
const giftBox = document.getElementById("giftBox");
const note = document.getElementById("note");

giftBox.addEventListener("click", () => {
  note.style.display = "block";
  startConfetti();
});

// Confetti Animation
const confetti = document.getElementById("confetti");
const ctx = confetti.getContext("2d");
confetti.width = window.innerWidth;
confetti.height = window.innerHeight;

let particles = [];

function randomColor() {
  const colors = ["#FFC107","#E91E63","#2196F3","#4CAF50","#FF5722"];
  return colors[Math.floor(Math.random()*colors.length)];
}

function createParticles() {
  for (let i=0; i<150; i++) {
    particles.push({
      x: Math.random()*confetti.width,
      y: Math.random()*confetti.height - confetti.height,
      r: Math.random()*6+2,
      d: Math.random()*Math.PI,
      color: randomColor(),
      tilt: Math.random()*10 - 10
    });
  }
}

function drawParticles() {
  ctx.clearRect(0,0,confetti.width,confetti.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.fillStyle=p.color;
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2,true);
    ctx.fill();
  });
  updateParticles();
}

function updateParticles() {
  particles.forEach(p=>{
    p.y += 2;
    p.x += Math.sin(p.d);
    if(p.y > confetti.height) {
      p.y = -10;
      p.x = Math.random()*confetti.width;
    }
  });
}

function startConfetti() {
  createParticles();
  setInterval(drawParticles,20);
}
