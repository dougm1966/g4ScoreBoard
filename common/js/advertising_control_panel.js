'use strict';

// Advertising Control Panel (separate dock)
// Stores ad images in IndexedDB via PCPLImageDB and layout in localStorage.

const ADS_CHANNEL_MAIN = 'g4-main';
const ADS_CONFIG_KEY = 'adLayoutConfig_v1';
const adsBc = new BroadcastChannel(ADS_CHANNEL_MAIN);

function adsSafeParseJson(value, fallback) {
	try {
		if (!value) return fallback;
		return JSON.parse(value);
	} catch {
		return fallback;
	}
}

function adsGetDefaultConfig() {
	return {
		showFrameArt: false,
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

function adsLoadConfig() {
	return adsSafeParseJson(localStorage.getItem(ADS_CONFIG_KEY), adsGetDefaultConfig());
}

function adsSaveConfig(cfg) {
	localStorage.setItem(ADS_CONFIG_KEY, JSON.stringify(cfg));
}

function adsKey(region, index) {
	return `ad_${region}_${index}`;
}

function adsGetListForRegion(cfg, region) {
	if (region === 'top') return cfg.top;
	if (region === 'left') return cfg.left;
	return cfg.right;
}

function adsEnsurePlacement(cfg, region, index) {
	const key = adsKey(region, index);
	const list = adsGetListForRegion(cfg, region);
	if (!Array.isArray(list)) return { key };
	let placement = list.find(p => p && p.key === key);
	if (placement) return placement;

	placement = { key };
	if (region === 'top') placement.startCol = index;
	else placement.startRow = index;
	list.push(placement);
	return placement;
}

function adsSyncEditor(cfg) {
	const textarea = document.getElementById('adsLayoutJson');
	if (textarea) textarea.value = JSON.stringify(cfg, null, 2);
}

function adsIdPrefix(region) {
	return region === 'top' ? 'adTop' : region === 'left' ? 'adLeft' : 'adRight';
}

function adsGetOptimalDims(region, span) {
	const s = Math.max(1, Math.min(3, Number(span) || 1));
	if (region === 'top') {
		return `${320 * s}×180`;
	}
	return `320×${360 * s}`;
}

function adsUpdateDims(region, index, span) {
	const prefix = adsIdPrefix(region);
	const el = document.getElementById(`${prefix}${index}Dims`);
	if (el) el.textContent = adsGetOptimalDims(region, span);
}

function adsGetSpanForPlacement(region, placement) {
	if (!placement) return 1;
	// Always read user intent first, then fall back to stored values
	if (region === 'top') {
		return Math.max(1, Math.min(3, Number(placement.userColSpan || placement.colSpan || placement.span) || 1));
	}
	return Math.max(1, Math.min(3, Number(placement.userRowSpan || placement.rowSpan || placement.span) || 1));
}

function adsNormalizePlacementPositions(cfg) {
	// Pack placements in order so spans don't overlap.
	// If a placement would overflow the grid, it is moved off-grid (start = 99) so it won't display.
	// IMPORTANT: We preserve user intent (span) and only set display positions.
	const top = Array.isArray(cfg.top) ? cfg.top : [];
	const left = Array.isArray(cfg.left) ? cfg.left : [];
	const right = Array.isArray(cfg.right) ? cfg.right : [];

	let col = 1;
	for (let i = 1; i <= 6; i++) {
		const p = adsEnsurePlacement(cfg, 'top', i);
		const span = adsGetSpanForPlacement('top', p);
		if (col > 6) {
			p.startCol = 99;
			continue;
		}
		p.startCol = col;
		// Store user intent separately from rendered span
		p.userColSpan = span;
		p.colSpan = Math.min(span, 6 - col + 1);
		col += p.colSpan;
	}

	let row = 1;
	for (let i = 1; i <= 3; i++) {
		const p = adsEnsurePlacement(cfg, 'left', i);
		const span = adsGetSpanForPlacement('left', p);
		if (row > 3) {
			p.startRow = 99;
			continue;
		}
		p.startRow = row;
		// Store user intent separately from rendered span
		p.userRowSpan = span;
		p.rowSpan = Math.min(span, 3 - row + 1);
		row += p.rowSpan;
	}

	row = 1;
	for (let i = 1; i <= 3; i++) {
		const p = adsEnsurePlacement(cfg, 'right', i);
		const span = adsGetSpanForPlacement('right', p);
		if (row > 3) {
			p.startRow = 99;
			continue;
		}
		p.startRow = row;
		// Store user intent separately from rendered span
		p.userRowSpan = span;
		p.rowSpan = Math.min(span, 3 - row + 1);
		row += p.rowSpan;
	}

	// Keep arrays stable for any advanced edits
	cfg.top = top;
	cfg.left = left;
	cfg.right = right;
}

function adsSetSpan(region, index, value) {
	const cfg = adsLoadConfig();
	const p = adsEnsurePlacement(cfg, region, Number(index));
	const span = Math.max(1, Math.min(3, Number(value) || 1));
	// Store user intent
	if (region === 'top') {
		p.userColSpan = span;
		p.colSpan = span;
	} else {
		p.userRowSpan = span;
		p.rowSpan = span;
	}
	adsNormalizePlacementPositions(cfg);
	adsSaveConfig(cfg);
	adsSyncEditor(cfg);
	adsUpdateDims(region, index, span);
	adsRefresh();
}

function adsSetFrame(region, index, checked) {
	const cfg = adsLoadConfig();
	const p = adsEnsurePlacement(cfg, region, Number(index));
	p.frame = !!checked;
	adsSaveConfig(cfg);
	adsSyncEditor(cfg);
	adsRefresh();
}

function adsSetShow(region, index, checked) {
	const cfg = adsLoadConfig();
	const p = adsEnsurePlacement(cfg, region, Number(index));
	p.show = !!checked;
	adsSaveConfig(cfg);
	adsSyncEditor(cfg);
	adsRefresh();
}

function adsSetTitle(region, index, title) {
	const cfg = adsLoadConfig();
	const p = adsEnsurePlacement(cfg, region, Number(index));
	const t = typeof title === 'string' ? title.trim() : '';
	if (t) p.title = t;
	else delete p.title;
	adsSaveConfig(cfg);
	adsSyncEditor(cfg);
	adsRefresh();
}

function adsApplyConfigToBasicControls(cfg) {
	const frameArtChk = document.getElementById('adsFrameArtChk');
	if (frameArtChk) frameArtChk.checked = !!cfg.showFrameArt;

	function applyRow(region, idx) {
		const p = adsEnsurePlacement(cfg, region, idx);
		const prefix = adsIdPrefix(region);
		const spanEl = document.getElementById(`${prefix}${idx}Span`);
		if (spanEl) {
			// Always read user intent for UI
			const spanVal = region === 'top'
				? String(p.userColSpan || p.colSpan || p.span || 1)
				: String(p.userRowSpan || p.rowSpan || p.span || 1);
			spanEl.value = spanVal;
		}
		const frameEl = document.getElementById(`${prefix}${idx}Frame`);
		if (frameEl) frameEl.checked = !!(p.frame || p.framed || p.frameArt);
		const showEl = document.getElementById(`${prefix}${idx}Show`);
		if (showEl) showEl.checked = !(p.show === false || p.enabled === false || p.hidden === true);
		const titleEl = document.getElementById(`${prefix}${idx}Title`);
		if (titleEl) titleEl.value = typeof p.title === 'string' ? p.title : '';
		// Use user intent for dimensions display
		const spanVal = region === 'top' ? (p.userColSpan || p.colSpan || p.span || 1) : (p.userRowSpan || p.rowSpan || p.span || 1);
		adsUpdateDims(region, idx, spanVal);
	}

	for (let i = 1; i <= 6; i++) applyRow('top', i);
	for (let i = 1; i <= 3; i++) applyRow('left', i);
	for (let i = 1; i <= 3; i++) applyRow('right', i);
}

async function adsSetPreview(imgId, key) {
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
	if (!url) url = localStorage.getItem(key) || '';
	const el = document.getElementById(imgId);
	if (el) el.src = url;

	const baseId = typeof imgId === 'string' ? imgId.replace(/Img$/, '') : '';
	const preview = baseId ? document.getElementById(`${baseId}Preview`) : null;
	const title = baseId ? document.getElementById(`${baseId}Title`) : null;
	if (preview) preview.classList.toggle('noShow', !url);
	if (title) title.classList.toggle('noShow', !!url);
}

async function adsDeleteAd(region, index) {
	const key = adsKey(region, index);
	try {
		if (window.PCPLImageDB && window.PCPLImageDB.delete) {
			await window.PCPLImageDB.delete(key);
		}
	} catch {
		// ignore
	}
	try {
		localStorage.removeItem(key);
	} catch {
		// ignore
	}
	adsRefresh();
}

async function adsRefreshPreviews() {
	await adsSetPreview('adTop1Img', adsKey('top', 1));
	await adsSetPreview('adTop2Img', adsKey('top', 2));
	await adsSetPreview('adTop3Img', adsKey('top', 3));
	await adsSetPreview('adTop4Img', adsKey('top', 4));
	await adsSetPreview('adTop5Img', adsKey('top', 5));
	await adsSetPreview('adTop6Img', adsKey('top', 6));
	await adsSetPreview('adLeft1Img', adsKey('left', 1));
	await adsSetPreview('adLeft2Img', adsKey('left', 2));
	await adsSetPreview('adLeft3Img', adsKey('left', 3));
	await adsSetPreview('adRight1Img', adsKey('right', 1));
	await adsSetPreview('adRight2Img', adsKey('right', 2));
	await adsSetPreview('adRight3Img', adsKey('right', 3));
}

function adsLoadIntoEditor() {
	const cfg = adsLoadConfig();
	adsApplyConfigToBasicControls(cfg);
	adsSyncEditor(cfg);
}

function adsSaveFromEditor() {
	const textarea = document.getElementById('adsLayoutJson');
	const raw = textarea ? textarea.value : '';
	const parsed = adsSafeParseJson(raw, null);
	if (!parsed) {
		alert('Invalid JSON');
		return;
	}
	adsNormalizePlacementPositions(parsed);
	adsSaveConfig(parsed);
	adsApplyConfigToBasicControls(parsed);
	adsSyncEditor(parsed);
	adsRefresh();
}

function adsToggleFrameArt() {
	const chk = document.getElementById('adsFrameArtChk');
	const cfg = adsLoadConfig();
	cfg.showFrameArt = !!(chk && chk.checked);
	adsSaveConfig(cfg);
	adsLoadIntoEditor();
	adsRefresh();
}

function adsRefresh() {
	try {
		adsBc.postMessage({ ads: 'refresh' });
	} catch {
		// ignore
	}
	adsRefreshPreviews();
}

function adsToggleAdvanced() {
	const panel = document.getElementById('adsAdvancedPanel');
	if (!panel) return;
	panel.classList.toggle('noShow');
}

function triggerAdUpload(region, index) {
	const id = region === 'top'
		? `FileUploadAdTop${index}`
		: region === 'left'
			? `FileUploadAdLeft${index}`
			: `FileUploadAdRight${index}`;
	const input = document.getElementById(id);
	if (input) input.click();
}

async function adPost(input, region, index) {
	if (!(input && input.files && input.files[0])) return;
	const file = input.files[0];
	const key = adsKey(region, index);

	let storedInIdb = false;
	try {
		if (window.PCPLImageDB && window.PCPLImageDB.setFromFile) {
			await window.PCPLImageDB.setFromFile(key, file);
			storedInIdb = true;
		}
	} catch {
		storedInIdb = false;
	}

	if (!storedInIdb) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener('load', function () {
			try {
				localStorage.setItem(key, reader.result);
			} catch (err) {
				alert('the selected image exceedes the maximium file size');
			}
			adsRefresh();
		}, false);
		return;
	}

	adsRefresh();
}

async function adsInit() {
	const cfg = adsLoadConfig();
	adsNormalizePlacementPositions(cfg);
	adsSaveConfig(cfg);
	adsLoadIntoEditor();
	await adsRefreshPreviews();
}
