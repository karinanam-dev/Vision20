const { app, BrowserWindow, Tray, Menu, ipcMain, nativeImage } = require('electron');
const path = require('path');

// Timing configuration (milliseconds)
const WORK_INTERVAL_MS = 20 * 60 * 1000; // 20 minutes between breaks
const BREAK_DURATION_MS = 20 * 1000;     // 20 second break countdown

let controlWindow = null; // small window with Start/Stop controls + sleeping character
let breakWindow = null;   // full popup shown during a break
let tray = null;

let workTimer = null;      // fires when it's time for a break
let isRunning = false;     // whether the cycle is active
let nextBreakAt = null;    // timestamp of the next scheduled break

function createControlWindow() {
  controlWindow = new BrowserWindow({
    width: 360,
    height: 460,
    resizable: false,
    fullscreenable: false,
    title: 'Vision20',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  controlWindow.loadFile(path.join(__dirname, 'renderer', 'control.html'));

  // Hide to tray instead of quitting when the window is closed.
  controlWindow.on('close', (e) => {
    if (!app.isQuitting) {
      e.preventDefault();
      controlWindow.hide();
    }
  });
}

function createBreakWindow() {
  // Create the break popup up front but keep it hidden until needed.
  breakWindow = new BrowserWindow({
    width: 480,
    height: 520,
    show: false,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  breakWindow.loadFile(path.join(__dirname, 'renderer', 'break.html'));
}

function scheduleNextBreak() {
  clearTimeout(workTimer);
  nextBreakAt = Date.now() + WORK_INTERVAL_MS;
  workTimer = setTimeout(startBreak, WORK_INTERVAL_MS);
  sendStatus();
}

function startBreak() {
  if (!isRunning || !breakWindow) return;

  // Show the popup on top and tell it to begin: wake up, dance, chime, countdown.
  breakWindow.showInactive();
  breakWindow.setAlwaysOnTop(true, 'screen-saver');
  breakWindow.show();
  breakWindow.focus();
  breakWindow.webContents.send('break:start', { duration: BREAK_DURATION_MS });
}

function endBreak() {
  // Called when the countdown finishes (character goes back to sleep).
  if (breakWindow) {
    breakWindow.hide();
  }
  if (isRunning) {
    scheduleNextBreak(); // begin the next 20-minute cycle
  }
}

function startCycle() {
  if (isRunning) return;
  isRunning = true;
  scheduleNextBreak();
  updateTrayMenu();
}

function stopCycle() {
  isRunning = false;
  clearTimeout(workTimer);
  workTimer = null;
  nextBreakAt = null;
  if (breakWindow && breakWindow.isVisible()) {
    breakWindow.hide();
  }
  sendStatus();
  updateTrayMenu();
}

function sendStatus() {
  if (controlWindow && !controlWindow.isDestroyed()) {
    controlWindow.webContents.send('status:update', {
      isRunning,
      nextBreakAt,
      workIntervalMs: WORK_INTERVAL_MS,
    });
  }
}

function createTray() {
  // Minimal 1x1 transparent image fallback so the app runs without an icon asset.
  const icon = nativeImage.createFromDataURL(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  );
  tray = new Tray(icon);
  tray.setToolTip('Vision20 - break reminder');
  updateTrayMenu();
  tray.on('click', () => {
    if (controlWindow) {
      controlWindow.show();
    }
  });
}

function updateTrayMenu() {
  if (!tray) return;
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open Vision20', click: () => controlWindow && controlWindow.show() },
    { type: 'separator' },
    {
      label: isRunning ? 'Stop timer' : 'Start timer',
      click: () => (isRunning ? stopCycle() : startCycle()),
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.isQuitting = true;
        app.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
}

// ---- IPC from the renderer windows ----
ipcMain.on('cycle:start', () => startCycle());
ipcMain.on('cycle:stop', () => stopCycle());
ipcMain.on('break:done', () => endBreak());
ipcMain.on('break:skip', () => endBreak());
ipcMain.on('status:request', () => sendStatus());

app.whenReady().then(() => {
  createControlWindow();
  createBreakWindow();
  createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createControlWindow();
  });
});

// Keep running in the background (tray) even when all windows are closed.
app.on('window-all-closed', (e) => {
  // Do not quit; the app lives in the tray.
});
