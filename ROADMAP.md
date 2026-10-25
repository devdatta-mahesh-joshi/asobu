# Roadmap: solo 2D indie dev (hobby)

**Goal:** make and publish 2D single-player games alone.
**Inspirations:** Minish Cap, Mario, Pokémon Emerald, Stardew Valley, Hollow Knight, Silksong.
**Budget:** about 12 h/week.
**Engine:** Godot 4. It's free, has excellent 2D support (tilemaps, animation, physics bodies), and exports to Windows, macOS, Linux and web. Shipped examples include *Cassette Beasts* (a Pokémon-like), *Brotato* and *Dome Keeper*.

## Reality check

Stardew took one person about 4.5 years. Hollow Knight was made by a small team over about 3 years. Your favourite games are **destinations, not first projects**. The path below builds one slice of each genre, so every skill they need is practised in a small, finished game.

## Weekly rhythm (12 h)

| Hours | Activity |
|---|---|
| 8 | Build the current project |
| 2 | Art or audio practice (pixel art first) |
| 1 | Study: a tutorial, a GDC talk, a chapter of *Game Programming Patterns* |
| 1 | Analytical play: replay an inspiration and write down *why* something feels good |

## Phases

Each phase ends with **a build uploaded to itch.io**. Shipping is a skill, so practise it from day one.

### Phase 0: Fundamentals without an engine (week 1)
- [ ] Lesson 01 exercises (`lessons/01-game-loop/`)

### Phase 1: Learn Godot (weeks 2–4)
- [ ] Official tutorial "Your first 2D game" (*Dodge the Creeps*). Compare it with your Lesson 01 version and note what Godot did for you.
- [ ] Learn Godot's model: **nodes, scenes, signals, `_process` vs `_physics_process`, autoloads, Resources**
- [ ] Build Breakout in Godot without a tutorial → itch.io

### Phase 2: Platformer, *Mario* (weeks 5–9)
One world with three levels and one enemy type that you design.
- [ ] `CharacterBody2D` movement with acceleration and friction
- [ ] Jump feel: variable jump height, coyote time, jump buffering, apex hang, a capped fall speed
- [ ] `TileMapLayer` level building, one-way platforms, hazards
- [ ] Camera: follow, look-ahead, level limits
- [ ] Animation state machine (idle, run, jump, fall)
- [ ] Checkpoints, death and respawn, a level-select screen → itch.io

### Phase 3: Top-down adventure, *Minish Cap* (weeks 10–15)
One small dungeon: about 8 rooms, a key and lock, one new item, one boss.
- [ ] 8-directional movement, Y-sorting (drawing order by depth)
- [ ] Combat: hitboxes vs. hurtboxes, knockback, invincibility frames, hit-stop
- [ ] Enemy AI as state machines (patrol, chase, attack)
- [ ] Room transitions with camera snapping
- [ ] Dialogue boxes, NPCs, signs
- [ ] **Save/load** (`FileAccess` + JSON or Resources) → itch.io

### Phase 4: First game jam (around week 16)
- [ ] Enter GMTK Jam, Ludum Dare or any itch.io jam. Finish something in 48–72 h.

### Phase 5: Pick one systems-heavy slice (weeks 17–24)
- **Metroidvania (*Hollow Knight*):** wall jump and dash that unlock new areas, a map screen, a multi-phase boss
- **Life sim (*Stardew*):** day/time clock, inventory, crop growth, data-driven items as Godot `Resource`s
- **Monster RPG (*Pokémon*):** grid movement, turn-based battle state machine, data-driven creatures and moves

### Phase 6: First "real" game (months 6–12+)
- [ ] Scope it to **3–6 months**, building on whichever slice you enjoyed most
- [ ] Vertical slice, then playtests, then a Steam page early (wishlists), then the release

## Parallel tracks

**Art (pixel art):**
- Tools: Aseprite (paid, the standard) or LibreSprite / Pixelorama (free)
- Order of practice: 16×16 tiles, then character idle and walk cycles, then tilesets with autotiling, then effects
- Learn from Saint11 (Pedro Medeiros) pixel-art tutorials and MortMort on YouTube
- Placeholder assets from Kenney.nl are fine. Don't let art block your code.

**Audio:**
- Sound effects: jsfxr / sfxr
- Music: BeepBox, or freely licensed tracks to start with

**Study list:**
- *Game Programming Patterns* chapters: State, Game Loop, Update Method, Component, Observer, Event Queue
- Talks and articles: "Juice it or lose it" (GDC Europe 2012), Maddy Thorson's "Celeste & Forgiveness" article, Hollow Knight developer interviews and postmortems
- Game Maker's Toolkit (Mark Brown) videos on level design and game feel

## Tablet setup (Android)

| Need | Tool | Notes |
|---|---|---|
| Engine | **Godot Editor 4** (official Android app) | GDScript only, no C#. Use the Compatibility or Mobile renderer. Grant "All files access". Can't export finished builds, so use CI (below). |
| Terminal / git | **Termux** from F-Droid or GitHub | The Play Store build is deprecated. `pkg install git openssh python`, `termux-setup-storage` |
| Lesson 01 (JS) | Termux + Chrome | `python -m http.server` in the lesson folder, then open `localhost:8000`. Edit with Acode, or `micro`/`nvim` in Termux. |
| Pixel art | Resprite or Pixel Studio, Pixelorama (experimental Android build on itch.io) | A stylus helps a lot |
| Audio | jsfxr, BeepBox | Both run in the browser |
| Builds | GitHub Actions + headless Godot (e.g. `barichello/godot-ci`) | Exports web/desktop builds and can upload to itch.io with `butler` |
| Hardware | Bluetooth keyboard + mouse | Close to essential for the Godot editor and keyboard-controlled games |

Keep projects in shared storage (e.g. `Documents/asobu`) so both Godot and Termux can see them. In Termux that's `~/storage/shared/Documents/asobu`. Git may need `git config --global --add safe.directory '*'` and `core.fileMode false` there.

## Log

| Date | Phase | Shipped / learned |
|---|---|---|
| | | |
