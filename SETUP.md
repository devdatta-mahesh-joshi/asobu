# Tablet setup (do this once)

About 30–45 minutes. You only need the first 5 steps for Lesson 01. Godot comes later (step 7).

## 1. Hardware
Pair a **Bluetooth keyboard** (and a mouse if you have one). Lesson 01 uses the arrow keys or A/D, plus Space.

## 2. Install apps
| App | Where from | For |
|---|---|---|
| **Termux** | [F-Droid](https://f-droid.org/packages/com.termux/) or [GitHub releases](https://github.com/termux/termux-app/releases), **not** the Play Store | Terminal, git, local web server |
| **Chrome** | Usually preinstalled | Running the game |

## 3. Set up Termux
Open Termux and run:
```sh
pkg update && pkg upgrade        # answer the prompts with Enter
pkg install git gh python vim
termux-setup-storage             # tap "Allow"; this creates ~/storage/shared
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global --add safe.directory '*'
git config --global core.fileMode false
gh auth login                    # GitHub.com → HTTPS → Login with a web browser
gh auth setup-git                # lets git push using that login
```

## 4. Clone the repo into shared storage
Shared storage is where both Termux and (later) Godot can see the files.
```sh
mkdir -p ~/storage/shared/Git
cd ~/storage/shared/Git
git clone https://github.com/devdatta-mahesh-joshi/asobu.git
cd asobu
```

## 5. Run Lesson 01
```sh
cd ~/storage/shared/Git/asobu/lessons/01-game-loop
python -m http.server 8000 > /dev/null 2>&1 &    # runs in the background
vim game.js
```
Open Chrome and go to **http://localhost:8000**. The server keeps running while you use the same Termux session. To stop it, run `kill %1`; it also stops when you close the session.

- **Edit:** use vim in Termux. Put Termux and Chrome side by side in split-screen. Esc works from the Bluetooth keyboard, and Termux's extra-keys row has one too.
- **See changes:** `:w` in vim, then reload in Chrome.
- **Debug:** open **http://localhost:8000/?debug** for an on-screen console (Chrome on Android has no DevTools). `console.log` output and errors show up there.

A minimal `~/.vimrc` for this:
```vim
syntax on
filetype plugin indent on
set number expandtab shiftwidth=2 tabstop=2
```

## 6. Save your work
After each exercise, either exit vim or run the commands from vim with `:!git ...`:
```sh
cd ~/storage/shared/Git/asobu
git add -A
git commit -m "Lesson 01: exercise 1 (movement feel)"
git push
```

## 7. Later, for Phase 1: Godot
Install **Godot Editor 4** from the Play Store, matching `GODOT_VERSION` in `.github/workflows/export-games.yml`. Grant "All files access", then *Import* projects from `Git/asobu/games/<name>/`. Use the **Compatibility** renderer for new projects.
