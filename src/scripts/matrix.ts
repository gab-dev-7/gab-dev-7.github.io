// src/scripts/matrix.ts

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number;

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()[]{}|;:',.<>?/\\";
const font_size = 14;
let columns: number;
let drops: number[];

function setup() {
  canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1'; // Behind the content
  document.body.appendChild(canvas);

  ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  columns = canvas.width / font_size;
  drops = [];
  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }
}

function draw() {
  if (!ctx || !canvas) return;

  ctx.fillStyle = "rgba(5, 10, 20, 0.05)"; // Use the site's bg color with low alpha
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00f0ff"; // Cyan text
  ctx.font = font_size + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * font_size, drops[i] * font_size);

    if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }

  animationFrameId = requestAnimationFrame(draw);
}

export function startMatrixEffect() {
  if (canvas) return; // Already running
  setup();
  if (ctx) {
    draw();
  }
}

export function stopMatrixEffect() {
  if (!canvas || !animationFrameId) return;
  cancelAnimationFrame(animationFrameId);
  canvas.remove();
  canvas = null;
  ctx = null;
}
