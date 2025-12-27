# Legacy Documentation Archive

## ⚠️ Historical Reference Only

This directory contains documentation for the **legacy g4ScoreBoard architecture** (localStorage, flat files, jQuery-based). These documents are retained for historical reference and are **no longer the source of truth** for the project.

## Archive Contents

### 01_Strategy - Legacy Planning
- `LEGACY_Charter.md` - Original project vision and goals
- `LEGACY_Competitive_Matrix.md` - Legacy market analysis
- `LEGACY_Roadmap.md` - Original development timeline

### 02_Architecture - Legacy Technical Design
- `LEGACY_The_Law.md` - Original architecture principles
- `LEGACY_Folder_Map.md` - Legacy flat-file structure
- `LEGACY_DB_Schema.md` - LocalStorage + IndexedDB (images only)
- `LEGACY_Message_Protocol.md` - Basic BroadcastChannel messages

### 03_Guides - Legacy User Documentation
- `LEGACY_Quick-Start.md` - Original setup instructions
- `LEGACY_OBS_Integration.md` - Legacy OBS configuration
- `LEGACY_Sponsor_Guide.md` - Original advertising system

### 04_Legal - Legacy Legal Documents
- `LEGACY_TOS.md` - Original terms of service
- `LEGACY_Privacy.md` - Legacy privacy policy
- `LEGACY_Distribution_Checklist.md` - Original release procedures

### 05_Agents - Legacy Team Documentation
- `LEGACY_Team_Personas.md` - Original role definitions
- `LEGACY_Migration_Task_Force_Protocols.md` - Migration planning (now historical)

## Legacy Architecture Summary

### Data Storage
- **Game State**: LocalStorage (simple key-value pairs)
- **Images**: IndexedDB (`pcplscoreboard` database)
- **Settings**: LocalStorage configuration

### Communication
- **Protocol**: Basic BroadcastChannel messages
- **Channels**: `g4-main`, `g4-recv`, `ads-main`
- **Format**: Plain JavaScript objects (no envelopes)

### File Structure
- **Root HTML Files**: `control_panel.html`, `browser_source.html`
- **JavaScript**: Monolithic files in `/common/js/`
- **Dependencies**: jQuery, flat CSS files

### Limitations
- No modular architecture
- Limited state management
- Basic error handling
- No build system

---

## Current Documentation

For the **current source of truth** and future architecture plans, please see the parent `/docs/` directory.

---

**Last Updated**: December 27, 2024  
**Status**: Archived - For Historical Reference Only