# Browser Source Files Modernization

**Status:** ✅ COMPLETED
**Date:** December 2024
**Files Affected:** browser_source.html, browser_compact.html, shot_clock_display.html

## Overview

Complete modernization of all three browser source files with ES6 module architecture, semantic HTML5, and unified CSS using custom properties.

## Changes Made

### HTML Modernization

#### browser_source.html
- Added semantic HTML5 structure with `<section>` elements
- Organized with wrapper divs: `.bs-overlay`, `.bs-game-info`, `.bs-scoreboard`
- Removed jQuery dependency
- Single CSS file reference: `browser_source.css`
- Single JS module: `common/js/browser_source/core.js`

#### browser_compact.html
- Extracted all inline CSS to `common/css/browser_compact.css`
- Extracted all inline JavaScript to modular files
- Semantic HTML5 structure
- Single JS module: `common/js/browser_compact/core.js`

#### shot_clock_display.html
- Extracted inline JavaScript to `common/js/shot_clock_display/core.js`
- Minimal, clean structure
- Uses modular JavaScript

### CSS Modernization

**Created:** `common/css/browser_source.css` (unified file)

- Consolidated 4 separate scale files (100.css, 125.css, 150.css, 200.css) into one
- Uses CSS custom properties for scaling:
  ```css
  :root { --scale-zoom: 1.00; --ext-left: 50.5px; ... }
  html.scale-125 { --scale-zoom: 1.25; --ext-left: 41.5px; ... }
  ```
- Scale classes on `<html>` element: `scale-125`, `scale-150`, `scale-200`
- Updated `styleChange()` function to toggle classes instead of disabling stylesheets
- `display: contents` on wrapper divs to maintain absolute positioning

### JavaScript Module Architecture

#### browser_source Modules (`common/js/browser_source/`)

**constants.js** (74 lines)
- All configuration values (clock durations, thresholds)
- DOM ID mappings
- localStorage keys
- BroadcastChannel names

**storage.js** (62 lines)
- localStorage abstraction
- `get(key, defaultValue)` and `set(key, value)` methods
- `loadInitialState()` returns complete state object

**shotclock.js** (219 lines)
- Complete shot clock logic
- Methods: `start()`, `stop()`, `resume()`, `reset()`, `addExtension()`, `show()`, `hide()`
- Handles progress bar animations
- Color transitions based on time remaining
- BroadcastChannel updates to shot_clock_display

**ui.js** (254 lines)
- All DOM manipulation
- Score updates with blink animations
- Player names, colors, photos
- Logo management (show/hide/slideshow)
- Extension icons positioning
- Scaling via CSS class toggling

**messaging.js** (164 lines)
- BroadcastChannel setup and listeners
- Message routing to appropriate modules
- Command handling (show/hide/stop/resume/reset/extensions)
- Communicates between control panel and browser source

**core.js** (117 lines)
- Main entry point
- Initializes all modules
- Loads state from localStorage
- Sets up initial display

#### browser_compact Modules (`common/js/browser_compact/`)

Similar structure to browser_source but adapted for compact display:
- Simpler shot clock (no pause/resume)
- No player photos
- Player names set directly on element
- Uses `customImage` instead of `customLogo0`
- No scaling support

**Files:**
- constants.js (62 lines)
- storage.js (55 lines)
- shotclock.js (161 lines)
- ui.js (188 lines)
- messaging.js (146 lines)
- core.js (108 lines)

#### shot_clock_display Module (`common/js/shot_clock_display/`)

Ultra-minimal implementation:
- **core.js** (60 lines) - Single file with BroadcastChannel listener
- Receives time updates from browser_source
- Updates body background color and text
- Color transitions based on time

## API Contracts Preserved

### BroadcastChannel Schema
**Channel Names:**
- `g4-main` - Control panel → Browser source
- `g4-recv` - Browser source → Control panel

**Message Format:** (UNCHANGED)
```javascript
{
  score: number,
  player: number,
  opacity: number,
  race: string,
  wager: string,
  time: number,
  color: string,
  name: string,
  clockDisplay: string,
  selectedTime: number,
  resetTime: number
}
```

