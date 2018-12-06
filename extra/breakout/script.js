const canvas = /** @type {HTMLCanvasElement} **/ document.getElementById(
  'breakout',
);
// canvas.width = window.innerWidth * 0.97;
// canvas.height = window.innerHeight * 0.97;
canvas.width = '580';
canvas.height = '290';
const ctx = canvas.getContext('2d');

random = (max, min) => Math.random() * (max - min) + min;

let ballRadius = 10;
let y = random(canvas.height, 0);
let x = random(canvas.width, 0);
let dx = 2;
let dy = -2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.closePath();
}

// Creates a frame!
draw = () => {
  console.log('Drawing!');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  x += dx;
  y += dy;
  if (y <= ballRadius || y >= canvas.height - ballRadius) {
    dy = -dy;
  }
  if (x <= ballRadius || x >= canvas.width - ballRadius) {
    dx = -dx;
  }
};

setInterval(draw, 10);
