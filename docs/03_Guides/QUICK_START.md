## 📄 Document 8: `/docs/03_Guides/Quick_Start.md`

**Title: QUICK START GUIDE**

* **Step 1: Environment Setup:** Verify that you have the latest version of OBS installed and that you have extracted the `Dock-It-Live` folder to a permanent location on your local drive.
* **Step 2: Database Initialization:** Open the `src/docks/master.html` file in any modern browser to initialize the **Dexie.js** database; this creates the necessary tables for matches and sponsors.
* **Step 3: OBS Dock Configuration:** Inside OBS, go to **Docks > Custom Browser Docks**, name your dock "Dock-It Master," and paste the local path to `src/docks/master.html`.
* **Step 4: Overlay Deployment:** Add a **Browser Source** to your scene, select the "Local file" checkbox, and link it to `src/overlays/scoreboard.html`.
* **Step 5: Test Synchronization:** Click the "Score +1" button in your Master Dock and verify that the Scoreboard Overlay updates instantly via the **BroadcastChannel**.
* **Step 6: Asset Management:** Go to the "Sponsor Manager" dock to upload logos; these will be stored as Blobs in **IndexedDB** for local persistence.