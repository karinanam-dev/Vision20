# Get a finished Mac `.dmg` without owning a Mac

GitHub will build the Mac app for you on a real Mac in the cloud — for free.
You do this once, then download the finished `.dmg` and send only that to any Mac user.

No Mac and no special tools needed. Just a web browser.

---

## Step 1 — Create a free GitHub account and repo

1. Go to https://github.com and sign up (free).
2. Click the **+** (top right) → **New repository**.
3. Name it `vision20`, set it to **Public** (free Mac build minutes), click **Create repository**.

---

## Step 2 — Add the project files

On your new empty repo page, click **"uploading an existing file"** (a link in the quick-setup box).

Drag in these files and folders from `c:\development\Vision20`:

- `main.js`
- `preload.js`
- `package.json`
- `package-lock.json`
- `README.md`
- `MAC-README.md`
- `Build on Mac.command`
- `Start Vision20.bat`
- the entire **`renderer`** folder

**Do NOT upload** `node_modules` or `dist` (big and unnecessary).

Click **Commit changes**.

> Note: don't worry about the `.github` folder or `.gitignore` here — the drag-and-drop
> upload often skips folders that start with a dot. We'll add the build file by hand in Step 3,
> which is more reliable.

---

## Step 3 — Add the build instruction file (this is what triggers the Mac build)

1. On your repo page, click **Add file** → **Create new file**.
2. In the filename box at the top, type exactly:

   ```
   .github/workflows/build-mac.yml
   ```

   (GitHub turns the slashes into folders automatically as you type.)

3. Paste the following into the big text area, exactly as-is:

   ```yaml
   name: Build Mac App

   on:
     push:
       branches: [ main, master ]
     workflow_dispatch:

   jobs:
     build-mac:
       runs-on: macos-latest
       steps:
         - name: Check out the project
           uses: actions/checkout@v4

         - name: Set up Node.js
           uses: actions/setup-node@v4
           with:
             node-version: 20

         - name: Install dependencies
           run: npm install

         - name: Build the Mac .dmg
           run: npm run dist:mac
           env:
             CSC_IDENTITY_AUTO_DISCOVERY: false

         - name: Upload the .dmg as a downloadable artifact
           uses: actions/upload-artifact@v4
           with:
             name: Vision20-mac-dmg
             path: dist/*.dmg
             if-no-files-found: error
   ```

4. Click **Commit changes**.

As soon as you commit this file, the Mac build starts automatically.

---

## Step 4 — Download your finished `.dmg`

1. Click the **Actions** tab at the top of your repo.
2. You'll see a run called **Build Mac App** (yellow dot = running, green check = done).
3. Wait a few minutes for the green check.
4. Click into that run, scroll down to **Artifacts**, and download **`Vision20-mac-dmg`**.
5. Unzip it — inside is **`Vision20-1.0.0.dmg`**. That's your finished product.

---

## What the Mac user does (minimal work)

1. Double-click `Vision20-1.0.0.dmg`
2. Drag **Vision20** into **Applications**
3. Open it. First time only: right-click the app → **Open** → **Open**
   (clears the "unidentified developer" notice, since the app isn't signed yet).

---

## Selling it for real?

To remove the "unidentified developer" prompt entirely, sign and notarize the app with an
**Apple Developer account** ($99/year). The build config already supports adding this later.
```
