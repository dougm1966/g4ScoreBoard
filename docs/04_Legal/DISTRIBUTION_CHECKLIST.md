### 📄 Document 10: `/docs/04_Legal/Distribution_Checklist.md`

**Title: DISTRIBUTION & DEPLOYMENT CHECKLIST**

* **Asset Scrubbing:** Verify that all personal user data, specific player names, or proprietary sponsor logos are cleared from the `IndexedDB` before distributing a template version.
* **Path Validation:** Ensure all internal links in the `/src` folder use relative paths (e.g., `./core/db.js` instead of `C:/Users/...`) so the project remains portable.
* **Dependency Audit:** Confirm that all external libraries like **Dexie.js** or **Tailwind CSS** are either bundled in the `/dist` folder or accessible via a reliable CDN fallback.
* **License Inclusion:** Ensure the final package includes the necessary open-source license files for any third-party libraries used in the build.
* **OBS Scene Export:** If providing a "Turnkey" setup, include the `.json` scene collection file and verify that it points to the correct relative paths for the browser sources.
* **Code Minification:** For production releases, run the **Vite build script** to generate minified, high-performance assets in the `/dist` directory.