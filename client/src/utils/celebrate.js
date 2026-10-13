import confetti from 'canvas-confetti';

export function celebrate(options = {}) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, ...options });
}