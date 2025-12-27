# LEGACY OBS Integration Guide

## Complete OBS Setup

### 1. Control Panel Setup

#### Adding the Control Dock
1. **Open OBS Studio**
2. Navigate to `View` → `Docks` → `Custom Browser Docks...`
3. Fill in the dialog:
   - **Dock Name**: `g4ScoreBoard Control`
   - **URL**: `file:///C:/path/to/g4ScoreBoard/control_panel.html`
   - **Width**: `400` (auto-adjusts)
   - **Height**: `600`
   - ✅ **Enable custom CSS**
   - **CSS**: `body { margin: 0; padding: 0; }`
4. Click **OK**

#### Dock Positioning
- Drag the dock to your preferred position
- Right-click dock header for layout options
- Can be undocked as separate window

### 2. Overlay Source Setup

#### Standard Overlay
1. **Add Source**: `Browser` → `Create new`
2. **Source Settings**:
   - **URL**: `file:///C:/path/to/g4ScoreBoard/browser_source.html`
   - **Width**: `1920`
   - **Height**: `1080`
   - **Custom CSS**: (optional for transparency)
   - ✅ **Shutdown source when not visible**
   - ✅ **Refresh browser when scene becomes active**
3. Click **OK**

#### Compact Overlay
For smaller displays or picture-in-picture:
- Use `browser_compact.html` instead
- Recommended size: `800` x `450`

### 3. Advanced Configuration

#### Multiple Setups
Create separate browser sources for:
- Main stream overlay
- Secondary display
- Recording-only overlay

#### Audio Considerations
- Browser sources don't affect audio
- Use OBS audio mixer for sound management

#### Performance Optimization
- Check "Shutdown source when not visible"
- Use appropriate resolution for your stream
- Consider hardware acceleration

### 4. Scene Collection Management

#### Saving Configuration
1. Export scene collection: `File` → `Export` → `Scene Collection`
2. Include scoreboard configuration
3. Share with team members

#### Multi-Event Setup
- Create separate scene collections per event
- Use consistent naming conventions
- Document custom settings

### 5. Troubleshooting

#### Common Issues

**Control Panel Not Loading**
- Verify file path uses forward slashes
- Check file permissions
- Try refreshing the dock

**Overlay Not Updating**
- Ensure both sources use same file path
- Clear browser cache
- Restart OBS if needed

**Performance Issues**
- Reduce overlay resolution
- Close unnecessary browser sources
- Update graphics drivers

#### Debug Mode
Add `?debug=true` to URLs for console logging:
```
file:///path/to/control_panel.html?debug=true
```

### 6. Best Practices

#### File Management
- Keep scoreboard files in a dedicated folder
- Use relative paths when possible
- Backup configuration regularly

#### Stream Workflow
1. Test all sources before going live
2. Have backup configurations ready
3. Monitor system resources during stream

#### Team Collaboration
- Document custom settings
- Share scene collections
- Train all operators on standard procedures

---

**⚠️ ARCHIVAL NOTICE**: This document describes the legacy g4ScoreBoard architecture and is retained for historical reference only. For current documentation, see the parent directory.