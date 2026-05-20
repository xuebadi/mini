# Tinyworld Workspace — Generated Dream Memory

_Last consolidated: 2026-05-20_

---

## Overview

**tinyworld** is a single-file, no-bundler 3D world builder delivered as `tiny-world-builder.html`. Three.js **r128** and GLTFLoader are self-hosted under `vendor/three/` and copied to `dist/` by `publish.sh`. Deployments target Vercel and Netlify from the same static `dist/` output. The app is feature-rich (~16k LoC as of last session).

---

## Durable Architecture Facts

- **Single-file constraint is intentional** — no npm runtime deps, no bundler. All CSS in `<style>`, all JS in one `<script>` block at the bottom.
- **Two parallel data structures** must stay in sync:
  - `world[x][z]` — intent layer `{ terrain, terrainFloors, kind, floors, buildingType, fenceSide, extras }`
  - `cellMeshes['x,z']` — render layer `{ tile: Group, object: Group|null }`
  - **Always mutate via `setCell(x, z, opts)`** — never write `world[x][z]` directly outside init.
- **Storage**: `STORAGE_KEY = 'tinyworld:v1'`, `STORAGE_VERSION = 4`.
- **Three.js r128 is pinned.** `MeshLambertMaterial`, `ExtrudeGeometry`, and shadow setup assume r128 semantics. Do not bump casually.
- **Shared materials** in `M.*` — clone before mutating color; do not dispose shared materials.
- `disposeGroup()` disposes geometries but not materials. Smoke particles clone and dispose their own material — follow that pattern for any unique-material-per-instance need.
- **`userData.landing`** guards prevent drop-in animations from conflicting with per-frame object animations. Never remove those checks.
- Camera references: `orthoCam`, `softCam`, `persCam`; `camera` is a swapped reference controlled by `togglePerspective()` / `setCameraMode()`.
- Grid size: 8×8 default (`HOME_GRID_MAX`), up to 48×48 in settings. Large grids require progressive rendering — avoid broad synchronous rebuilds.

---

## LandscapeEngine — Active Feature (Recently Worked, Uncommitted)

`LandscapeEngine.js` is a separate module providing continuous terrain rendering distinct from the tile-based grid. Key behavioral rules:

- LandscapeEngine is **opt-in only** via `Terrain style = Landscape`. Low-poly and voxel generation dispose LandscapeEngine and rebuild normal tile/object worlds.
- In LandscapeEngine mode, discrete base tile meshes do **not** render — `removeLandscapeLegacyMeshes()` cleans them up.
- Hover, selection overlays, ghost preview, picking, crowd height, objects, and extras all project onto `landscapeHeightAtCell(...)`.
- `landscapeGhostBoardsSuppressed` flag prevents legacy ghost/preview boards from appearing in landscape mode.
- Free camera target panning is enabled in landscape mode via `clampTargetToHomeBoard`.
- Dynamic terrain bounds expand up to 48×48 on first panning move (`expandVisibleSizeOnFirstMove`).
- Continuous landscape bounds are linked to the "Preview distance" (`renderVisibleDistance`) setting.
- **Two render modes inside LandscapeEngine**:
  - `Low-poly (Cel)` — uses `sandMatLowPoly` cel shader; shadows excluded to preserve low-poly look.
  - `Realistic` — uses vertex-color Lambert material; receives shadows; near rocks/flora cast and receive shadows; far LOD terrain stays non-shadowed for GPU budget; participates in `scene.fog`.
- **Soft edge fading**: `sandMatLowPoly`, `sandMat`, `terrainMat` (via `onBeforeCompile`), and `waterMat` all fade color and opacity near clip boundaries.
- **Pixel outline fix**: `landscapeMeshEngine._clipPlanes` copied to `pixelState.normalMaterial.clippingPlanes` inside `renderScene` to prevent outline ghosts of clipped landscape tiles.

### Modified files (uncommitted as of last session)

- `tiny-world-builder.html` — landscape integration, shadow/fog, clip fixes, edge fading
- `LandscapeEngine.js` — terrain mesh mode, soft-edge clipping, dynamic panning
- `.codex/skills/tinyworld-tile-variation/SKILL.md` — LandscapeEngine mode notes added
- `.codex/skills/tinyworld-render-performance/SKILL.md` — shadow/fog and low-poly shader preservation guidance added
- `.codex/skills/tinyworld-opacity-torch/SKILL.md` — updated
- `status.MD` — session log

