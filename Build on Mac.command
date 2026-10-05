#!/bin/bash
# Double-click this file on a Mac to build Vision20 into a .dmg installer.
# The finished installer will appear in the "dist" folder next to this file.

# Move into the folder this script lives in (so it works no matter where it's run from).
cd "$(dirname "$0")" || exit 1

echo "============================================"
echo "  Building Vision20 for macOS..."
echo "============================================"
echo

# Check Node.js is installed.
if ! command -v npm >/dev/null 2>&1; then
  echo "Node.js is not installed."
  echo "Please install it from https://nodejs.org (choose the LTS version),"
  echo "then double-click this file again."
  echo
  read -n 1 -s -r -p "Press any key to close..."
  exit 1
fi

echo "Installing dependencies (first time can take a few minutes)..."
npm install || { echo "npm install failed."; read -n 1 -s -r -p "Press any key to close..."; exit 1; }

echo
echo "Packaging the Mac app..."
npm run dist:mac || { echo "Build failed."; read -n 1 -s -r -p "Press any key to close..."; exit 1; }

echo
echo "============================================"
echo "  Done! Your installer is in the 'dist' folder:"
echo "  look for a file ending in .dmg"
echo "============================================"
echo
open dist 2>/dev/null
read -n 1 -s -r -p "Press any key to close..."
