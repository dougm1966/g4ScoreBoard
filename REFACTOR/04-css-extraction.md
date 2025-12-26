# Phase 2 — CSS Extraction (Remove Inline Styles)

Goal: remove repeated inline styles from `control_panel.html` and move them into CSS classes.

## Where to put CSS

Prefer `common/css/control_panel/required.css` for shared layout utilities.

Do **not** change theme CSS unless needed.

## What to extract first (high repetition)

- Input styling
  - Font size
  - Widths (120px inputs, 30px numeric)
  - Background color (lightgrey)

- Layout utilities
  - `.cp-center` (centering container)
  - `.cp-row` (flex row)
  - `.cp-stack` (flex column)
  - `.cp-gap-sm/md/lg`

## Safety rules

- Keep the visual appearance as close as possible.
- Prefer adding classes over removing existing classes.
- Avoid changing existing theme classnames like `obs28`, `hover`, `blue28`.

## Acceptance criteria

- Inline style count reduced.
- UI still looks correct in all themes.
- `obsThemeChange()` still works.
- No console errors.

## Post-phase action

Run `06-test-checklist.md`.
