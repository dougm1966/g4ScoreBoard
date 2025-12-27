### 📄 Document 14: `/docs/05_Agents/Migration_Task_Force.md`

**Title: MIGRATION TASK FORCE PROTOCOLS**

* **Objective:** To execute a non-destructive transition of the legacy `g4ScoreBoard` code into the modernized `Dock-It.live` architecture.
* **Protocol 1: Asset Isolation:** Before moving any file, the **Pathfinder** must identify all dependencies. Legacy files are moved to `/docs/00_LEGACY_ARCHIVE/` only after a functional replacement is verified in `/src/`.
* **Protocol 2: State Decoupling:** The **State Refactor** agent must strip inline `localStorage` calls from legacy HTML and replace them with calls to the central `db.js` (Dexie.js) repository.
* **Protocol 3: Messaging Standardization:** All legacy `window.postMessage` or direct variable manipulation between windows must be replaced by the **Envelope** agent with the standardized `BroadcastChannel` bus.
* **Protocol 4: Relative Path Audit:** Upon moving a file to its new directory (e.g., from root to `/src/docks/`), all `<script>` and `<link>` tags must be updated to maintain relative connectivity to the `/common/` and `/core/` folders.
* **Protocol 5: Style Unification:** The **Stylist** must convert legacy CSS overrides into **Tailwind CSS** utility classes to ensure the new modular components remain lightweight and themeable.
