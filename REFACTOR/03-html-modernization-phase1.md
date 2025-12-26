# Phase 1 — HTML Modernization (Structure Only)

Goal: make `control_panel.html` maintainable **without changing behavior**.

## Golden rules

- Keep all existing `id` values.
- Keep existing inline `onclick` / `onchange` attributes in this phase.
- Keep `<select>` ordering (color pickers must remain the first two selects).
- Keep theme stylesheet `<link>` ordering.
- Keep `control_panel_post.js` script tag at the bottom of `<body>`.

## Target improvements

- Replace deprecated / invalid markup
  - Replace `<center>` with `<div class="cp-center">` wrapper.
  - Replace `<text>` with `<span>`.
  - Fix malformed tags (example in current file: broken `<p style="font-size:5px" /p>`).

- Replace spacer hacks
  - Remove `<p style="font-size:...">&nbsp;</p>` spacing hacks.
  - Use stable containers:
    - `.cp-stack` (vertical column)
    - `.cp-row` (horizontal row)
    - `.cp-gap-*` (consistent spacing)

- Improve readability
  - Group controls into semantic blocks:
    - Player info
    - Colors
    - Scoring
    - Shot clock
    - Settings + uploads
    - Theme/size/opacity

## Suggested structure (example)

- `#mainDiv`
  - `.cp-center`
    - `<section id="playerInfo">...</section>`
    - `<section id="colors">...</section>`
    - `<section id="scoring">...</section>`
    - `<section id="shotClock">...</section>`
    - `<section id="settings">...</section>`
    - `<section id="appearance">...</section>`

**Note:** sections may have IDs, but these are optional and should not conflict with existing IDs.

## Acceptance criteria

- UI renders and functions identically.
- All controls work.
- No console errors.
- No DOM nodes with required IDs removed.

Status: COMPLETED (see `phase1-verification.md`).

## Post-phase action

Run `06-test-checklist.md`.
