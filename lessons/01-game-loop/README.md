# Lesson 01 · The game loop

A complete, tiny game, *Dodge*, written in about 180 lines of plain JS with no engine. The point is to see every moving part that an engine normally hides.

**Run it:** open `index.html` in a browser, or run `npx serve .` / `python3 -m http.server` in this folder.

## What to notice in `game.js`

| Concept | Where | Web-dev analogy |
|---|---|---|
| Polled input (`held` / `pressed`) | top | Like keeping form state in a store and reading it, instead of acting in `onClick` |
| Scene state machine | `scene` | SPA routes, but you switch them with code |
| `update(dt)` vs `render()` | middle | Model vs view. `update` must never draw and `render` must never change state |
| Fixed timestep + accumulator | bottom | No direct analogy. This replaces the request/response cycle |
| Immediate-mode rendering | `render()` | Like re-rendering the whole React tree every frame, with no virtual DOM |
| AABB collision | `overlaps()` | Two interval-overlap checks, one per axis |
| Tuning constants | `PLAYER_*` | Config, except these numbers decide whether the game is fun |

## Exercises (in order of difficulty)

1. **Feel:** Set `PLAYER_DRAG` to `2`, then to `40`. Then delete the accel/drag lines and use `player.x += dir * 400 * dt`. Which version feels best, and why?
2. **Juice:** When the player hits a wall, add a small screen shake. When a block goes past the player, flash the score.
3. **Pause:** Add a `paused` scene toggled with `P`. Where does the check go, and why does the loop keep running?
4. **Bug hunt:** Change `STEP` to `1/10` and play. What breaks? Then remove the `while` loop and call `update((now - last) / 1000)` directly. Switch tabs for 5 seconds and come back. What happens?
5. **Content:** Add a second enemy type that moves sideways, and a pickup that grants 2 seconds of invulnerability (the player blinks while it lasts).
6. **Architecture:** You now have three "kinds" of things with position, size and velocity. Refactor them into a shared structure without using class inheritance. (Lesson 02 covers composition and ECS.)
