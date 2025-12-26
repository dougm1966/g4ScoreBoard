# Browser Source DOM Contract (Do Not Break)

The existing JavaScript references DOM nodes directly. Treat the following as a **public API**.

## Required IDs referenced by JavaScript

### browser_source.html / browser_compact.html

**Scoreboard Container:**
- `scoreBoardDiv` - Main scoreboard container

**Game Info:**
- `raceInfo` - Race/match info display
- `wagerInfo` - Wager info display

**Shot Clock:**
- `shotClock` - Time display element
- `shotClockVis` - Progress bar element

**Player Names:**
- `player1Name` - Player 1 name cell
- `player2Name` - Player 2 name cell

**Player Scores:**
- `player1Score` - Player 1 score cell
- `player2Score` - Player 2 score cell

**Extension Indicators:**
- `p1ExtIcon` - Player 1 extension indicator
- `p2ExtIcon` - Player 2 extension indicator

**Player Photos:**
- `player1-photo` - Player 1 photo image
- `player2-photo` - Player 2 photo image

**Logos:**
- `salottoLogo` - Salotto logo image
- `g4Logo` - G4/Custom logo image
- `customLogo1` - Slideshow logo 1
- `customLogo2` - Slideshow logo 2
- `customLogo3` - Slideshow logo 3
- `logoSlideshowDiv` - Slideshow container

**Score Table:**
- `scoreBoard` - Main score table element

### shot_clock_display.html

**Shot Clock Display:**
- No required DOM IDs (the implementation writes directly to `document.body`).

## Required Classes

### Animation State Classes
- `.fadeInElm` - Fade in animation state
- `.fadeOutElm` - Fade out animation state
- `.noShow` - Hidden state

### Effect Classes
- `.winBlink` - Score blink animation
- `.shotRed` - Shot clock red state
- `.extBlink` - Extension indicator blink
- `.clockActive` - Player photo repositioning when clock active

### Component Classes
- `.playerPhoto` - Player photo styling
- `.playerNameText` - Player name text wrapper
- `.logoSlide` - Logo slideshow slide
- `.fade` - Logo fade class
- `.mySlides` - Slideshow slide class
- `.shotclockvis` - Shot clock progress bar
- `.slideshow-container` - Slideshow container

### Layout Classes (New)
- `.bs-overlay` - Browser source overlay container
- `.bs-game-info` - Game info section
- `.bs-scoreboard` - Scoreboard section
- `.bs-logos` - Logo container
- `.bs-extensions` - Extension indicators container
- `.bs-logo` - Individual logo
- `.bs-ext-icon` - Extension icon
- `.bs-player-name` - Player name cell
- `.bs-score` - Score cell
- `.bs-clock-display` - Clock display cell
- `.bs-score-table` - Score table

## CSS Architecture Dependencies

### Stylesheet Loading Order
The stylesheets must be loaded in this order for `styleChange()` to work:
1. `100.css` - document.styleSheets[0]
2. `125.css` - document.styleSheets[1]
3. `150.css` - document.styleSheets[2]
4. `200.css` - document.styleSheets[3]

**Why:** The `styleChange(n)` function uses `document.styleSheets[0..3]` array indices to toggle between scaling options.

**Alternative:** Refactor `styleChange()` to target stylesheets by href or data attribute instead of index.

## BroadcastChannel Contract

### Channels
- `g4-main` - Receives commands from control panel
- `g4-recv` - Sends responses back to control panel

### Message Schema (DO NOT CHANGE)

**Score Updates:**
- `event.data.score` - Score value
- `event.data.player` - Player number (1 or 2)

**Opacity:**
- `event.data.opacity` - Opacity value (0-1)

**Game Info:**
- `event.data.race` - Race/match info text
- `event.data.wager` - Wager info text

**Shot Clock:**
- `event.data.time` - Shot clock duration (31000 or 61000 milliseconds)
- `event.data.selectedTime` - Selected time for display
- `event.data.resetTime` - Reset time duration

**Player Info:**
- `event.data.color` - Player color value
- `event.data.name` - Player name
- `event.data.player` - Player number (1 or 2)

