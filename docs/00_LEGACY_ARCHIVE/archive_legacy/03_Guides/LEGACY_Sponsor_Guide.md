# LEGACY Sponsor Guide

## Managing Sponsors and Advertisements

### Overview
The g4ScoreBoard includes a dedicated advertising system that allows you to display sponsor logos and advertisements during your stream or event.

### Accessing the Ad Control Panel

1. **Open the Ad Control Panel:**
   - Navigate to `advertising_control_panel.html` in your browser
   - Or add as a custom dock in OBS (similar to main control panel)

2. **Add Ad Control Dock to OBS:**
   - `View` → `Docks` → `Custom Browser Docks...`
   - Name: `g4ScoreBoard Ads`
   - URL: `file:///path/to/g4ScoreBoard/advertising_control_panel.html`

### Adding Sponsors

#### Uploading Logo Images
1. **Click "Upload Logo"** button
2. **Select image file** (PNG, JPG, GIF recommended)
3. **Configure display settings:**
   - Display duration (seconds)
   - Position in rotation
   - Background color (optional)

#### Image Requirements
- **Format**: PNG, JPG, GIF, WebP
- **Size**: Under 5MB per image
- **Resolution**: Recommended 1920x1080 or vector graphics
- **Aspect Ratio**: 16:9 for best display

### Managing Ad Rotation

#### Rotation Settings
1. **Set rotation interval** (time between ads)
2. **Configure display order:**
   - Sequential: Display in upload order
   - Random: Shuffle ads automatically
3. **Enable/disable individual ads**

#### Scheduling
- **Start/Stop times**: Set specific time ranges
- **Date ranges**: Schedule ads for specific events
- **Priority levels**: Important sponsors get more airtime

### Adding the Ad Overlay

#### Create Ad Source in OBS
1. **Add Browser Source**: `Browser` → `Create new`
2. **Settings:**
   - **URL**: `file:///path/to/g4ScoreBoard/advertising_frame.html`
   - **Width**: `1920` (or your stream resolution)
   - **Height**: `1080`
   - **Custom CSS**: For transparency if needed

#### Positioning
- Place as bottom layer or in dedicated area
- Use chroma key for transparency effects
- Consider picture-in-picture placement

### Best Practices

#### Sponsor Management
1. **Organize by tier:**
   - Premium: Longer display time, prominent placement
   - Standard: Regular rotation
   - Basic: Limited display time

2. **Maintain professional appearance:**
   - Use high-quality logos
   - Ensure consistent sizing
   - Test visibility on different backgrounds

#### Technical Considerations
- **Storage**: Images stored in IndexedDB (browser-based)
- **Backup**: Export sponsor list periodically
- **Performance**: Limit number of simultaneous ads

#### Legal Compliance
- Ensure you have rights to display logos
- Follow sponsor contract requirements
- Maintain display time records

### Troubleshooting

#### Common Issues

**Ads Not Displaying**
- Check ad overlay source is active
- Verify images uploaded successfully
- Ensure rotation is enabled

**Image Quality Issues**
- Use high-resolution original files
- Check image format compatibility
- Verify display scaling settings

**Storage Problems**
- Clear browser cache if needed
- Check available storage space
- Consider image optimization

#### Performance Optimization
- Compress images without quality loss
- Limit number of active ads
- Use appropriate display intervals

### Advanced Features

#### Dynamic Content
- Update ads during live events
- Rotate based on time of day
- Display event-specific sponsors

#### Analytics
- Track display times per sponsor
- Monitor rotation effectiveness
- Generate sponsor reports

#### Integration
- Connect to sponsor management systems
- Automate ad scheduling
- Export display logs

---

**⚠️ ARCHIVAL NOTICE**: This document describes the legacy g4ScoreBoard architecture and is retained for historical reference only. For current documentation, see the parent directory.