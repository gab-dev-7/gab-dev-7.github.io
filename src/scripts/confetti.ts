// src/scripts/confetti.ts

const CONFETTI_COUNT = 100;
const CONFETTI_COLORS = ['#ff0055', '#00f0ff']; // Pink and Cyan

function createConfettiParticle() {
  const particle = document.createElement('div');
  particle.style.position = 'fixed';
  particle.style.zIndex = '9999';
  particle.style.width = `${Math.floor(Math.random() * 10) + 5}px`;
  particle.style.height = particle.style.width;
  particle.style.backgroundColor = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
  particle.style.borderRadius = '50%';
  
  const startX = Math.random() * window.innerWidth;
  const startY = -20;
  particle.style.left = `${startX}px`;
  particle.style.top = `${startY}px`;

  const animationDuration = Math.random() * 3 + 2; // 2-5 seconds
  const endX = startX + (Math.random() - 0.5) * 400;
  const endY = window.innerHeight + 20;

  particle.animate([
    { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
    { transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
  ], {
    duration: animationDuration * 1000,
    easing: 'ease-out'
  });

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, animationDuration * 1000);
}

export function launchConfetti() {
  for (let i = 0; i < CONFETTI_COUNT; i++) {
    setTimeout(() => {
      createConfettiParticle();
    }, i * 20); // Stagger the confetti fall
  }
}
