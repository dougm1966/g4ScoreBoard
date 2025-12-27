### 📄 Document 3: `/docs/02_Architecture/Database_Schema.md`

**Title: MODERNIZED DATABASE SCHEMA**

* **Database Engine:** Dexie.js (Wrapper for IndexedDB).
* **Database Name:** `DockItDB` (Transitioning from legacy `pcplscoreboard`).
* **Primary Tables:**
* **`match_state`**: Stores the current live game data including scores, player names, game type, and active settings.
* **`sponsors`**: Stores sponsor profiles, image references, tier levels, and total impression counts for reporting.
* **`assets`**: Stores binary data (Blobs) for sponsor logos and player photos to ensure the system remains 100% local and private.


* **Data Integrity Rules:**
* **Single Writer:** Only the **Master Dock** has permission to perform "Write" operations to the database.
* **Reactive Listeners:** Overlays must use Dexie "liveQuery" or BroadcastChannel signals to trigger a UI refresh when the database state changes.
* **Persistence:** All data must survive a browser refresh; `localStorage` must not be used for critical match data.
