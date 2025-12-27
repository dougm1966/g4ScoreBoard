# LEGACY Database Schema

## LocalStorage Structure
```javascript
// Game State
"p1ScoreCtrlPanel"      // Player 1 score
"p2ScoreCtrlPanel"      // Player 2 score
"player1NameCtrlPanel"  // Player 1 name
"player2NameCtrlPanel"  // Player 2 name
"player1InfoCtrlPanel"  // Player 1 info
"player2InfoCtrlPanel"  // Player 2 info
"raceToCtrlPanel"       // Race to value
"wagerCtrlPanel"        // Wager amount
"shotClockTimeCtrlPanel" // Shot clock time
"clockRunningCtrlPanel" // Clock state
"p1colorCtrlPanel"      // Player 1 color
"p2colorCtrlPanel"      // Player 2 color

// Settings
"scoreAmountCtrlPanel"  // Score increment amount
"opacityCtrlPanel"      // Overlay opacity
"themeCtrlPanel"        // Selected theme

// Advertising
"adsConfig"            // Advertisement configuration
```

## IndexedDB Structure
```javascript
// Database: pcplscoreboard
// Store: images
{
  key: string,           // Unique identifier
  blob: Blob,           // Image data
  dataUrl: string,      // Base64 representation
  width: number,        // Image dimensions
  height: number,
  mimeType: string,     // File type
  timestamp: number     // Upload time
}
```

## BroadcastChannel Messages
```javascript
// Score updates
{ player: "1" | "2", score: number }

// Player info
{ player: "1" | "2", name: string }
{ player: "1" | "2", info: string }

// Game settings
{ race: number }
{ wager: string }
{ opacity: number }

// Clock controls
{ time: number }
{ clockDisplay: "show" | "hide" }

// Colors
{ player: "1" | "2", color: string }

// Advertising
{ type: "ads", action: "refresh" }
```

---

**⚠️ ARCHIVAL NOTICE**: This document describes the legacy g4ScoreBoard architecture and is retained for historical reference only. For current documentation, see the parent directory.