---

## Repo-Local Skills

All skills live in `.codex/skills/<name>/SKILL.md`. Read the relevant skill before touching the matching system; update it when a durable pattern is established.

| Skill | System covered |
|---|---|
| `tinyworld-single-file` | Repo workflow, single-file constraints |
| `tinyworld-auto-batching` | Auto palette inference / cache behavior |
| `tinyworld-opacity-torch` | Ghost boards, panning, opacity torch |
| `tinyworld-tile-variation` | Repeat-click levels, terrain/object variation; LandscapeEngine notes |
| `tinyworld-visual-qa` | Browser checks and visual QA |
| `tinyworld-render-performance` | Renderer, shadows, clouds, GPU budget; shadow/fog and low-poly shader preservation |
| `tinyworld-webxr` | WebXR AR desk placement, VR immersion, headset input |
| `tinyworld-crowd-layer` | 2.5D people sprites at 3D map coordinates |
| `tinyworld-lowpoly-world-prompt` | Model prompting for coherent low-poly worlds |
| `tinyworld-lowpoly-stylized-3d` | Low-poly asset design, imports, materials, scale, animation |
| `tinyworld-integrations` | API, webhook, SSE, MCP, plugin, automation examples |
| `tinyworld-ghost-world-gen` | Ghost world generation |
| `threejs-primitive-reconstructor` | Three.js primitive reconstruction patterns |

---

## Active Background Automation (OpenClaw)

Machine-level daemons — not tinyworld-specific but affect the environment.

- **Keepalive** (every 30 min) — confirms `/Users/jkneen/clawd/memory/` exists. HEARTBEAT_OK.
- **System Health Check** (every 30 min) — disk ~12% used, load avg ~1.8–1.9, no memory pressure. HEARTBEAT_OK.
- **Daily Digest** (4 PM) — light activity reported; dev environment healthy, no urgent items, no active todos. HEARTBEAT_OK.
- **Urgent Email Alert** — previously had 4 consecutive failed turns; now recovered and reporting HEARTBEAT_OK. No urgent emails detected.
- **Tom Doerr Tweet Tracker** — Nitter is still down; no tweets fetched. HEARTBEAT_OK.
- **VibeClaw Skills Scout** (periodic) — Nitter down; npm and HuggingFace sources functional; no new qualifying skills this cycle. HEARTBEAT_OK.
- **Lead agent "Ava"** (board `c3f78d0c-abf3-45d5-898e-27cd1d95c0d1`) — heartbeat polling HEARTBEAT_OK. No board task work in recent cycles.
- **MC Gateway** (`894a3d5b-7faa-4c0a-a40f-69fbdee7b78d`) — **persistently unhealthy**: repeated `[assistant turn failed before producing content]` and connection refused on every poll. Do not rely on gateway-dependent work until resolved.

---

## Open Threads

- **Uncommitted LandscapeEngine work** — `tiny-world-builder.html`, `LandscapeEngine.js`, and skill files have local modifications not yet committed. Verify and commit before branching new work.
- **Visual QA pending for LandscapeEngine** — browser checks still needed: fixed board/no outlines, auto-expand panning, low-poly/voxel legacy rendering, Cel vs Realistic modes, pixel outline mode, dynamic bounds, soft gradient boundary fade.
- **MC Gateway is broken** — root cause unknown; connection refused on every heartbeat poll. Investigate before relying on gateway-dependent work.
- **Nitter is down** — VibeClaw Skills Scout and Tom Doerr Tweet Tracker both fall back to non-Nitter sources (npm, HuggingFace).
- **Tool-schema API error** (`request.tools.82.type: Invalid`) observed in a prior Codex session — caused Claude Agent SDK bridge to exit; root cause unresolved upstream.
- **No open todos** — slate is clear for new work.
- **`tiny-world-builder BACKUP.html`** — if this local snapshot exists, do not auto-update it.

---

## Pre-flight Checklist (Before Declaring Done)

- `npm test` passes (`npm run check` → ok; `npm run smoke` → smoke ok)
- Page loads with no console errors
- Tool keyboard shortcuts (`1`–`9`, `E`) work
- `R` / `F` raise/lower terrain; reset restores preset village; `C` clears to grass with drop-in
- Perspective ⇄ ortho toggles cleanly
- Fences update neighbor geometry on place/erase
- House clusters render as L/T/+/square appropriately
- Smoke spawns from chimneys after landing completes
