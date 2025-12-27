### 📄 Document 7: `/docs/03_Guides/OBS_Integration.md`

**Title: OBS INTEGRATION GUIDE**

* **Adding Custom Docks:**
* To add a control panel, navigate to **Docks > Custom Browser Docks** in OBS.
* Point the URL to the local file path of the desired dock (e.g., `C:/Dock-It/src/docks/master.html`).


* **Adding Browser Sources (Overlays):**
* Add a new **Browser Source** to your OBS Scene.
* Check **"Local file"** and browse to the overlay (e.g., `src/overlays/scoreboard.html`).
* Set Width to **1920** and Height to **1080** for standard broadcast resolution.


* **Optimization Settings:**
* Ensure **"Shutdown source when not visible"** is unchecked to maintain data synchronization in the background.
* Ensure **"Refresh browser when scene becomes active"** is unchecked to prevent state reset during transitions.


* **Troubleshooting:**
* If data is not updating, verify that all sources are using the same **BroadcastChannel** name defined in `Message_Protocol.md`.
* Check the **OBS Log** for any file-pathing errors related to the `file:///` protocol.