# Layout Goals (from `upgrages.md`)

This document captures intended UI layout improvements so an AI agent can implement them *after* Phase 1 modernization.

## Score buttons — reorganize by action

Current: each player has +1/-1 stacked vertically.

Target grouping:

- Row 1: `[ P1 +Score ] [ P2 +Score ]`
- Row 2: `[ P1 -Score ] [ P2 -Score ]`

Constraints:

- Keep IDs:
  - `sendP1Score`, `sendP2Score`
  - `sendP1ScoreSub`, `sendP2ScoreSub`

## Shot clock row — 3 buttons side by side

Current: cramped / abbreviated labels.

Target:

- One row with:
  - `30s Shot Clock` (`shotClock30`)
  - `60s Shot Clock` (`shotClock60`)
  - `Show/Hide Clock` (`shotClockShow`)

Constraints:

- Keep IDs and existing behavior.
- `clockSetting()` toggles `noShow` class on these IDs; structure may change but IDs must remain.

## General goal

- Use consistent row/column layout classes instead of spacer hacks.
- Keep everything testable via `06-test-checklist.md`.
