### 📄 Document 4: `/docs/02_Architecture/Message_Protocol.md`

**Title: MESSAGE PROTOCOL & BUS STANDARDS**

* **Communication Engine:** BroadcastChannel API.
* **Channel Name:** `g4-main` (Standardized across all modules).
* **Message Structure (The Envelope):** All inter-window communication must use a strict object format: `{ type: 'STRING_CONSTANT', payload: { ...data } }`.
* **Standard Message Types:**
* `SCORE_UPDATE`: Dispatched when game points or match counts change.
* `UI_REFRESH`: Dispatched to force all overlays to sync with the current Database state.
* `AD_TRIGGER`: Dispatched to rotate sponsor logos or play media assets.


* **Protocol Rules:**
* **Async Delivery:** Overlays must treat incoming messages as asynchronous triggers to fetch the latest state from **Dexie.js**.
* **No Circular Loops:** Docks must never respond to their own broadcast pulses to prevent infinite execution loops.
* **Validation:** The **Envelope Agent** persona is responsible for ensuring no "naked" data objects (e.g., `{ score: 5 }`) are sent without the proper type-wrapped envelope.