# G4ScoreBoard Migration Plan: localStorage to Project Storage

## Project Overview
**Goal:** Replace localStorage image storage with direct file storage while keeping the exact same upload interface for users.

**Benefits:**
- No localStorage limits (currently ~5MB causing 2.27MB upload failures)
- No base64 encoding overhead (33% size reduction)
- Scales to 8-12+ advertising images
- Faster loading times
- **Zero user interface changes** - same buttons, same workflow
- Simple for other users to operate

---

## Phase 1: Setup & Foundation
- [ ] Create project directory structure
- [ ] Test direct file access with relative paths
- [ ] Create backup of current localStorage data
- [ ] Verify CORS compatibility for local files

### Tasks:

#### 1.1 Directory Structure Creation
- [ ] Create `media/` root folder
- [ ] Create `media/images/` subfolder
- [ ] Create `media/images/players/` subfolder
- [ ] Create `media/images/sponsors/` subfolder
- [ ] Create `media/images/slideshow/` subfolder
- [ ] Create `media/images/ads/` subfolder (future advertising)

#### 1.2 File Access Testing
- [ ] Test relative paths like `./media/images/player1_photo.png`
- [ ] Verify CORS works with local file access
- [ ] Test in different browsers (Chrome, Firefox, Edge)
- [ ] Confirm OBS browser sources can access local files
- [ ] Test file:// protocol if needed for CORS issues

#### 1.3 Data Backup
- [ ] Export all current localStorage images to files
- [ ] Create migration script to convert base64 to image files
- [ ] Document current localStorage keys and their new file paths
- [ ] Test migration with sample data

---

## Phase 2: Upload System Updates (Keep Current UI)
- [ ] Modify existing upload functions to save files directly
- [ ] Keep current upload buttons and interface unchanged
- [ ] Replace localStorage storage with file path storage
- [ ] Test upload functionality

### Tasks:

#### 2.1 Update Upload Functions
- [ ] Modify `logoPost()` function to save files instead of base64
- [ ] Modify `playerPhotoPost()` function to save files instead of base64
- [ ] Replace FileReader with direct file saving
- [ ] Store only file paths in localStorage (tiny strings)
- [ ] Keep same error handling and user feedback

#### 2.2 File Management (Same UI)
- [ ] Update delete functions to remove files from folders
- [ ] Keep existing delete buttons and interface
- [ ] Update preview to show file-based images
- [ ] Maintain same user experience
- [ ] Test all file operations

#### 2.3 Display Integration
- [ ] Update image loading to use file paths
- [ ] Test with current upload interface
- [ ] Verify BroadcastChannel messaging works
- [ ] Keep all existing UI elements unchanged

---

## Phase 3: Display System Updates
- [ ] Update image loading in browser sources
- [ ] Replace localStorage.getItem() with file paths
- [ ] Update BroadcastChannel messaging
- [ ] Test all display locations

### Tasks:

#### 3.1 Browser Source Updates
- [ ] Update `browser_source/ui.js` load functions
- [ ] Update `browser_compact/ui.js` load functions
- [ ] Replace localStorage image loading with file path loading
- [ ] Update `loadPlayerPhotos()` function
- [ ] Update `loadLogos()` function
- [ ] Update `loadLogo()` function

#### 3.2 Messaging System Updates
- [ ] Update BroadcastChannel messages to send file paths instead of data
- [ ] Modify control panel broadcast functions
- [ ] Update browser source message handlers
- [ ] Test real-time image updates

#### 3.3 Fallback Handling
- [ ] Add fallback to localStorage for migration period
- [ ] Handle missing files gracefully
- [ ] Add loading state indicators
- [ ] Test error scenarios

---

## Phase 4: Testing & Validation
- [ ] Comprehensive testing of all image locations
- [ ] Performance testing
- [ ] Cross-browser testing
- [ ] OBS integration testing

### Tasks:

#### 4.1 Functional Testing
- [ ] Test player photo upload/display (2 locations)
- [ ] Test sponsor logo upload/display (2 locations)
- [ ] Test slideshow logo upload/display (3 locations)
- [ ] Test browser compact logo (1 location)
- [ ] Test all deletion functions
- [ ] Test all replacement functions

#### 4.2 Performance Testing
- [ ] Measure load times vs localStorage
- [ ] Test with large image files
- [ ] Test concurrent loading
- [ ] Verify memory usage improvement

