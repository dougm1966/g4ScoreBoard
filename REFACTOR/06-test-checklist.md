# Manual Test Checklist (Control Panel)

Use this checklist after each refactor phase.

## Preconditions

- Clear console output visible (OBS browser source console or browser devtools).
- The control panel is loaded fresh.

## Player info

- Set Player 1 name and Player 2 name.
- Set Race info and Wager info.
- Click **Update Info**.
- Confirm browser source updates names and text.

## Player photos

- Upload Player 1 photo.
- Upload Player 2 photo.
- Confirm images preview in tooltip and appear in browser source.

## Colors

- Change P1 color and P2 color.
- Confirm colors apply and persist after reload.
- Click **Swap** and confirm both swap and persist.

## Scoring

- Click P1 +score and verify increment.
- Click P1 -score and verify decrement (no negative).
- Repeat for P2.
- Click **Reset** and confirm reset works.

## Shot clock

- Start 30s clock.
- Start 60s clock.
- Show/hide clock.
- Stop clock.
- Confirm extension buttons behave while clock is running.

## Extensions

- Click P1 extension and verify it locks (until reset).
- Click P2 extension and verify it locks (until reset).
- Reset extensions individually.

## Logos and slideshow

- Toggle Salotto Logo checkbox on/off.
- Toggle Custom Logo checkbox on/off.
- Upload right logo and left logo.
- Enable Sponsor Logos slideshow.
- Upload SL1, SL2, SL3.

## Appearance

- Theme dropdown cycles through themes and applies correctly.
- Size dropdown changes style.
- Opacity slider changes scoreboard opacity.

## Hotkeys

- Trigger each hotkey and verify the corresponding action occurs:
  - P1 score up/down
  - P2 score up/down
  - Reset
  - Extensions
  - 30/60 clock
  - Stop clock
  - Swap

## Pass/Fail criteria

- Pass only if:
  - No console errors
  - All features behave as before
  - No visual regressions that impact usability
