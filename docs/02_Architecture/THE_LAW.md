Title: THE ARCHITECTURAL LAW

I. Execution Environment Constraints
Local Protocol Compliance: The system must execute entirely under the file:/// URI scheme within OBS Browser Sources; any reliance on http://localhost is a secondary fallback only.

Zero-Dependency Core: No external runtimes (Node.js/Express) are permitted. All logic must be browser-native JavaScript.

II. Data Persistence & State Management
Primary Data Store: All persistent entities (Matches, Players, Settings, Assets) must be managed via Dexie.js (IndexedDB).

LocalStorage Restriction: Use localStorage exclusively for non-critical UI flags (e.g., isSidebarOpen). All game-critical state must be in the DB.

Source of Truth: The Master Dock owns all "Write" operations. Overlays are "Read-Only" observers that re-render based on Database hooks or Broadcast events.

III. Communication Protocol
Latency Standard: Inter-window sync must use the BroadcastChannel API.

Event Encapsulation: All messages must use the standard envelope: { type: string, payload: object }.

IV. Frontend Standards
Atomic CSS: Style implementation via Tailwind CSS (CDN or local build).

OBS Optimization: Overlays must include CSS for background: transparent and overflow: hidden by default.