**Clock Display Commands:**
- `event.data.clockDisplay` - Command string with values:
  - `"show"` - Show clock
  - `"hide"` - Hide clock
  - `"stopClock"` - Pause clock
  - `"resumeClock"` - Resume paused clock
  - `"resetClock"` - Reset clock to initial state
  - `"noClock"` - Disable clock (hide extensions, reposition photos)
  - `"useClock"` - Enable clock (show extensions, reposition photos)
  - `"p1extension"` - Add 30s extension for player 1
  - `"p2extension"` - Add 30s extension for player 2
  - `"p1ExtReset"` - Reset player 1 extension indicator
  - `"p2ExtReset"` - Reset player 2 extension indicator
  - `"hidesalotto"` - Hide Salotto logo
  - `"showsalotto"` - Show Salotto logo
  - `"hidecustomLogo"` - Hide custom logo
  - `"showcustomLogo"` - Show custom logo
  - `"postLogo"` - Load logos from localStorage
  - `"postPlayerPhoto"` - Load player photos from localStorage
  - `"logoSlideShow-show"` - Start logo slideshow
  - `"logoSlideShow-hide"` - Stop logo slideshow
  - `"style100"` - Switch to 100% scaling
  - `"style125"` - Switch to 125% scaling
  - `"style150"` - Switch to 150% scaling
  - `"style200"` - Switch to 200% scaling

## localStorage Keys

### Logo Data
- `customLogo0` - Custom G4 logo (base64 image)
- `customLogo1` - Slideshow logo 1 (base64 image)
- `customLogo2` - Slideshow logo 2 (base64 image)
- `customLogo3` - Slideshow logo 3 (base64 image)
- `customLogo4` - Salotto logo (base64 image)

### Player Data
- `p1ScoreCtrlPanel` - Player 1 score
- `p2ScoreCtrlPanel` - Player 2 score
- `p1NameCtrlPanel` - Player 1 name
- `p2NameCtrlPanel` - Player 2 name
- `p1colorSet` - Player 1 color
- `p2colorSet` - Player 2 color
- `player1_photo` - Player 1 photo (base64 image)
- `player2_photo` - Player 2 photo (base64 image)

### Game Data
- `raceInfo` - Race/match info text
- `wagerInfo` - Wager info text

### Settings
- `useClock` - Clock enabled ("yes"/"no")
- `useCustomLogo` - Custom logo enabled ("yes"/"no")
- `useSalotto` - Salotto logo enabled ("yes"/"no")
- `slideShow` - Slideshow enabled ("yes"/"no")
- `b_style` - Browser source style (1-4)

## Script Loading Order

### browser_source.html
Scripts must load in this order:
1. `jquery.js` - jQuery library
2. `browser_source.js` (legacy) or module files
3. `browser_source_post.js` (legacy) - Must be at end of body

**Why:** `browser_source_post.js` contains initialization code that reads DOM elements immediately without DOMContentLoaded wrapper.

**With Modules:** New modular architecture uses DOMContentLoaded, so script order is flexible.

## jQuery Dependency

### Current Usage
Both `browser_source.js` and `browser_source_post.js` expect jQuery to be loaded.

### Migration Note
The new modular architecture does NOT require jQuery. All jQuery selectors have been replaced with:
- `document.getElementById()` for ID selectors
- `document.querySelector()` / `querySelectorAll()` for class selectors

## Breaking Changes to Avoid

1. **Never remove or rename required IDs** - JavaScript directly references them
2. **Never change BroadcastChannel message schema** - Control panel depends on it
3. **Never reorder stylesheets** without updating `styleChange()` function
4. **Never change localStorage key names** - Data will be lost
5. **Never remove required CSS classes** - Animations and state management depend on them
6. **Preserve class toggle logic** - `.fadeInElm`/`.fadeOutElm`, `.noShow`, etc.

## Safe Changes

✅ Add new IDs (won't break existing references)
✅ Add new classes (won't break existing styles)
✅ Add new CSS properties (won't break existing layout)
✅ Add new BroadcastChannel message fields (won't break existing handlers)
✅ Add new localStorage keys (won't break existing data)
✅ Wrap elements in new containers (as long as IDs remain on original elements)
✅ Add semantic HTML5 elements (section, header, etc.)
✅ Extract inline styles to classes (as long as visual output is identical)
✅ Refactor JavaScript into modules (as long as DOM manipulation is identical)

## Testing Checklist

After any changes, verify:
- [ ] All IDs are present in DOM
- [ ] All required classes are present
- [ ] BroadcastChannel messages are received and processed
- [ ] localStorage data loads correctly
- [ ] Shot clock works (start, stop, resume, reset)
- [ ] Extensions work
- [ ] Logos load and display
- [ ] Player photos load and reposition correctly
- [ ] Scaling works (100%, 125%, 150%, 200%)
- [ ] No console errors
- [ ] No visual regressions
