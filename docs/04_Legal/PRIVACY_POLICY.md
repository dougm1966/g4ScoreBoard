### 📄 Document 11: `/docs/04_Legal/Privacy_Policy.md`

**Title: PRIVACY POLICY & DATA SOVEREIGNTY**

* **Local-First Privacy:** Dock-It is designed with a "Zero-Cloud" philosophy; all user data, match history, and sponsor assets remain exclusively on the user's local machine.
* **No External Tracking:** The application does not include telemetry, tracking pixels, or background data-reporting to external servers.
* **Data Storage:** All information is stored within the browser's **IndexedDB** (via Dexie.js). This data is sandboxed to the user's local file system and is not accessible by other websites or applications.
* **Asset Security:** Sponsor logos and player images are converted to **Base64 or Blobs** and stored directly in the database, ensuring that sensitive media is not transmitted over the internet.
* **User Control:** Users retain 100% ownership and control over their data. Deleting the local project folder or clearing the browser's site data will permanently remove all stored information.
* **Third-Party CDNs:** While the application may use CDNs for libraries like Tailwind CSS or Dexie.js for convenience, no private user data is ever sent to these providers.