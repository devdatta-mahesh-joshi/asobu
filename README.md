# asobu
My attempts at game development. **Start here: [SETUP.md](SETUP.md)**, then the [roadmap](ROADMAP.md).

## Lessons

- [01 · The game loop](lessons/01-game-loop/): *Dodge*, a tiny canvas game with no engine

## Games

Each folder in `games/` is a Godot project. On every push, [Export games](.github/workflows/export-games.yml) builds each one for Web, Windows and Linux. Download the builds from the workflow run's **Artifacts** section.

- [hello-godot](games/hello-godot/): a bouncing square that proves the pipeline works

**New game:** create it in the Godot app inside `games/<name>/` (Compatibility renderer), then commit everything except `.godot/`, including the `*.uid` files. If the game has no `export_presets.cfg`, CI uses the defaults in `.github/godot/`.

**Publishing (optional, from `main` only):**
- *itch.io:* create the game page (its URL slug must match the folder name), add the repository secret `BUTLER_API_KEY` (from itch.io → Settings → API keys), and add the repository variable `ITCH_USER`.
- *GitHub Pages:* set Settings → Pages → Source to "GitHub Actions" and add the repository variable `DEPLOY_PAGES=true`.

Keep `GODOT_VERSION` in the workflow the same as your Godot app's version.
