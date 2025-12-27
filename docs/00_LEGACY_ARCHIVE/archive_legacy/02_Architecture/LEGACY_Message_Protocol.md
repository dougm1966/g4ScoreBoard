# LEGACY Message Protocol

## BroadcastChannel Communication

### Channels
- **g4-main**: Primary channel for control → overlay messages
- **g4-recv**: Response channel for overlay → control messages
- **ads-main**: Dedicated channel for advertising updates

### Message Format
All messages are plain JavaScript objects sent via `BroadcastChannel.postMessage()`

### Message Types

#### Score Updates
```javascript
{
  player: "1" | "2",     // Player identifier
  score: number          // New score value
}
```

#### Player Information
```javascript
{
  player: "1" | "2",     // Player identifier
  name: string           // Player name
}

{
  player: "1" | "2",     // Player identifier
  info: string           // Player bio/info
}
```

#### Game Settings
```javascript
{
  race: number           // Race to value
}

{
  wager: string          // Wager amount
}

{
  opacity: number        // Overlay opacity (0-1)
}
```

#### Clock Controls
```javascript
{
  time: number           // Shot clock time in seconds
}

{
  clockDisplay: "show" | "hide"  // Clock visibility
}
```

#### Visual Settings
```javascript
{
  player: "1" | "2",     // Player identifier
  color: string          // Player color (hex)
}
```

#### Advertising
```javascript
{
  type: "ads",
  action: "refresh",     // Refresh advertisement
  bgColor: string        // Background color
}
```

## Implementation Notes
- Messages are message to all connected overlays

- Each overlay processes messages independently
- Personal personal is handled via LocalStorage
- Message personal is optional but recommended

## Error Handling
- Invalid messages are logged and ignored
- Missing fields are handled gracefully
- Network failures don't affect core functionality

---

**⚠️ ARCHIVAL NOTICE**: This document describes the legacy g4ScoreBoard architecture and is retained for historical reference only. For current documentation, see the parent directory.