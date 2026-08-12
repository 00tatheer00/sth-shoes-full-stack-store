import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFB800', '#FF3B30', '#10B981', '#ffffff', '#3A2012'],
    });
  } catch (e) {
    // fallback if canvas not available
  }
};

export const triggerGoldenCelebration = () => {
  try {
    const end = Date.now() + 1.5 * 1000;
    const colors = ['#FFB800', '#FFC700', '#D4AF37', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch (e) {
    // fallback
  }
};
