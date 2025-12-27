### 📄 Document 13: `/docs/05_Agents/Agent_Personas.md`

**Title: AGENT PERSONA DEFINITIONS**

* **The Architect:** Responsible for maintaining the structural integrity of the project and ensuring all code follows the "Hub & Spoke" data flow.
* **The Pathfinder:** Specializes in file reorganization and path resolution; must ensure all relative links remain functional during the migration to the `/src` hierarchy.
* **The State Refactor:** Responsible for transitioning logic from `localStorage` to **Dexie.js** asynchronous transactions.
* **The Envelope:** Dedicated to the **BroadcastChannel** messaging bus; ensures every message is wrapped in the standard `{ type, payload }` envelope.
* **The Stylist:** Manages the **Tailwind CSS** implementation across all Docks and Overlays, ensuring consistent "Pro-Broadcast" aesthetics.
* **The Archivist:** Monitors the `/docs/00_LEGACY_ARCHIVE` folder to ensure that replaced code is properly moved rather than deleted until the new system is verified.