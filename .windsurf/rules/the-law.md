---
trigger: always_on
---

# THE ARCHITECTURAL LAW

### **1. Core Infrastructure Principles**

* **Local-First Only:** No Node.js, Express, or external servers. All files must run via the `file:///` protocol in OBS.
* **Persistence:** Use **Dexie.js** (IndexedDB) for all data storage. Never rely on `localStorage` for images or large datasets.
* **Synchronization:** Use the **BroadcastChannel API** for real-time communication between Docks and Overlays. No WebSockets unless specifically requested for OBS control logic.
* **Frameworks:** Use **Vanilla JS** or lightweight libraries. Avoid heavy frameworks like React/Angular unless a build step (Vite) is active.

### **2. Directory Structure Mandate**

All agents must adhere to the following folder organization:

* `/core`: Global logic (DB initialization, Message Bus).
* `/shared`: Assets and utilities used by both Docks and Overlays.
* `/docks`: HTML/JS/CSS for OBS Custom Browser Docks (Control Panels).
* `/overlays`: HTML/JS/CSS for OBS Browser Sources (Visuals).
* `/features`: Individual sport modules (e.g., `/billiards`, `/darts`).

### **3. Coding Standards**

* **Modularity:** One file, one responsibility. Break large scripts into ES6 modules.
* **Naming Conventions:** * Variables/Functions: `camelCase`
* Constants: `UPPER_SNAKE_CASE`
* Files: `kebab-case.js`


* **State Management:** Always use a single "Source of Truth" (The Database). Docks update the DB; Overlays listen for changes via the Message Bus.

### **4. OBS Compatibility Rules**

* **Resolution:** Overlays must default to `1920x1080` unless specified.
* **Transparency:** CSS must always include `body { background: transparent; overflow: hidden; }` for overlays.
* **Paths:** Use **relative paths** for all assets to ensure portability across different user machines.



