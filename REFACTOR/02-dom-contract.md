# DOM Contract (Do Not Break)

The existing JS references DOM nodes directly. Treat the following as a **public API**.

## Required IDs referenced by JS

From `common/js/control_panel.js` and `common/js/control_panel_post.js`:

- Player inputs
  - `p1Name`, `p2Name`
  - `raceInfoTxt`, `wagerInfoTxt`
  - `p1PhotoBtn`, `p2PhotoBtn`
  - `FileUploadP1Photo`, `FileUploadP2Photo`
  - `p1PhotoImg`, `p2PhotoImg`

- Player color controls
  - `p1colorDiv`, `p2colorDiv`

- Score controls
  - `sendP1Score`, `sendP2Score`
  - `sendP1ScoreSub`, `sendP2ScoreSub`
  - `resetBtn`

- Shot clock controls
  - `shotClock30`, `shotClock60`
  - `shotClockShow`
  - `stopClockDiv`
  - `clockLocalDisplay`

- Extension controls
  - `p1extensionBtn`, `p2extensionBtn`
  - `p1ExtReset`, `p2ExtReset`

- Settings controls
  - `allCheck`
  - `useClockSetting`
  - `useSalottoSetting`
  - `customLogo`
  - `logoSlideshowChk`
  - `logoName`, `salllogoName`

- Logo upload controls
  - `settingsBox2`, `settingsBox4`
  - `FileUploadL0`, `FileUploadL4`
  - `l0Img`, `l4Img`

- Slideshow upload controls
  - `logoSsImg1`, `logoSsImg2`, `logoSsImg3`
  - `FileUploadL1`, `FileUploadL2`, `FileUploadL3`
  - `l1Img`, `l2Img`, `l3Img`

- Theme / style / opacity
  - `scoreOpacity`
  - `bsStyle`
  - `scoreValue`
  - `obsTheme`
  - `verNum`
  - `updateStatus`

## Critical order dependencies

### `<select>` order dependency

`common/js/control_panel.js` and `control_panel_post.js` use:

- `document.getElementsByTagName("select")[0]`
- `document.getElementsByTagName("select")[1]`

These are assumed to be:

1. `p1colorDiv`
2. `p2colorDiv`

**Therefore:**

- Do not add any new `<select>` elements before the color pickers unless JS is updated.

### Stylesheet order dependency

`obsThemeChange()` toggles styles using:

- `document.styleSheets[0..5].disabled = true/false`

This assumes the `<head>` contains the theme CSS links in the same order.

**Therefore:**

- Do not reorder the existing `<link rel="stylesheet">` tags unless you also rewrite `obsThemeChange()` to target stylesheets by href.

## Script load/DOM readiness dependency

`control_panel_post.js` calls `document.getElementById(...)` at top-level (not inside DOMContentLoaded).

**Therefore:**

- Keep `<script src="./common/js/control_panel_post.js"></script>` at the end of `<body>` (after the elements exist), unless you refactor that JS to wait for DOM ready.
