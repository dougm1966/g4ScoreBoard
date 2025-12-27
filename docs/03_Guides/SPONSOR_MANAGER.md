### 📄 Document 9: `/docs/03_Guides/Sponsor_Manager.md`

**Title: SPONSOR MANAGER & AD ENGINE**

* **Sponsor Profiles:** The Sponsor Manager allows the creation of individual profiles containing name, tier (Gold, Silver, Bronze), and associated media assets.
* **Asset Storage:** All sponsor logos and videos are stored locally as **Blobs** within the **IndexedDB `assets` table**, ensuring no external hosting is required.
* **Impression Tracking:** The engine automatically records a "view" in the database every time a sponsor's logo is displayed on an overlay.
* **Rotation Logic:** Use the "Ad Manager" dock to set rotation intervals (e.g., 30 seconds) or trigger specific "Sponsor Spotlights" manually.
* **Sync Protocol:** When a sponsor change occurs, the Manager broadcasts an `AD_TRIGGER` event via the **BroadcastChannel**, prompting overlays to pull the new asset from the database.