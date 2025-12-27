# g4ScoreBoard

A professional, browser-based scoreboard system for billiards and pool tournaments, designed for seamless integration with OBS Studio and other streaming platforms.

## 🎯 Features

- **Real-time Scoring**: Instant score updates with synchronized display
- **OBS Integration**: Native dock support for control panel
- **Player Management**: Custom names, info, and photos
- **Shot Clock**: Configurable timer with visual indicators
- **Sponsor Support**: Built-in advertising rotation system
- **Responsive Design**: Works on desktop and mobile devices
- **Offline Capable**: No internet connection required
- **Open Source**: MIT licensed for maximum flexibility

## 🚀 Quick Start

### Prerequisites
- OBS Studio 26.0 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Download** the latest release from the [GitHub repository](https://github.com/dougm1966/g4ScoreBoard)
2. **Extract** the ZIP file to your preferred location
3. **Open OBS Studio** and follow the setup guide below

### OBS Setup

#### Add Control Panel Dock
1. In OBS, go to `View` → `Docks` → `Custom Browser Docks...`
2. Enter:
   - **Dock Name**: `g4ScoreBoard Control`
   - **URL**: `file:///C:/path/to/g4ScoreBoard/control_panel.html`
   - **Height**: `600px`
3. Click **OK**

#### Add Overlay Source
1. Add a `Browser` source to your scene
2. Set:
   - **URL**: `file:///C:/path/to/g4ScoreBoard/browser_source.html`
   - **Width**: `1920`
   - **Height**: `1080`
3. Click **OK**

### Basic Usage
1. Enter player names and click "Send Names"
2. Use `+1`/`-1` buttons to update scores
3. Control the shot clock with Start/Stop/Reset
4. Upload logos and customize colors

## 📁 Project Structure

```
g4ScoreBoard/
├── README.md                 # This file
├── control_panel.html        # Main control interface
├── browser_source.html       # Standard overlay display
├── browser_compact.html      # Compact overlay variant
├── advertising_control_panel.html  # Ad management
├── advertising_frame.html    # Ad overlay display
├── common/                   # Shared resources
│   ├── css/                  # Stylesheets
│   ├── fonts/                # Font files
│   ├── images/               # Static images
│   └── js/                   # JavaScript modules
├── docs/                     # Documentation
│   ├── archive_legacy/       # Legacy documentation (historical)
│   ├── 01_Strategy/          # Strategic documents
│   ├── 02_Architecture/      # Technical architecture
│   ├── 03_Guides/           # User guides
│   ├── 04_Legal/            # Legal documents
│   └── 05_Agents/           # Team roles
├── src/                     # Future modular code
└── dist/                    # Built assets (if using build tools)
```

## 📚 Documentation

### User Guides
- [Quick-Start Guide](docs/03_Guides/Quick-Start.md) - Get started in 5 minutes
- [OBS Integration Guide](docs/03_Guides/OBS_Integration.md) - Complete OBS setup
- [Sponsor Guide](docs/03_Guides/Sponsor_Guide.md) - Managing advertisements

### Technical Documentation
- [Architecture Principles](docs/02_Architecture/The_Law.md) - Core design principles
- [Database Schema](docs/02_Architecture/DB_Schema.md) - Data storage structure
- [Message Protocol](docs/02_Architecture/Message_Protocol.md) - Communication system

### Project Information
- [Project Charter](docs/01_Strategy/Charter.md) - Vision and goals
- [Roadmap](docs/01_Strategy/Roadmap.md) - Development timeline
- [Competitive Analysis](docs/01_Strategy/Competitive_Matrix.md) - Market comparison

### Legal
- [Terms of Service](docs/04_Legal/TOS.md) - Usage terms
- [Privacy Policy](docs/04_Legal/Privacy.md) - Data handling
- [Distribution Checklist](docs/04_Legal/Distribution_Checklist.md) - Release preparation

### 🗃️ Legacy Archive
For historical reference, the original documentation describing the legacy architecture (localStorage, flat files, jQuery) has been moved to [docs/archive_legacy/](docs/archive_legacy/). This documentation is **no longer the source of truth** but is retained for historical context.

## 🛠️ Technical Details

### Architecture
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Storage**: LocalStorage for settings, IndexedDB for images
- **Communication**: BroadcastChannel API for real-time sync
- **Compatibility**: Chrome, Firefox, Safari, Edge

### Data Flow
1. Control Panel → BroadcastChannel → Overlay Displays
2. Control Panel → LocalStorage → Persistent Storage
3. All Components → IndexedDB → Image Storage

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly across browsers
5. Submit a pull request

### Code Standards
- Use ES6+ JavaScript features
- Follow semantic HTML5 practices
- Write responsive CSS with modern layouts
- Include comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- [GitHub Issues](https://github.com/dougm1966/g4ScoreBoard/issues) - Bug reports and feature requests
- [Documentation](docs/) - Complete documentation
- [Community Discussions](https://github.com/dougm1966/g4ScoreBoard/discussions) - General questions

### Common Issues

**Q: Control panel appears blank**
A: Ensure the file path uses forward slashes, even on Windows: `file:///C:/path/to/file.html`

**Q: Overlay isn't updating**
A: Check that both control panel and overlay are loaded from the same location

**Q: Images aren't saving**
A: Verify your browser supports IndexedDB and you have available storage space

## 🎯 Roadmap

### Version 1.1 (Q1 2025)
- Enhanced sponsor management
- Multiple game formats
- Improved mobile responsiveness

### Version 1.2 (Q2 2025)
- Advanced statistics tracking
- Tournament mode
- Custom themes

### Version 2.0 (Q4 2025)
- Cloud synchronization
- Mobile companion app
- Advanced analytics

## 📊 Performance

- **Load Time**: < 2 seconds on standard connection
- **Memory Usage**: < 50MB for full system
- **CPU Impact**: < 5% on modern hardware
- **Storage**: < 100MB including images

## 🔒 Security

- No personal data collection
- All processing done locally
- No external API calls for core functionality
- Secure image handling with validation

## 🌟 Acknowledgments

- The OBS Studio team for the excellent browser source implementation
- Contributors and beta testers for valuable feedback
- The billiards community for feature suggestions and requirements

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/dougm1966/g4ScoreBoard)
![GitHub forks](https://img.shields.io/github/forks/dougm1966/g4ScoreBoard)
![GitHub issues](https://img.shields.io/github/issues/dougm1966/g4ScoreBoard)
![GitHub license](https://img.shields.io/github/license/dougm1966/g4ScoreBoard)

---

**g4ScoreBoard** - Professional scoring for professional tournaments

*For the latest updates and announcements, follow our [GitHub repository](https://github.com/dougm1966/g4ScoreBoard).*