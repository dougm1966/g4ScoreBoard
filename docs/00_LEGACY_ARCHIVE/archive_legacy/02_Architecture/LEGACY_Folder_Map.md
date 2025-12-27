# LEGACY Folder Map

## Root Structure
```
g4ScoreBoard/
├── README.md                 # Project overview and setup
├── control_panel.html        # Main control interface
├── browser_source.html       # Standard overlay display
├── browser_compact.html      # Compact overlay variant
├── advertising_control_panel.html  # Ad management interface
├── advertising_frame.html    # Ad overlay display
├── common/                   # Shared resources
│   ├── css/                  # Stylesheets
│   ├── fonts/                # Font files
│   ├── images/               # Static images
│   └── js/                   # JavaScript modules
│       ├── browser_source/   # Overlay-specific code
│       ├── browser_compact/  # Compact overlay code
│       ├── idb_images.js     # IndexedDB image handling
│       ├── control_panel.js  # Main control logic
│       └── advertising_*.js  # Advertising system
├── docs/                     # Documentation
│   ├── 01_Strategy/          # Strategic documents
│   ├── 02_Architecture/      # Technical architecture
│   ├── 03_Guides/           # User guides
│   ├── 04_Legal/            # Legal documents
│   └── 05_Agents/           # Team roles
├── src/                     # Future modular code
└── dist/                    # Built assets (if using build tools)
```

## Key Entry Points
- **Control Panel**: `control_panel.html` - Scorekeeper interface
- **Standard Overlay**: `browser_source.html` - Full display overlay
- **Compact Overlay**: `browser_compact.html` - Minimal display
- **Ad Control**: `advertising_control_panel.html` - Advertisement management

## Communication Flow
1. Control Panel → BroadcastChannel → Overlays
2. Control Panel → LocalStorage → Persistence
3. All components → IndexedDB → Image storage

---

**⚠️ ARCHIVAL NOTICE**: This document describes the legacy g4ScoreBoard architecture and is retained for historical reference only. For current documentation, see the parent directory.