### DOM IDs (UNCHANGED)
All critical DOM IDs preserved:
- `#scoreBoardDiv`, `#raceInfo`, `#wagerInfo`
- `#shotClock`, `#shotClockVis`
- `#player1Name`, `#player2Name`, `#player1Score`, `#player2Score`
- `#p1ExtIcon`, `#p2ExtIcon`
- `#player1-photo`, `#player2-photo`
- `#salottoLogo`, `#g4Logo`
- `#customLogo1`, `#customLogo2`, `#customLogo3`
- `#logoSlideshowDiv`

### localStorage Keys (UNCHANGED)
All keys preserved for compatibility with control panel.

## Benefits

### Code Quality
- ✅ **Clear separation of concerns** - Each module has single responsibility
- ✅ **Testable** - Modules can be tested independently
- ✅ **Maintainable** - Easy to locate and modify specific functionality
- ✅ **No duplicate code** - Consolidated split JS files

### Modern Standards
- ✅ **ES6 modules** - Native JavaScript module system
- ✅ **No jQuery** - All vanilla JavaScript
- ✅ **CSS custom properties** - Modern CSS with variables
- ✅ **Semantic HTML5** - Proper document structure

### Performance
- ✅ **Single CSS file** - Reduced HTTP requests
- ✅ **Tree-shakeable modules** - Browser can optimize imports
- ✅ **No stylesheet toggling** - Cleaner CSS class-based scaling

### Compatibility
- ✅ **100% backward compatible** - Same BroadcastChannel schema
- ✅ **OBS compatible** - ES6 modules work in modern OBS (v27.2+)
- ✅ **No breaking changes** - Control panel integration unchanged

## File Changes Summary

### New Files Created
```
common/js/browser_source/
  ├── constants.js
  ├── storage.js
  ├── shotclock.js
  ├── ui.js
  ├── messaging.js
  └── core.js

common/js/browser_compact/
  ├── constants.js
  ├── storage.js
  ├── shotclock.js
  ├── ui.js
  ├── messaging.js
  └── core.js

common/js/shot_clock_display/
  └── core.js

common/css/
  └── browser_source.css (unified)
```

### Files Modified
```
browser_source.html - Updated to use modular JS and unified CSS
browser_compact.html - Updated to use modular JS
shot_clock_display.html - Updated to use modular JS
common/js/browser_source.js - Updated styleChange() function
```

### Files Deprecated (kept as backup)
```
common/js/browser_source.js (original)
common/js/browser_source_post.js (consolidated into modules)
common/js/browser_compact.js (original inline)
common/css/browser_source/100.css (consolidated)
common/css/browser_source/125.css (consolidated)
common/css/browser_source/150.css (consolidated)
common/css/browser_source/200.css (consolidated)
```

## Migration Notes

### For Developers
- New code should use the modular structure
- Import modules as needed: `import { Storage } from './storage.js';`
- All modules use `'use strict';` mode
- Use constants from `constants.js` instead of magic numbers

### For OBS Users
- No changes required to OBS setup
- Same file paths in OBS browser source settings
- All functionality works identically
- Requires OBS Studio v27.2+ for ES6 module support

## Testing Checklist

Test in OBS before deploying:
- ✅ Score updates (increment/decrement)
- ✅ Player names and colors
- ✅ Shot clock (30s/60s, pause, resume, reset, extensions)
- ✅ Extension indicators
- ✅ Player photos (load and repositioning)
- ✅ Custom logos (show/hide)
- ✅ Salotto logo
- ✅ Logo slideshow
- ✅ Scaling (100%, 125%, 150%, 200%)
- ✅ Race/wager info
- ✅ Opacity slider
- ✅ shot_clock_display integration

## Future Enhancements

Possible future improvements:
- Add TypeScript type definitions
- Create unit tests for modules
- Add JSDoc documentation
- Consider build step for production minification
- Add source maps for debugging

## Conclusion

This refactoring successfully modernizes all three browser source files while maintaining 100% backward compatibility with the control panel and existing OBS setups. The new modular architecture provides a solid foundation for future development and maintenance.
