# Backup and Rollback Procedure

This project has tight coupling between HTML and JS. **Before any refactor work**, create backups.

## Files that are typically touched

- `control_panel.html`
- `common/js/control_panel.js`
- `common/js/control_panel_post.js`
- `hotkeys.js` (usually not changed during refactor)
- `common/css/control_panel/required.css` (or whichever CSS is chosen as the base for refactor classes)

## Backup naming convention

Prefer a simple `.bak` copy beside the file so rollback is trivial.

Examples:

- `control_panel.html.bak`
- `common/js/control_panel.js.bak`
- `common/js/control_panel_post.js.bak`
- `common/css/control_panel/required.css.bak`

Alternative: timestamped backups if you expect multiple iterations:

- `control_panel.html.bak.2025-12-25_1520`

## Rollback steps

- If any control panel feature breaks or console errors appear:
  - Restore the `.bak` files to original names.
  - Reload the OBS browser source.
  - Re-test.

## “Safe refactor” rules

- Only change **one** of the following per iteration:
  - HTML structure
  - CSS extraction
  - JS event wiring

Mixing them increases blast radius and makes debugging difficult.
