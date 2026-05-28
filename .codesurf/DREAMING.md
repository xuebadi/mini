# CodeSurf Workspace Memory — tinyworld

_Generated: 2026-05-28 (sixteenth pass)_

---

## Overview

Tiny World Builder is a single-file, no-bundler 3-D isometric world editor built on Three.js r128. The runtime is `tiny-world-builder.html` (inline CSS + JS; **38,410 lines** as of HEAD `dddcddb`). `LandscapeEngine.js` handles procedural continuous terrain; internals in `engine/landscape/` mixin modules (chunks.js, geometries.js, noise.js, shaders.js, water.js). Deployment is static: `publish.sh` → `dist/`. `npm test` runs ESLint + HTMLHint; all pass.

---

## Durable Architecture Facts

**Core data contract**
- `world[x][z]` — intent layer; `cellMeshes['x,z']` — render layer
- All mutations via `setCell(x, z, opts)`; sparse-safe reads via `getWorldCell()` / `ensureWorldCell()`
- Never write to `world[x][z]` directly outside init

**World format**
- `world.schema.json` added — formal JSON Schema v4 for the world save format
- Cells may be compact tuple arrays or object form; schema version must be `4`
- Terrain enum: `grass`, `path`, `dirt`, `water`, `stone`, `lava`, `sand`, `snow`
- Kind enum includes `voxel-build` and `model-stamp`; `appearance.modelStampId` links to stamp registry
- Island boards supported: `islands[]` with per-island engine slots (lift/turbo/heavy, levels 1–3)

**Stable on main (HEAD `dddcddb`):**
- Planet underlay, water flow system, ghost world generation
- Audio UI and defaults bootstrap
- Updated editing controls (asset clipboard, stamp nav, freehand strokes)
- Under-island visual effects: debris bursts, rocket smoke, waterfall tweaks, cylinder geometry cache
- 3-D crowd character replacement path — animated GLTF clips cached; crowd sprites replaced by cloned 3-D actors when animated character stamp present; `vendor/tiny-crowd-layer.js` updated
- New models: `Heisenberg.obj`, `Hitman_T_Pose.obj/.mtl/.png`, `Trap 1 Obj.obj/.mtl/.png`; `voxelboats.fbx` removed
- `tools/model-stamps.js` updated with character-detection heuristic
- `world.schema.json` — new formal world save format schema
- `voxel_lift_engine.html` — new 200-line standalone Three.js 0.160 voxel lift demo

**Three.js r128 pinned.** No bundler, no npm runtime deps. Materials in `M.*` are shared; clone before mutating color.

---

## Branch State

**main** — HEAD `dddcddb` (ahead 1 of remote, not yet pushed)

**Working tree has uncommitted changes:**
- `.codex/skills/tinyworld-island-and-planes/SKILL.md`
- `.codex/skills/tinyworld-render-performance/SKILL.md`
- `tiny-world-builder.html`

**Stale branches (safe to prune):** `asset-system-slice`, `worktree-agent-a17895f4`, `worktree-agent-a35bb1ef`, `worktree-agent-a6b44378` (all behind 131+)

---

## Skills Inventory

17 local skills confirmed. **AGENTS.md routing gap (persistent):** `tinyworld-ghost-world-gen` and `threejs-primitive-reconstructor` not listed in AGENTS.md routing table.

---

## Open Threads

- Push `main` to remote (1 commit ahead)
- Commit uncommitted skill + HTML changes
- Implement and commit Properties Panel overhaul (category tabs, icon buttons, undo/redo, custom constrained gizmo)
- Patch `makeModelStamp()` to consume `opts.appearance`
- Add two missing skills to AGENTS.md routing table
- Diagnose OpenClaw MC Gateway / VibeClaw cron assistant-turn failures
- Authenticate X.com Chrome profile and `wacli` for Tom Doerr tracker + WhatsApp
- Prune stale worktrees and branches
