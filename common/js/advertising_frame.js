'use strict';

(function () {
	const CHANNEL_MAIN = 'g4-main';
	const CONFIG_KEY = 'adLayoutConfig_v1';

	function safeParseJson(value, fallback) {
		try {
			if (!value) return fallback;
			return JSON.parse(value);
		} catch {
			return fallback;
		}
	}

	function getDefaultConfig() {
		return {
			showFrameArt: false,
			frameBgColor: '#000000',
			frameBgAlpha: 0,
			top: [
				{ key: 'ad_top_1', startCol: 1, colSpan: 1 },
				{ key: 'ad_top_2', startCol: 2, colSpan: 1 },
				{ key: 'ad_top_3', startCol: 3, colSpan: 1 },
				{ key: 'ad_top_4', startCol: 4, colSpan: 1 },
				{ key: 'ad_top_5', startCol: 5, colSpan: 1 },
				{ key: 'ad_top_6', startCol: 6, colSpan: 1 }
			],
			left: [
				{ key: 'ad_left_1', startRow: 1, rowSpan: 1 },
				{ key: 'ad_left_2', startRow: 2, rowSpan: 1 },
				{ key: 'ad_left_3', startRow: 3, rowSpan: 1 }
			],
			right: [
				{ key: 'ad_right_1', startRow: 1, rowSpan: 1 },
				{ key: 'ad_right_2', startRow: 2, rowSpan: 1 },
				{ key: 'ad_right_3', startRow: 3, rowSpan: 1 }
			]
		};
	}

	function normalizeHexColor(value, fallback) {
		if (typeof value !== 'string') return fallback;
		const v = value.trim();
		if (/^#[0-9a-fA-F]{6}$/.test(v)) return v.toLowerCase();
		if (/^#[0-9a-fA-F]{3}$/.test(v)) {
			const r = v[1];
			const g = v[2];
			const b = v[3];
			return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
		}
		return fallback;
	}

	function clampInt(value, min, max, fallback) {
		const n = Number(value);
		if (!Number.isFinite(n)) return fallback;
		return Math.max(min, Math.min(max, Math.round(n)));
	}

	function hexToRgb(hex) {
		const h = normalizeHexColor(hex, '#000000');
		const r = parseInt(h.slice(1, 3), 16);
		const g = parseInt(h.slice(3, 5), 16);
		const b = parseInt(h.slice(5, 7), 16);
		return { r, g, b };
	}

	function loadConfig() {
		return safeParseJson(localStorage.getItem(CONFIG_KEY), getDefaultConfig());
	}

	function clearContainer(el) {
		while (el.firstChild) el.removeChild(el.firstChild);
	}

	function applyViewportScale() {
		const root = document.getElementById('frameRoot');
		if (!root) return;

		const vw = Math.max(1, document.documentElement.clientWidth || window.innerWidth || 1);
		const vh = Math.max(1, document.documentElement.clientHeight || window.innerHeight || 1);
		const scale = Math.min(vw / 1920, vh / 1080);
		root.style.transform = `scale(${scale})`;

		const left = Math.max(0, Math.floor((vw - 1920 * scale) / 2));
		const top = Math.max(0, Math.floor((vh - 1080 * scale) / 2));
		root.style.left = `${left}px`;
		root.style.top = `${top}px`;
	}

	async function getImageUrlForKey(key) {
		let url = '';
		try {
			if (window.PCPLImageDB && window.PCPLImageDB.getObjectUrl) {
				if (window.PCPLImageDB.revokeObjectUrl) {
					window.PCPLImageDB.revokeObjectUrl(key);
				}
				url = await window.PCPLImageDB.getObjectUrl(key);
			}
		} catch {
			url = '';
		}
		if (!url) {
			url = localStorage.getItem(key) || '';
		}
		return url;
	}

	function isPlacementFramed(placement) {
		if (!placement) return false;
		return !!(placement.frame || placement.framed || placement.frameArt);
	}

	function getPlacementTitle(placement) {
		if (!placement) return '';
		return typeof placement.title === 'string' ? placement.title.trim() : '';
	}

	function createTileBase(placement) {
		const tile = document.createElement('div');
		tile.className = isPlacementFramed(placement) ? 'ad-tile ad-tile--framed' : 'ad-tile';
		return tile;
	}

	function appendTileContent(tile, url, title, alt) {
		if (url) {
			const img = document.createElement('img');
			img.src = url;
			img.alt = alt;
			tile.appendChild(img);
			return;
		}
		if (title) {
			const titleEl = document.createElement('div');
			titleEl.className = 'ad-title';
			titleEl.textContent = title;
			tile.appendChild(titleEl);
		}
	}

	async function renderTop(topConfig) {
		const container = document.getElementById('adsTop');
		if (!container) return;
		clearContainer(container);

		for (const placement of Array.isArray(topConfig) ? topConfig : []) {
			if (!placement || !placement.key) continue;
			// Skip off-grid ads (startCol = 99)
			if (Number(placement.startCol) === 99) continue;
			if (placement.show === false || placement.enabled === false || placement.hidden === true) continue;
			const url = await getImageUrlForKey(placement.key);
			const title = getPlacementTitle(placement);
			if (!url && !title) continue;

			const tile = createTileBase(placement);
			const startCol = Number(placement.startCol) || 1;
			// Use rendered span for display (may be reduced due to overflow)
			const colSpan = Math.max(1, Number(placement.colSpan || placement.span) || 1);
			tile.style.gridColumn = `${startCol} / span ${colSpan}`;
			appendTileContent(tile, url, title, placement.key);

			container.appendChild(tile);
		}
	}

	async function renderSide(containerId, sideConfig) {
		const container = document.getElementById(containerId);
		if (!container) return;
		clearContainer(container);

		for (const placement of Array.isArray(sideConfig) ? sideConfig : []) {
			if (!placement || !placement.key) continue;
			// Skip off-grid ads (startRow = 99)
			if (Number(placement.startRow) === 99) continue;
			if (placement.show === false || placement.enabled === false || placement.hidden === true) continue;
			const url = await getImageUrlForKey(placement.key);
			const title = getPlacementTitle(placement);
			if (!url && !title) continue;

			const tile = createTileBase(placement);
			const startRow = Number(placement.startRow) || 1;
			// Use rendered span for display (may be reduced due to overflow)
			const rowSpan = Math.max(1, Number(placement.rowSpan || placement.span) || 1);
			tile.style.gridRow = `${startRow} / span ${rowSpan}`;
			appendTileContent(tile, url, title, placement.key);

			container.appendChild(tile);
		}
	}

	async function renderAll() {
		const cfg = loadConfig();
		document.body.classList.toggle('frame-art-on', !!cfg.showFrameArt);

		const root = document.getElementById('frameRoot');
		if (root) {
			const { r, g, b } = hexToRgb(cfg.frameBgColor);
			const alphaPct = clampInt(cfg.frameBgAlpha, 0, 100, 0);
			const a = alphaPct / 100;
			root.style.background = a > 0 ? `rgba(${r}, ${g}, ${b}, ${a})` : 'transparent';
		}

		await renderTop(cfg.top);
		await renderSide('adsLeft', cfg.left);
		await renderSide('adsRight', cfg.right);
	}

	function setupChannel() {
		try {
			const bc = new BroadcastChannel(CHANNEL_MAIN);
			bc.onmessage = (event) => {
				const data = event.data;
				if (!data) return;
				if (data.ads === 'refresh') {
					renderAll();
				}
			};
		} catch {
			// ignore
		}
	}

	window.addEventListener('load', function () {
		applyViewportScale();
		renderAll();
		setupChannel();
	});

	window.addEventListener('resize', function () {
		applyViewportScale();
	});
})();
