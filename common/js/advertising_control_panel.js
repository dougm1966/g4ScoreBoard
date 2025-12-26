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

function adsClampInt(value, min, max, fallback) {
	const n = Number(value);
	if (!Number.isFinite(n)) return fallback;
	return Math.max(min, Math.min(max, Math.round(n)));
}

function adsNormalizeHexColor(value, fallback) {
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

function adsSetFrameBgColor(color) {
	const cfg = adsLoadConfig();
	cfg.frameBgColor = adsNormalizeHexColor(color, '#000000');
	adsSaveConfig(cfg);
	adsSyncEditor(cfg);
	adsRefresh();
}

function adsSetFrameBgAlpha(value) {
	const cfg = adsLoadConfig();
	const alphaVal = adsClampInt(value, 0, 100, 0);
	cfg.frameBgAlpha = alphaVal;
	adsSaveConfig(cfg);
	adsSyncEditor(cfg);
	const bgAlphaLabel = document.getElementById('adsFrameBgAlphaLabel');
	if (bgAlphaLabel) bgAlphaLabel.textContent = `${alphaVal}%`;
	adsRefresh();
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

function adsPlacementHasContentSync(placement) {
	if (!placement) return false;
	const title = typeof placement.title === 'string' ? placement.title.trim() : '';
	if (title) return true;
	if (placement.hasImage === true) return true;
	try {
		return !!localStorage.getItem(placement.key);
	} catch {
		return false;
	}
}

function adsSetRowBlocked(region, idx, blocked) {
	const row = document.querySelector(`.ads-row[data-region="${region}"][data-index="${idx}"]`);
	if (row) row.classList.toggle('ads-row--blocked', !!blocked);

	const prefix = adsIdPrefix(region);
	const spanEl = document.getElementById(`${prefix}${idx}Span`);
	if (spanEl) spanEl.disabled = !!blocked;
	const frameEl = document.getElementById(`${prefix}${idx}Frame`);
	if (frameEl) frameEl.disabled = !!blocked;
	const showEl = document.getElementById(`${prefix}${idx}Show`);
	if (showEl) showEl.disabled = !!blocked;
	const titleEl = document.getElementById(`${prefix}${idx}Title`);
	if (titleEl) titleEl.disabled = !!blocked;
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
	const top = Array.isArray(cfg.top) ? cfg.top : [];
	const left = Array.isArray(cfg.left) ? cfg.left : [];
	const right = Array.isArray(cfg.right) ? cfg.right : [];

	// Anchored layout:
	// - Top ads are anchored to their index (T1 starts at col 1, T2 at col 2, ...)
	// - Side ads are anchored to their index (L1/R1 start at row 1, L2/R2 at row 2, ...)
	// Spans expand right (top) or down (sides).
	// If an anchor cell is already covered by an earlier span, that slot is moved off-grid (start = 99).

	const topCovered = [false, false, false, false, false, false, false];
	for (let i = 1; i <= 6; i++) {
		const p = adsEnsurePlacement(cfg, 'top', i);
		const span = adsGetSpanForPlacement('top', p);
		p.userColSpan = span;
		const startCol = i;
		const isShown = !(p.show === false || p.enabled === false || p.hidden === true);
		const hasContent = isShown && adsPlacementHasContentSync(p);
		const renderSpan = Math.min(span, 6 - startCol + 1);
		p.colSpan = renderSpan;
		p.blocked = false;
		if (isShown && topCovered[startCol]) {
			p.startCol = 99;
			p.blocked = true;
			continue;
		}
		if (!hasContent) {
			p.startCol = 99;
			continue;
		}
		if (!isShown) {
			p.startCol = startCol;
			continue;
		}
		p.startCol = startCol;
		for (let c = startCol; c < startCol + renderSpan; c++) {
			topCovered[c] = true;
		}
	}

	const leftCovered = [false, false, false, false];
	for (let i = 1; i <= 3; i++) {
		const p = adsEnsurePlacement(cfg, 'left', i);
		const span = adsGetSpanForPlacement('left', p);
		p.userRowSpan = span;
		const startRow = i;
		const isShown = !(p.show === false || p.enabled === false || p.hidden === true);
		const hasContent = isShown && adsPlacementHasContentSync(p);
		const renderSpan = Math.min(span, 3 - startRow + 1);
		p.rowSpan = renderSpan;
		p.blocked = false;
		if (isShown && leftCovered[startRow]) {
			p.startRow = 99;
			p.blocked = true;
			continue;
		}
		if (!hasContent) {
			p.startRow = 99;
			continue;
		}
		if (!isShown) {
			p.startRow = startRow;
			continue;
		}
		p.startRow = startRow;
		for (let r = startRow; r < startRow + renderSpan; r++) {
			leftCovered[r] = true;
		}
	}

	const rightCovered = [false, false, false, false];
	for (let i = 1; i <= 3; i++) {
		const p = adsEnsurePlacement(cfg, 'right', i);
		const span = adsGetSpanForPlacement('right', p);
		p.userRowSpan = span;
		const startRow = i;
		const isShown = !(p.show === false || p.enabled === false || p.hidden === true);
		const hasContent = isShown && adsPlacementHasContentSync(p);
		const renderSpan = Math.min(span, 3 - startRow + 1);
		p.rowSpan = renderSpan;
		p.blocked = false;
		if (isShown && rightCovered[startRow]) {
			p.startRow = 99;
			p.blocked = true;
			continue;
		}
		if (!hasContent) {
			p.startRow = 99;
			continue;
		}
		if (!isShown) {
			p.startRow = startRow;
			continue;
		}
		p.startRow = startRow;
		for (let r = startRow; r < startRow + renderSpan; r++) {
			rightCovered[r] = true;
		}
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
	adsApplyConfigToBasicControls(cfg);
	adsSyncEditor(cfg);
	adsUpdateDims(region, index, span);
	adsRefresh();
}

async function adsHydrateHasImageFlags(cfg) {
	const regions = [
		{ region: 'top', count: 6 },
		{ region: 'left', count: 3 },
		{ region: 'right', count: 3 }
	];
	for (const { region, count } of regions) {
		for (let i = 1; i <= count; i++) {
			const p = adsEnsurePlacement(cfg, region, i);
			const key = p.key || adsKey(region, i);
			let has = false;
			try {
				if (window.PCPLImageDB && window.PCPLImageDB.has) {
					has = await window.PCPLImageDB.has(key);
				}
			} catch {
				has = false;
			}
			if (!has) {
				try {
					has = !!localStorage.getItem(key);
				} catch {
					has = false;
				}
			}
			p.hasImage = !!has;
		}
	}
}

function adsSetFrame(region, index, checked) {
	const cfg = adsLoadConfig();
	const p = adsEnsurePlacement(cfg, region, Number(index));
	p.frame = !!checked;
	adsNormalizePlacementPositions(cfg);
	adsSaveConfig(cfg);
	adsApplyConfigToBasicControls(cfg);
	adsSyncEditor(cfg);
	adsRefresh();
}

function adsSetShow(region, index, checked) {
	const cfg = adsLoadConfig();
	const p = adsEnsurePlacement(cfg, region, Number(index));
	p.show = !!checked;
	adsNormalizePlacementPositions(cfg);
	adsSaveConfig(cfg);
	adsApplyConfigToBasicControls(cfg);
	adsSyncEditor(cfg);
	adsRefresh();
}

function adsSetTitle(region, index, title) {
	const cfg = adsLoadConfig();
	const p = adsEnsurePlacement(cfg, region, Number(index));
	const t = typeof title === 'string' ? title.trim() : '';
	if (t) p.title = t;
	else delete p.title;
	adsNormalizePlacementPositions(cfg);
	adsSaveConfig(cfg);
	adsApplyConfigToBasicControls(cfg);
	adsSyncEditor(cfg);
	adsRefresh();
}

function adsApplyConfigToBasicControls(cfg) {
	const frameArtChk = document.getElementById('adsFrameArtChk');
	if (frameArtChk) frameArtChk.checked = !!cfg.showFrameArt;

	const bgColor = document.getElementById('adsFrameBgColor');
	if (bgColor) {
		bgColor.value = adsNormalizeHexColor(cfg.frameBgColor, '#000000');
	}
	const bgAlpha = document.getElementById('adsFrameBgAlpha');
	const bgAlphaLabel = document.getElementById('adsFrameBgAlphaLabel');
	const alphaVal = adsClampInt(cfg.frameBgAlpha, 0, 100, 0);
	if (bgAlpha) bgAlpha.value = String(alphaVal);
	if (bgAlphaLabel) bgAlphaLabel.textContent = `${alphaVal}%`;

	function applyRow(region, idx) {
		const p = adsEnsurePlacement(cfg, region, idx);
		const prefix = adsIdPrefix(region);
		adsSetRowBlocked(region, idx, !!p.blocked);
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
		const cfg = adsLoadConfig();
		const p = adsEnsurePlacement(cfg, region, Number(index));
		p.hasImage = false;
		adsNormalizePlacementPositions(cfg);
		adsSaveConfig(cfg);
		adsApplyConfigToBasicControls(cfg);
		adsSyncEditor(cfg);
	} catch {
		// ignore
	}
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
	try {
		const cfg = adsLoadConfig();
		const p = adsEnsurePlacement(cfg, region, Number(index));
		p.hasImage = true;
		adsNormalizePlacementPositions(cfg);
		adsSaveConfig(cfg);
		adsApplyConfigToBasicControls(cfg);
		adsSyncEditor(cfg);
	} catch {
		// ignore
	}

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
	await adsHydrateHasImageFlags(cfg);
	adsNormalizePlacementPositions(cfg);
	adsSaveConfig(cfg);
	adsLoadIntoEditor();
	adsApplyConfigToBasicControls(cfg);
	await adsRefreshPreviews();
}
