### 📄 File: `/README.md` (Project Root)

**Title: 🎱 DOCK-IT.LIVE | MODULAR BROADCAST ENGINE**

---

## **1. Project Intent**

This repository is a high-performance, local-first broadcast suite designed for OBS (Open Broadcaster Software). It is currently undergoing a structural migration from the legacy `g4ScoreBoard` logic into a professional, modular architecture.

## **2. 🤖 AI AGENT OPERATING PROCEDURES (MANDATORY)**

**Before performing any code generation or file movement, all AI agents MUST read and adhere to the following documentation hierarchy:**

1. **Read the Rules:** Consult [`/docs/02_Architecture/THE_LAW.md`](https://www.google.com/search?q=/docs/02_Architecture/THE_LAW.md) for execution constraints.
2. **Verify the Map:** Follow the structure defined in [`/docs/02_Architecture/SYSTEM_ARCHITECTURE.md`](https://www.google.com/search?q=/docs/02_Architecture/SYSTEM_ARCHITECTURE.md).
3. **Assume a Persona:** Adopt the appropriate protocol from [`/docs/05_Agents/Agent_Personas.md`](https://www.google.com/search?q=/docs/05_Agents/Agent_Personas.md) based on the task (Pathfinder, State Refactor, etc.).

## **3. Core Technical Stack**

* **Runtime:** Browser-native (Local `file:///` protocol support required).
* **Persistence:** **Dexie.js (IndexedDB)** is the single source of truth; no `localStorage` for match state.
* **Communication:** **BroadcastChannel API** using standardized `{ type, payload }` envelopes.
* **Styling:** **Tailwind CSS** (Utility-first).

## **4. Documentation Index**

* **[01_Strategy](https://www.google.com/search?q=/docs/01_Strategy/):** Charter, Roadmap, and Competitive positioning.
* **[02_Architecture](https://www.google.com/search?q=/docs/02_Architecture/):** The Laws, DB Schema, and Message Protocols.
* **[03_Guides](https://www.google.com/search?q=/docs/03_Guides/):** OBS setup, Quick Start, and Sponsor Manager operation.
* **[04_Legal](https://www.google.com/search?q=/docs/04_Legal/):** Distribution checklists, Privacy, and Terms.
* **[05_Agents](https://www.google.com/search?q=/docs/05_Agents/):** Persona definitions and Migration Task Force protocols.