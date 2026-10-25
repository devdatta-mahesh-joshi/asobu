# Tablet setup (do this once)

About 30–45 minutes. You only need the first 5 steps for Lesson 01. Godot comes later (step 7).

## 1. Hardware
Pair a **Bluetooth keyboard** (and a mouse if you have one). Lesson 01 uses the arrow keys or A/D, plus Space.

## 2. Install apps
| App | Where from | For |
|---|---|---|
| **Termux** | [F-Droid](https://f-droid.org/packages/com.termux/) or [GitHub releases](https://github.com/termux/termux-app/releases), **not** the Play Store | Terminal, git, local web server |
| **Acode** | Play Store | Code editor |
| **Chrome** | Usually preinstalled | Running the game |

## 3. Set up Termux
Open Termux and run:
```sh
pkg update && pkg upgrade        # answer the prompts with Enter
pkg install git gh python
termux-setup-storage             # tap "Allow"; this creates ~/storage/shared
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global --add safe.directory '*'
git config --global core.fileMode false
gh auth login                    # GitHub.com → HTTPS → Login with a web browser
gh auth setup-git                # lets git push using that login
```

## 4. Clone the repo into shared storage
Shared storage is where both Acode and (later) Godot can see the files.
```sh
mkdir -p ~/storage/shared/Documents
cd ~/storage/shared/Documents
git clone https://github.com/devdatta-mahesh-joshi/asobu.git
cd asobu
```

## 5. Run Lesson 01
```sh
cd ~/storage/shared/Documents/asobu/lessons/01-game-loop
python -m http.server 8000
```
Open Chrome and go to **http://localhost:8000**. Leave Termux running. To stop the server, press Ctrl+C.

- **Edit:** in Acode, use *Open folder* → `Documents/asobu`. Put Acode and Chrome side by side in split-screen.
- **See changes:** save in Acode, then reload in Chrome.
- **Debug:** open **http://localhost:8000/?debug** for an on-screen console (Chrome on Android has no DevTools). `console.log` output and errors show up there.

## 6. Save your work
After each exercise (in Termux, Ctrl+C the server first, or open a new session by swiping from the left edge):
```sh
cd ~/storage/shared/Documents/asobu
git add -A
git commit -m "Lesson 01: exercise 1 (movement feel)"
git push
```

## 7. Later, for Phase 1: Godot
Install **Godot Editor 4** from the Play Store, matching `GODOT_VERSION` in `.github/workflows/export-games.yml`. Grant "All files access", then *Import* projects from `Documents/asobu/games/<name>/`. Use the **Compatibility** renderer for new projects.
