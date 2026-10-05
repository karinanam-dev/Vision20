# Vision20 on a Mac

There are two ways to get Vision20 onto a Mac. Pick based on what you have.

---

## The easy way (for the person receiving the app)

If someone gives you a **`Vision20-1.0.0.dmg`** file:

1. Double-click the `.dmg` file.
2. Drag the **Vision20** icon into the **Applications** folder.
3. Open **Applications** and double-click **Vision20**.

### First-time security prompt
macOS may say *"Vision20 can't be opened because it is from an unidentified developer."*
This is normal for apps not sold through the App Store. To open it:

- **Right-click** (or Control-click) the Vision20 app → choose **Open** → click **Open** again.

You only need to do this once. After that it opens normally.

---

## Making the `.dmg` (one-time, must be done on a Mac)

The double-clickable installer has to be built on a Mac. It's one step:

1. Copy this whole project folder to a Mac (you can skip the `node_modules` folder if present).
2. In Finder, double-click **`Build on Mac.command`**.
   - If macOS blocks it, right-click the file → **Open** → **Open**.
   - If it asks, make it runnable first: open Terminal, run `chmod +x "Build on Mac.command"`, then double-click it.
3. It installs what it needs and builds the app. When it finishes, the **`dist`** folder opens automatically.
4. Inside `dist` you'll find **`Vision20-1.0.0.dmg`** — that's the file to share. Hand that single file to anyone with a Mac.

(Requires Node.js on the build Mac. If it's missing, the script tells you to install it from https://nodejs.org — pick the LTS version.)

---

## Fallback: run without building (no `.dmg`)

If no Mac is available to build the installer, a Mac user can still run it directly:

1. Install Node.js from https://nodejs.org (LTS).
2. Copy the project folder to the Mac.
3. Open Terminal, `cd` into the folder, then run:
   ```bash
   npm install
   npm start
   ```

---

## What it does

A cute character sleeps while you work. Every 20 minutes a popup appears: a random cute character dances, a soft chime plays, and a 20-second countdown runs. Then it closes until the next cycle. Use the **Start**/**Stop** buttons to control it.
