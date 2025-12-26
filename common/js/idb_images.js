'use strict';

(function () {
	const DB_NAME = 'pcplscoreboard';
	const DB_VERSION = 1;
	const STORE_NAME = 'images';

	/**
	 * Minimal IndexedDB image storage.
	 * Stores blobs keyed by logical ID (e.g. leftSponsorLogo, player1_photo, sponsorAd_001).
	 */
	class PCPLImageDB {
		constructor() {
			this._dbPromise = null;
			this._urlCache = new Map();
		}

		_open() {
			if (this._dbPromise) return this._dbPromise;

			this._dbPromise = new Promise((resolve, reject) => {
				if (!('indexedDB' in window)) {
					reject(new Error('IndexedDB is not available in this browser context.'));
					return;
				}

				const req = indexedDB.open(DB_NAME, DB_VERSION);
				req.onerror = () => reject(req.error);
				req.onupgradeneeded = () => {
					const db = req.result;
					if (!db.objectStoreNames.contains(STORE_NAME)) {
						db.createObjectStore(STORE_NAME, { keyPath: 'key' });
					}
				};
				req.onsuccess = () => resolve(req.result);
			});

			return this._dbPromise;
		}

		async setFromFile(key, file) {
			if (!key) throw new Error('setFromFile: key is required');
			if (!file) throw new Error('setFromFile: file is required');

			const db = await this._open();
			const record = {
				key,
				blob: file,
				mime: file.type || 'application/octet-stream',
				name: file.name || '',
				size: file.size || 0,
				updatedAt: Date.now()
			};

			await new Promise((resolve, reject) => {
				const tx = db.transaction(STORE_NAME, 'readwrite');
				tx.onabort = () => reject(tx.error);
				tx.onerror = () => reject(tx.error);
				tx.oncomplete = () => resolve();
				tx.objectStore(STORE_NAME).put(record);
			});

			this._revokeUrl(key);
		}

		async delete(key) {
			if (!key) throw new Error('delete: key is required');
			const db = await this._open();

			await new Promise((resolve, reject) => {
				const tx = db.transaction(STORE_NAME, 'readwrite');
				tx.onabort = () => reject(tx.error);
				tx.onerror = () => reject(tx.error);
				tx.oncomplete = () => resolve();
				tx.objectStore(STORE_NAME).delete(key);
			});

			this._revokeUrl(key);
		}

		async getRecord(key) {
			if (!key) return null;
			const db = await this._open();

			return await new Promise((resolve, reject) => {
				const tx = db.transaction(STORE_NAME, 'readonly');
				tx.onabort = () => reject(tx.error);
				tx.onerror = () => reject(tx.error);

				const req = tx.objectStore(STORE_NAME).get(key);
				req.onerror = () => reject(req.error);
				req.onsuccess = () => resolve(req.result || null);
			});
		}

		async getObjectUrl(key) {
			if (!key) return '';
			const cached = this._urlCache.get(key);
			if (cached) return cached;

			const record = await this.getRecord(key);
			if (!record || !record.blob) return '';

			const url = URL.createObjectURL(record.blob);
			this._urlCache.set(key, url);
			return url;
		}

		_revokeUrl(key) {
			const url = this._urlCache.get(key);
			if (url) {
				URL.revokeObjectURL(url);
				this._urlCache.delete(key);
			}
		}
	}

	if (!window.PCPLImageDB) {
		window.PCPLImageDB = new PCPLImageDB();
	}
})();
