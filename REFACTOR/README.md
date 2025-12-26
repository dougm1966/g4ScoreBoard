# g4ScoreBoard Refactor Runbook (AI Assistant)

This folder contains **implementation documentation** for refactoring `g4ScoreBoard` into a more maintainable, modern structure **without breaking existing behavior**.

## Scope (what this refactor is / is not)

- **In-scope**
  - Modernize `control_panel.html` structure and styling to make it editable.
  - Reduce inline styles and layout hacks.
  - Optionally migrate inline HTML event handlers to JS **safely**.
  - Preserve existing UX/behavior for OBS usage.

- **Out-of-scope (unless explicitly requested)**
  - Changing scoreboard feature behavior or BroadcastChannel message schema.
  - Introducing build tooling (webpack/vite) or frameworks.
  - Renaming public IDs/classes relied on by existing JS.

## Non-negotiable constraints (do not break)

- **DOM IDs are a public API** for this project.
  - `common/js/control_panel.js` and `common/js/control_panel_post.js` directly reference many `id`s.
  - Changing/removing IDs will break features.

- **Order dependencies exist**
  - `document.getElementsByTagName("select")[0]` and `[1]` assume the **first two** `<select>` elements are the player color pickers.
  - `document.styleSheets[0..5]` assumes the `<link rel="stylesheet">` order in `<head>`.

- **Load order matters**
  - `control_panel_post.js` reads elements immediately (e.g. `var slider = document.getElementById("scoreOpacity");`).
  - Do not move script tags earlier unless code is updated accordingly.

## Authoritative files (current)

- **Control panel UI**: `control_panel.html`
- **Control panel logic**:
  - `common/js/control_panel.js` (functions)
  - `common/js/control_panel_post.js` (onload wiring + BroadcastChannel receive)
- **Hotkeys state file**: `hotkeys.js`
- **Control panel base CSS**: `common/css/control_panel/required.css` (and theme styles)

## Phased implementation strategy

### Phase 0 — Safety + mapping (must do first)

- Create backups of every file you touch.
- Produce a DOM contract map (IDs, selects ordering, stylesheets ordering).

See: `01-backup-and-rollback.md`, `02-dom-contract.md`.

### Phase 1 — Structure-only HTML modernization (lowest risk)

Goal: make `control_panel.html` readable and editable while preserving behavior.

- Keep all existing `id` values.
- Keep existing inline `onclick` / `onchange` temporarily.
- Replace:
  - `<center>` with wrapper + CSS centering
  - invalid `<text>` elements with `<span>`
  - spacer hacks (`<p style="font-size:...">&nbsp;</p>`) with consistent spacing classes
  - malformed markup (e.g. broken `<p ... /p>`)

See: `03-html-modernization-phase1.md`.

### Phase 2 — Move inline styles to CSS (low to medium risk)

- Introduce stable utility classes (inputs, rows, spacing).
- Replace repeated inline styles with classes.
- Keep visual output equivalent.

See: `04-css-extraction.md`.

### Phase 3 — Event handler migration (optional, medium risk)

- Add JS event delegation while leaving inline attributes intact.
- Verify everything.
- Then remove inline handlers in a follow-up commit.

See: `05-event-binding-migration.md`.

## Verification checklist (must pass)

Manual test all controls in OBS (or browser if equivalent):

- Names + Update Info
- Player photo uploads
- Colors + swap
- Score + / -
- Shot clocks (30/60, show/hide, stop)
- Extensions + resets
- Logo toggles + logo uploads + slideshow
- Theme + size + opacity slider
- Hotkeys still trigger actions
- No console errors

See: `06-test-checklist.md`.

## Change management guidance (recommended)

- Keep changes small and reviewable.
- One phase per commit.
- After each phase, run the verification checklist.

## Quick start for an AI agent

1. Read `02-dom-contract.md` and do **not** violate it.
2. Make backups per `01-backup-and-rollback.md`.
3. Implement Phase 1 from `03-html-modernization-phase1.md`.
4. Run `06-test-checklist.md`.
5. Only then proceed to Phase 2/3.
