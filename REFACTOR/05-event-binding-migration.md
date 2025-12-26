# Phase 3 — Event Binding Migration (Optional)

Goal: remove inline `onclick`/`onchange` attributes and bind events in JS in a maintainable way.

This is optional and **higher risk** than Phase 1/2.

Status: NOT STARTED

Notes:
- `control_panel.html` currently still contains inline `onclick`/`onchange` handlers.

## Recommended migration strategy (compat-first)

1. Add `data-*` attributes to actionable controls while keeping IDs.
2. Add a single delegated click handler on a stable container (e.g. `#mainDiv`).
3. The handler routes actions to existing functions (`postScore`, `shotClock`, etc.).
4. Keep inline handlers temporarily.
5. Verify.
6. Remove inline handlers in a follow-up change.

## Why keep IDs even after migration

Other JS code (and possibly external overlays) may still depend on them.

## Suggested action mapping

Examples:

- Score buttons
  - `data-action="score" data-op="add" data-player="1"`
  - `data-action="score" data-op="sub" data-player="2"`

- Shot clock buttons
  - `data-action="shotclock" data-ms="31000"`

- Toggle buttons
  - `data-action="clockDisplay" data-mode="show"`

## DOM readiness note

`control_panel_post.js` currently binds handlers at top-level and assumes elements exist.

If you change script placement or want to modernize this JS, you must wrap bindings in:

- `window.addEventListener('DOMContentLoaded', ...)`

…but that is a behavior-touching change and should be tested carefully.

## Acceptance criteria

- All controls work with inline handlers removed.
- No duplicated handler effects (no double increments).
- No console errors.

## Post-phase action

Run `06-test-checklist.md`.
