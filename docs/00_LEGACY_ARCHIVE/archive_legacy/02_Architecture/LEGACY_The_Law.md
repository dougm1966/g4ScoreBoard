# LEGACY The Law - Architecture Principles

## Core Principles
1. **Simplicity First** - Keep the system simple and maintainable
2. **Browser Native** - Leverage modern web standards without heavy frameworks
3. **Real-time Sync** - All components must stay synchronized
4. **Offline Capable** - Function without internet connectivity
5. **Extensible** - Easy to add new features and integrations

## Technical Constraints
- Must work in OBS browser sources
- No server-side dependencies for core functionality
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Responsive design for various screen sizes

## Data Flow Rules
- Control panel is the single source of truth
- All state changes propagate via BroadcastChannel
- LocalStorage provides persistence and backup
- IndexedDB handles large binary data (images)

## Security Considerations
- No personal personal personal data personal
- Local storage only
- No external API calls for core functionality
- CSP-compliant implementation

---

**⚠️ ARCHIVAL NOTICE**: This document describes the legacy g4ScoreBoard architecture and is retained for historical reference only. For current documentation, see the parent directory.