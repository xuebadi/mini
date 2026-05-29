# CodeSurf Workspace Memory — tinyworld

_Generated: 2026-05-29 (eighteenth pass)_

---

## Overview

Tiny World Builder is an isometric 3-D world editor built on Three.js r128, deployed as a static single-file app. The major architectural milestone — splitting the ~38,410-line god-file into 33 numbered JS modules under `engine/world/` plus extracted CSS — is complete on branch `refactor/split-god-file`. `tiny-world-builder.html` is now a 1,360-line loader shell. `LandscapeEngine.js` handles continuous terrain under `engine/landscape/`. Deployment is static: `publish.sh` → `dist/`, served by Vercel and Netlify.

---

## Durable Architecture Facts

**Core data contract**
- `world[x][z]` — intent layer; `cellMeshes['x,z']` — render layer
- All mutations via `setCell(x, z, opts)` — never write `world[x][z]` directly outside init
- Sparse-safe reads via `getWorldCell()` / `ensureWorldCell()`

**Three.js r128 pinned.** No bundler, no npm runtime deps. Materials in `M.*` are shared across meshes — clone before mutating color. `disposeGroup()` disposes geometries but not shared materials.

**World schema** — `world.schema.json` (v4) formally describes the save format.

**Module map** (`engine/world/`) — 33 files: `00-prelude.js` through `31-cloud-sea.js` + `99-late-boot.js` + `assets/`. Extracted CSS: `styles/tiny-world.css` (~4,656 lines). Split workflow script: `.claude/workflows/split-god-file.js`.

**Build / test** — `npm test` = ESLint + HTMLHint. `npm run build` generates `dist/`. No runtime npm deps.

**House style** — Vanilla ES6+, semicolons, 2-space indent, trailing commas, single quotes. Section comments: `// -------- name --------`.

---

## Branch State

- **Active branch**: `refactor/split-god-file` — HEAD `e06314e` — **5 commits ahead of main, working tree clean**
- Recent commits: cloud-sea layer + soft sprite cloud style + UI toggle (`c330069`–`e06314e`), forward-reference fix (`3aa26ae`), god-file split (`fb8fbfb`)
- **main** at `d2485c9`; local main is ahead 5 of `origin/main` — not yet pushed
- `refactor/split-god-file` branched from `d2485c9`; merging back is a clean fast-forward

---

## Active Workflows / Capabilities

**Split-file architecture (complete)**
- All new feature work goes in `engine/world/` or `engine/landscape/`
- Skill routing table in AGENTS.md is authoritative for which skill covers what system
- 15 local skills registered under `.codex/skills/tinyworld-*`

**Deployment**
- `publish.sh` copies Three.js vendor files + HTML to `dist/`
- Vercel (`vercel.json`) and Netlify (`netlify.toml`) both serve from `dist/`

**External automation (OpenClaw)**
- VibeClaw scouting runs periodically; adds Explore items via API, no git push
- Tom Doerr tweet tracker: running via nitter RSS, X login wall blocks direct browser access
- VibeClaw Article Generator: **failing** — assistant turns produce no content on all recent runs
- MC Gateway (`894a3d5b-7faa-4c0a-a40f-69fbdee7b78d`): **failing** — connection refused on heartbeat
- VibeClaw Lead Ava (`c3f78d0c-abf3-45d5-898e-27cd1d95c0d1`): **healthy** — repeated HEARTBEAT_OK, no queued tasks

**CodeSurf Dream (active)**
- Daily cron: `0 12 * * *` UTC, scheduled 2026-05-28
- Skill file: `.claude/skills/codesurf-dreaming/SKILL.md`
- Writes to `.codesurf/DREAMING.md`; pre-write diff check skips spurious writes

**Codex desktop app (built 2026-05-28)**
- Bundle: `codex-app/desktop/out/Codex-darwin-arm64/Codex.app`
- Zip: `Codex-darwin-arm64-26.429.20946.zip`
- Two packaging fixes applied: `node-pty` spawn-helper explicit unpack in `forge.config.ts`, ad-hoc codesign for local macOS builds

---

## Open Threads

- **Merge `refactor/split-god-file` → main** and push both branches to origin
- **Update AGENTS.md** with `engine/world/` module paths, two missing skills, `world.schema.json` documentation
- **Voxel stamp instancing/merging** (`engine/world/21`) — highest-payoff GPU batching target
- **Properties Panel overhaul** — tabs, icon buttons, undo/redo, transform gizmo
- **Fix `voxels_liquid-mrdoob`** physics demo — lighting, frame-rate independence, ball→fluid impulse
- **MC Gateway cron failures** — diagnose connection-refused root cause
- **VibeClaw Article Generator failures** — all runs since 2026-05-29 produce empty assistant turns; fetch step suspected
- **Chrome/X.com + wacli/WhatsApp auth** — not yet resolved; blocks Tom Doerr direct feed access

---

## Recent Session Evidence

| Date | Source | Activity |
|------|--------|----------|
| 2026-05-29 | OpenClaw | Tom Doerr tracker: no new tweets; nitter RSS checked, state file timestamp updated |
| 2026-05-29 | OpenClaw | VibeClaw Article Generator: 3 cron runs, all empty assistant turns — failing |
| 2026-05-29 | OpenClaw | MC Gateway heartbeat: connection refused, all turns failed |
| 2026-05-29 | OpenClaw | VibeClaw Lead Ava: healthy HEARTBEAT_OK on multiple polls |
| 2026-05-29 | Codex | PONG connectivity test: gpt-5.5 responded correctly |
| 2026-05-28 | Codex | Codex desktop app built; two packaging fixes: node-pty spawn-helper + ad-hoc codesign |
| 2026-05-28 | OpenClaw | CodeSurf Dream skill created, scheduled daily, then improved with richer sources + structured output template |
| 2026-05-28 | tinyworld | Cloud-sea layer + sprite cloud style committed to `refactor/split-god-file` |
