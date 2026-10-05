const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const statusEl = document.getElementById('status');
const countdownEl = document.getElementById('countdown');
const character = document.getElementById('character');

let nextBreakAt = null;
let isRunning = false;
let tickTimer = null;

startBtn.addEventListener('click', () => window.vision20.startCycle());
stopBtn.addEventListener('click', () => window.vision20.stopCycle());

window.vision20.onStatusUpdate((data) => {
  isRunning = data.isRunning;
  nextBreakAt = data.nextBreakAt;

  startBtn.disabled = isRunning;
  stopBtn.disabled = !isRunning;

  if (isRunning) {
    statusEl.textContent = 'Working... next break in';
    character.classList.add('sleeping'); // snoozing while you work
    startTick();
  } else {
    statusEl.textContent = 'Timer is stopped';
    countdownEl.textContent = '';
    character.classList.add('sleeping');
    stopTick();
  }
});

function startTick() {
  stopTick();
  updateCountdown();
  tickTimer = setInterval(updateCountdown, 1000);
}

function stopTick() {
  if (tickTimer) {
    clearInterval(tickTimer);
    tickTimer = null;
  }
}

function updateCountdown() {
  if (!nextBreakAt) {
    countdownEl.textContent = '';
    return;
  }
  const remaining = Math.max(0, nextBreakAt - Date.now());
  const totalSec = Math.ceil(remaining / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  countdownEl.textContent = `${min}:${String(sec).padStart(2, '0')}`;
}

// Ask main for current status on load.
window.vision20.requestStatus();
