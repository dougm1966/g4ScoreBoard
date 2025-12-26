# 🎱✨ PCPLScoreBoard

## 🏆 Park County Pool League ScoreBoard

Welcome to **PCPLScoreBoard** — a bold, stream-ready scoreboard built for **OBS Studio**. Set it up once, then run your matches like a pro. 🔥

**Vibes:** 🎥 Streaming-ready • 🎱 Pool-first • ⚡ Fast controls • 🧠 Simple workflow

### 💥 What you get
- 🖥️ **Scoreboard Browser Source** (clean, modern overlay)
- 🧩 **Control Panel Dock** (operate the match from inside OBS)
- ⏱️ **Shot clock** + optional standalone shot clock display
- 🏷️ **Sponsor logos** + rotating slideshow

### 🚧 Big upgrade in progress (for sponsors & ads)
We’re upgrading image storage to **IndexedDB** (binary storage) so you can load **way more sponsor/advertising images** without hitting the tiny `localStorage` limit. 🧰📦

---

## 🚀🎬 Quick Start (OBS Setup)

### 1) 📁💾 Extract / place the folder
Put the project folder somewhere stable on your computer (don’t move it later).

### 2) 🧩🕹️ Add the Control Panel as a Dock

#### OBS 27.2+ (recommended: `file:///` URL)
1. In OBS: `Docks` -> `Custom Browser Docks`
2. **Dock Name:** `PCPLScoreBoard`
3. **URL:** point to `control_panel.html` using a file URI, for example:
   - `file:///c:/path/to/PCPLScoreBoard/control_panel.html`
4. Click `Close`

#### OBS 27.1 and lower (path URL)
Use a normal Windows path in the URL box, for example:
- `c:\path\to\PCPLScoreBoard\control_panel.html`

### 3) 🖥️✨ Add the Scoreboard as a Browser Source
1. In your Scene: `+` -> `Browser`
2. Name it: `PCPLScoreBoard`
3. **URL:** point to `browser_source.html`
   - OBS 27.2+: `file:///c:/path/to/PCPLScoreBoard/browser_source.html`
   - Older OBS: `c:\path\to\PCPLScoreBoard\browser_source.html`
4. **Width:** `1920`
5. **Height:** `1080`

---

## ⏱️🔔 Optional: Shot Clock Display (second monitor)
Add another Browser Source and point it at:
- `shot_clock_display.html`

---

## ⌨️⚡ Hotkeys (optional)
1. OBS: `Tools` -> `Scripts`
2. Click `+`
3. Select `g4ScoreBoard_hotkeys.lua` (file name is kept for compatibility for now)
4. OBS: `Settings` -> `Hotkeys`
5. Hotkeys currently use a `G4` prefix in OBS.

---

## 🧑‍🤝‍🧑📸 Sponsor Logos / Player Photos
In the Control Panel, use the upload buttons to:
- Upload player photos
- Upload left/right sponsor logos
- Upload 3 slideshow sponsor logos

### 🚨 Note about image limits (current behavior)
Today the project stores images in browser storage, which can run out of space.
The **IndexedDB upgrade** is the path to **bigger sponsor/advertising image capacity** with the *same* easy upload experience. 📈🎯

---

## 🛠️🧯 Troubleshooting

### Scoreboard not showing
- Confirm the Browser Source URL points to `browser_source.html`
- Confirm Width/Height are set (1920x1080 recommended)

### Uploads failing / “maximum file size” alert
- This is usually the browser storage quota being exceeded.
- The IndexedDB migration is intended to fix this for high-image-count sponsor/advertising usage.

---

## 🗺️🚀 Roadmap (high level)
- Move all image storage from `localStorage` (base64) to **IndexedDB** (binary)
- Add 8–12 sponsor/advertising image slots
- Improve error messaging when storage limits are reached