#### 4.3 Integration Testing
- [ ] Test in OBS Studio browser sources
- [ ] Test with different OBS setups
- [ ] Test BroadcastChannel reliability
- [ ] Test with different network conditions

---

## Phase 5: Cleanup & Documentation
- [ ] Remove localStorage image storage code
- [ ] Update documentation
- [ ] Clean up unused functions
- [ ] Final performance optimization

### Tasks:

#### 5.1 Code Cleanup
- [ ] Remove base64 conversion code
- [ ] Remove localStorage image storage calls
- [ ] Clean up unused variables and functions
- [ ] Add code comments for new file-based system
- [ ] Update error messages

#### 5.2 Documentation Updates
- [ ] Update IMAGE_UPLOAD_ANALYSIS.md
- [ ] Create setup guide for new system
- [ ] Update README.md with new requirements
- [ ] Document API endpoints
- [ ] Create troubleshooting guide

#### 5.3 Final Optimization
- [ ] Add image compression for uploads
- [ ] Implement caching strategies
- [ ] Add file size validation
- [ ] Optimize file naming conventions

---

## Phase 6: Future Advertising System Preparation
- [ ] Design advertising image storage structure
- [ ] Create ad management interface
- [ ] Plan ad rotation system
- [ ] Design ad display integration

### Tasks:

#### 6.1 Advertising Storage Structure
- [ ] Expand `media/images/ads/` folder structure
- [ ] Create ad naming conventions
- [ ] Plan ad metadata storage (JSON file or database)
- [ ] Design ad category organization

#### 6.2 Ad Management Interface
- [ ] Create ad upload section in control panel
- [ ] Add ad preview functionality
- [ ] Create ad scheduling interface
- [ ] Add ad priority/rotation settings

#### 6.3 Ad Display Integration
- [ ] Plan ad display locations in scoreboard
- [ ] Design ad rotation logic
- [ ] Create ad transition animations
- [ ] Integrate with existing scoreboard states

---

## Implementation Notes

### File Naming Conventions
```
players/
  player1_photo.png
  player2_photo.png

sponsors/
  left_sponsor_logo.png
  right_sponsor_logo.png

slideshow/
  custom_logo_1.png
  custom_logo_2.png
  custom_logo_3.png

ads/
  sponsor_ad_001.png
  sponsor_ad_002.png
  ...
```

### API Endpoint Structure
**No API needed** - direct file access

### File Path Structure
```
./media/images/players/player1_photo.png
./media/images/players/player2_photo.png
./media/images/sponsors/left_sponsor_logo.png
./media/images/sponsors/right_sponsor_logo.png
./media/images/slideshow/custom_logo_1.png
./media/images/slideshow/custom_logo_2.png
./media/images/slideshow/custom_logo_3.png
./media/images/sponsors/custom_logo.png
```

### Migration Mapping
| localStorage Key | New File Path |
|------------------|---------------|
| player1_photo | media/images/players/player1_photo.png |
| player2_photo | media/images/players/player2_photo.png |
| leftSponsorLogo | media/images/sponsors/left_sponsor_logo.png |
| rightSponsorLogo | media/images/sponsors/right_sponsor_logo.png |
| customLogo1 | media/images/slideshow/custom_logo_1.png |
| customLogo2 | media/images/slideshow/custom_logo_2.png |
| customLogo3 | media/images/slideshow/custom_logo_3.png |
| customImage | media/images/sponsors/custom_logo.png |

---

## Risk Assessment & Mitigation

### Risks:
- **File system permissions:** May need write access to project folders
- **Browser security:** Some browsers block file:// access
- **OBS integration:** Need to ensure OBS can access local files
- **Migration complexity:** Risk of data loss during transition

### Mitigations:
- **Simple file saving:** Use basic file system operations
- **Backup strategy:** Full localStorage backup before migration
- **Fallback system:** Keep localStorage as backup during transition
- **OBS testing:** Verify OBS compatibility early

---

## Success Criteria
- [ ] All 7 current image locations working with file storage
- [ ] No localStorage size limitations
- [ ] 2.27MB+ images upload successfully
- [ ] Advertising system can handle 8-12+ images
- [ ] Performance improved vs localStorage
- [ ] OBS integration working seamlessly
- [ ] **User interface unchanged** - same buttons and workflow
- [ ] Documentation complete and accurate

---

*Created: December 26, 2025*
*Target Completion: Phase 1-2 (1 week), Phase 3-4 (1 week)*
