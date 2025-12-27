### 📄 Document 5: `/docs/02_Architecture/SYSTEM_ARCHITECTURE.md`

**Title: SYSTEM ARCHITECTURE & FOLDER MAP**

* **1. High-Level Folder Structure:**
* **`.windsurf_rules`**: The AI "Employee Handbook" defining core behavioral constraints.
* **`/src/core/`**: The "Global Brain" containing `db.js` (Dexie.js initialization), `MessageBus.js` (BroadcastChannel logic), and `obs-ws.js` (OBS WebSocket automation).
* **`/src/shared/`**: Common assets including `/css/` (Tailwind/Global styles), `/utils/` (Formatters/Validators), and `/images/` (Placeholders).
* **`/src/features/`**: Sport-specific modules, such as `/billiards/`, to keep game logic isolated from the core engine.
* **`/src/docks/`**: UI for OBS Custom Browser Docks (e.g., `master.html`, `ads.html`, `clock.html`).
* **`/src/overlays/`**: Visual rendering for OBS Browser Sources (e.g., `scoreboard.html`, `ad-frame.html`).


* **2. The Data Flow (The "Hub & Spoke"):**
* **The Hub (`/core`):** Any state change initiated in a Dock (e.g., clicking "Score +1") must be committed immediately to the Database (`db.js`).
* **The Pulse (`MessageBus.js`):** Once the DB is updated, the Core emits a "Pulse" signal across the `BroadcastChannel`.
* **The Spokes (`/overlays`):** Visual Overlays listen for this Pulse, fetch the fresh data from the DB, and update the UI.


* **3. Performance & Portability:**
* **Separation of Concerns:** High-frequency updates like the Shot Clock are isolated to prevent lag on the main scoreboard.
* **OBS-Ready:** The `/dist/` folder will contain optimized, flat HTML/JS/CSS files compatible with the `file:///` protocol.
