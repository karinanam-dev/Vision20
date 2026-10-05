# Vision20

A cute desktop break reminder based on the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds to rest your eyes.

## What it does

- Runs quietly in the background with a system tray icon.
- A cute character **sleeps** while you work.
- Every **20 minutes** a popup appears: the character **wakes up and dances**, a **soft chime** plays, and a **20-second countdown** runs.
- When the countdown ends, the character **goes back to sleep** and the popup closes until the next cycle.
- **Start** and **Stop** buttons let you control it. Stop it before you sleep, start it again when you're back.

## Run it

```powershell
npm install
npm start
```

The control window opens. Click **Start** to begin the cycle. Close the window and it keeps running in the tray; right-click the tray icon for Start/Stop/Quit.

## Timing

The intervals are defined at the top of `main.js`:

```js
const WORK_INTERVAL_MS = 20 * 60 * 1000; // 20 minutes between breaks
const BREAK_DURATION_MS = 20 * 1000;     // 20 second break countdown
```

Lower these values to test quickly (e.g. `20 * 1000` for a 20-second work interval).

## Project structure

- `main.js` — Electron main process: timer, tray, window management.
- `preload.js` — safe bridge between main and renderer windows.
- `renderer/control.html` / `control.js` — the Start/Stop control window with the sleeping character.
- `renderer/break.html` / `break.js` — the break popup: dancing character, chime, countdown.
- `renderer/styles.css` — styling and character animations.
