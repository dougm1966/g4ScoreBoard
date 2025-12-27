# LEGACY Quick-Start Guide

## Getting Started in 5 Minutes

### Prerequisites
- OBS Studio 26.0 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Windows, Mac, or Linux computer

### Installation

1. **Download the latest release** from the GitHub repository
2. **Extract the ZIP file** to a location of your choice
3. **Open OBS Studio**

### OBS Setup

1. **Add Control Panel Dock:**
   - In OBS, go to `View` → `Docks` → `Custom Browser Docks...`
   - Enter `g4ScoreBoard Control` as the dock name
   - Set URL to: `file:///path/to/g4ScoreBoard/control_panel.html`
   - Check "Enable custom CSS" and set height to `600px`
   - Click `OK`

2. **Add Overlay Source:**
   - In your scene, add a `Browser` source
   - Set URL to: `file:///path/to/g4ScoreBoard/browser_source.html`
   - Set width to `1920` and height to `1080`
   - Check "Shutdown source when not visible" and "Refresh browser when scene becomes active"

### Basic Usage

1. **Set Player Names:**
   - Enter player names in the control panel
   - Click "Send Names" to update the overlay

2. **Start Scoring:**
   - Use the `+1` and `-1` buttons to update scores
   - Scores automatically sync to the overlay

3. **Control the Clock:**
   - Set shot clock time and click "Start"
   - Use "Stop" and "Reset" as needed

### Next Steps
- Upload logos and player photos
- Customize colors and themes
- Explore advanced features in the full documentation

## Troubleshooting

### Common Issues

**Q: The control panel is blank**
A: Ensure the file path is correct and uses forward slashes, even on Windows

**Q: Overlay isn't updating**
A: Check that both control panel and overlay are using the same BroadcastChannel

**Q: Images aren't saving**
A: Make sure your browser supports IndexedDB and you have storage space available

### Getting Help
- Check the [GitHub Issues](https://github.com/dougm1966/g4ScoreBoard/issues)
- Review the [Full Documentation](../02_Architecture/)
- Join our community discussions

---

**⚠️ ARCHIVAL NOTICE**: This document describes the legacy g4ScoreBoard architecture and is retained for historical reference only. For current documentation, see the parent directory.