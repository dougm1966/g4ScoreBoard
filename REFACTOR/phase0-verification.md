# Phase 0 Verification Report

Generated: 2025-12-25

## Backup Files Created

- [x] `control_panel.html.bak` (13506 bytes)
- [x] `common/js/control_panel.js.bak` (30707 bytes)
- [x] `common/js/control_panel_post.js.bak` (12023 bytes)
- [x] `common/css/control_panel/required.css.bak` (5861 bytes)

## DOM Contract Verification

### Required IDs (from 02-dom-contract.md)

#### Player Inputs
- [x] `p1Name` - line 34
- [x] `p2Name` - line 35
- [x] `raceInfoTxt` - line 36
- [x] `wagerInfoTxt` - line 37
- [x] `p1PhotoBtn` - line 34
- [x] `p2PhotoBtn` - line 35
- [x] `FileUploadP1Photo` - line 34
- [x] `FileUploadP2Photo` - line 35
- [x] `p1PhotoImg` - line 34
- [x] `p2PhotoImg` - line 35

#### Player Color Controls
- [x] `p1colorDiv` - line 41
- [x] `p2colorDiv` - line 58

#### Score Controls
- [x] `sendP1Score` - line 76
- [x] `sendP2Score` - line 77
- [x] `sendP1ScoreSub` - line 79
- [x] `sendP2ScoreSub` - line 80
- [x] `resetBtn` - line 89

#### Shot Clock Controls
- [x] `shotClock30` - line 82
- [x] `shotClock60` - line 83
- [x] `shotClockShow` - line 84
- [x] `stopClockDiv` - line 88
- [x] `clockLocalDisplay` - line 85

#### Extension Controls
- [x] `p1extensionBtn` - line 86
- [x] `p2extensionBtn` - line 87
- [x] `p1ExtReset` - line 90
- [x] `p2ExtReset` - line 91

#### Settings Controls
- [x] `allCheck` - line 93
- [x] `useClockSetting` - line 93
- [x] `useSalottoSetting` - line 93
- [x] `customLogo` - line 94
- [x] `logoSlideshowChk` - line 112
- [x] `logoName` - line 94
- [x] `salllogoName` - line 93

#### Logo Upload Controls
- [x] `settingsBox2` - line 99
- [x] `settingsBox4` - line 104
- [x] `FileUploadL0` - line 100
- [x] `FileUploadL4` - line 105
- [x] `l0Img` - line 101
- [x] `l4Img` - line 106

#### Slideshow Upload Controls
- [x] `logoSsImg1` - line 114
- [x] `logoSsImg2` - line 117
- [x] `logoSsImg3` - line 120
- [x] `FileUploadL1` - line 114
- [x] `FileUploadL2` - line 117
- [x] `FileUploadL3` - line 120
- [x] `l1Img` - line 115
- [x] `l2Img` - line 118
- [x] `l3Img` - line 121

#### Theme/Style/Opacity
- [x] `scoreOpacity` - line 125
- [x] `bsStyle` - line 128
- [x] `scoreValue` - line 135
- [x] `obsTheme` - line 137
- [x] `verNum` - line 147
- [x] `updateStatus` - line 148

### Critical Order Dependencies

#### `<select>` Order (MUST BE PRESERVED)
1. `p1colorDiv` (line 41) - First select
2. `p2colorDiv` (line 58) - Second select
3. `bsStyle` (line 128) - Third select
4. `obsTheme` (line 137) - Fourth select

**JS references:**
- `document.getElementsByTagName("select")[0]` = p1colorDiv
- `document.getElementsByTagName("select")[1]` = p2colorDiv

#### Stylesheet Order (MUST BE PRESERVED)
1. `yami.css` (line 13) - styleSheets[0]
2. `dark.css` (line 14) - styleSheets[1]
3. `acri.css` (line 15) - styleSheets[2]
4. `grey.css` (line 16) - styleSheets[3]
5. `light.css` (line 17) - styleSheets[4]
6. `rachni.css` (line 18) - styleSheets[5]
7. `required.css` (line 19) - styleSheets[6]

**JS references:**
- `obsThemeChange()` toggles `document.styleSheets[0..5].disabled`

#### Script Load Order (MUST BE PRESERVED)
1. Inline version script (line 21-25)
2. `jquery.js` (line 26)
3. `control_panel.js` (line 27)
4. `hotkeys.js` (line 28)
5. ... body content ...
6. `control_panel_post.js` (line 150) - MUST stay at end of body

## Verification Status

**All IDs present:** YES
**Select order correct:** YES
**Stylesheet order correct:** YES
**Script order correct:** YES

## Ready for Phase 1: YES
