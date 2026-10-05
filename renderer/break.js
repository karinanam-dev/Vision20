const countdownEl = document.getElementById('breakCountdown');
const character = document.getElementById('character');
const charNameEl = document.getElementById('charName');
const skipBtn = document.getElementById('skipBtn');

let countdownTimer = null;

skipBtn.addEventListener('click', () => {
  cleanup();
  window.vision20.breakSkip();
});

window.vision20.onBreakStart(({ duration }) => {
  startBreak(duration);
});

function startBreak(durationMs) {
  // Pick a random cute character and render it, then make it dance.
  const char = pickRandomCharacter();
  character.className = 'character ' + char.dance; // reset classes + apply this one's dance
  character.innerHTML = char.build();
  charNameEl.textContent = char.name + ' is here to dance!';

  playSoftChime();

  let remaining = Math.round(durationMs / 1000);
  countdownEl.textContent = remaining;

  clearInterval(countdownTimer);
  countdownTimer = setInterval(() => {
    remaining -= 1;
    countdownEl.textContent = remaining;
    if (remaining <= 0) {
      finishBreak();
    }
  }, 1000);
}

function finishBreak() {
  cleanup();
  charNameEl.textContent = '';
  window.vision20.breakDone();
}

function cleanup() {
  clearInterval(countdownTimer);
  countdownTimer = null;
}

// Soft, gentle chime generated with the Web Audio API (no sound files needed).
function playSoftChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    // A soft two-note gentle bell.
    const notes = [523.25, 659.25]; // C5, E5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const start = now + i * 0.18;
      const peak = 0.0001;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.25, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 1.6);
    });
    // Close context after the sound finishes.
    setTimeout(() => ctx.close(), 2200);
  } catch (e) {
    // Audio is best-effort; ignore failures.
  }
}
