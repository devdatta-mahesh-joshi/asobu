// Lesson 01: a complete (tiny) game in plain JS + <canvas>.
// Read top to bottom: input -> state -> update -> render -> loop.

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

// ---------------------------------------------------------------------------
// Input
// Web apps react to events. Games mostly *poll*: events just record state,
// and update() asks "is Left held right now?" every tick.
// `held` = level-triggered (movement), `pressed` = edge-triggered (start, jump).
// ---------------------------------------------------------------------------
const held = new Set();
const pressed = new Set();

addEventListener('keydown', (e) => {
  if (!e.repeat) pressed.add(e.code);
  held.add(e.code);
  if (e.code.startsWith('Arrow') || e.code === 'Space') e.preventDefault();
});
addEventListener('keyup', (e) => held.delete(e.code));
addEventListener('blur', () => held.clear()); // avoid "stuck" keys on alt-tab

const isHeld = (...codes) => codes.some((c) => held.has(c));

// ---------------------------------------------------------------------------
// Tuning constants. Most of "game feel" lives in numbers like these.
// ---------------------------------------------------------------------------
const PLAYER_ACCEL = 3000; // px/s^2
const PLAYER_DRAG = 10;    // higher = stops faster
const PLAYER_MAX_SPEED = 420;

// ---------------------------------------------------------------------------
// Game state
// `scene` is a tiny state machine: title -> playing -> gameover -> playing ...
// ---------------------------------------------------------------------------
let scene = 'title';
let player, enemies, spawnTimer, elapsed, shake;
let best = 0;

function reset() {
  player = { x: W / 2 - 14, y: H - 50, w: 28, h: 28, vx: 0 };
  enemies = [];
  spawnTimer = 0;
  elapsed = 0;
  shake = 0;
}

function overlaps(a, b) {
  // Axis-aligned bounding box (AABB) test: the workhorse of 2D collision.
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

// ---------------------------------------------------------------------------
// Update: advance the simulation by `dt` seconds. No drawing here.
// ---------------------------------------------------------------------------
function update(dt) {
  shake = Math.max(0, shake - 40 * dt);

  if (scene !== 'playing') {
    if (pressed.has('Space')) {
      reset();
      scene = 'playing';
    }
    return;
  }

  elapsed += dt;
  const difficulty = 1 + elapsed / 15;

  // Movement with acceleration + drag instead of "x += speed".
  // Try replacing this with instant movement and feel the difference.
  const dir = Number(isHeld('ArrowRight', 'KeyD')) - Number(isHeld('ArrowLeft', 'KeyA'));
  player.vx += dir * PLAYER_ACCEL * dt;
  player.vx -= player.vx * PLAYER_DRAG * dt;
  player.vx = Math.max(-PLAYER_MAX_SPEED, Math.min(PLAYER_MAX_SPEED, player.vx));
  player.x += player.vx * dt;
  if (player.x < 0 || player.x + player.w > W) {
    player.x = Math.max(0, Math.min(W - player.w, player.x));
    player.vx = 0;
  }

  // Spawning on a timer. `while` so a long tick can't skip spawns.
  spawnTimer -= dt;
  while (spawnTimer <= 0) {
    const size = 16 + Math.random() * 30;
    enemies.push({
      x: Math.random() * (W - size),
      y: -size,
      w: size,
      h: size,
      vy: (140 + Math.random() * 120) * difficulty,
    });
    spawnTimer += 0.6 / difficulty;
  }

  for (const e of enemies) e.y += e.vy * dt;
  enemies = enemies.filter((e) => e.y < H);

  if (enemies.some((e) => overlaps(player, e))) {
    scene = 'gameover';
    best = Math.max(best, elapsed);
    shake = 14;
  }
}

// ---------------------------------------------------------------------------
// Render: draw the *current* state. Immediate mode: clear and redraw
// everything every frame (no DOM diffing, no retained elements).
// ---------------------------------------------------------------------------
function render() {
  ctx.save();
  ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);

  ctx.fillStyle = '#1b1d27';
  ctx.fillRect(-20, -20, W + 40, H + 40);

  ctx.fillStyle = '#ff5c7a';
  for (const e of enemies) ctx.fillRect(e.x, e.y, e.w, e.h);

  ctx.fillStyle = scene === 'gameover' ? '#666' : '#5ce1e6';
  ctx.fillRect(player.x, player.y, player.w, player.h);

  ctx.restore();

  ctx.fillStyle = '#eee';
  ctx.font = '16px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`time ${elapsed.toFixed(1)}s   best ${best.toFixed(1)}s`, 12, 24);

  if (scene !== 'playing') {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = 'bold 40px monospace';
    ctx.fillText(scene === 'title' ? 'DODGE' : 'GAME OVER', W / 2, H / 2 - 10);
    ctx.font = '18px monospace';
    ctx.fillText('←/→ or A/D to move · SPACE to start', W / 2, H / 2 + 30);
  }
}

// ---------------------------------------------------------------------------
// The game loop, with a fixed timestep.
// The browser calls frame() at the display's refresh rate (60, 120, 144 Hz...).
// We run update() in fixed 1/60 s steps so the simulation behaves the same
// on every machine. See: https://gafferongames.com/post/fix_your_timestep/
// ---------------------------------------------------------------------------
const STEP = 1 / 60;
let last = performance.now();
let accumulator = 0;

function frame(now) {
  // Clamp so a backgrounded tab doesn't come back and simulate 30 seconds at once.
  accumulator += Math.min((now - last) / 1000, 0.25);
  last = now;

  while (accumulator >= STEP) {
    update(STEP);
    pressed.clear(); // edge-triggered input is consumed by one tick
    accumulator -= STEP;
  }

  render();
  requestAnimationFrame(frame);
}

reset();
requestAnimationFrame(frame);
