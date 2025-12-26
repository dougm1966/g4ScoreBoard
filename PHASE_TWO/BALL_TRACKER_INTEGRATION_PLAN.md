# Ball Tracker Integration Plan
## Phase Two: Solids/Stripes Integration

### Project Overview
Integrate the `g4BallTracker-1.0.3` functionality directly into the main `PCPL ScoreBoard` system, allowing users to select "solids" or "stripes" for each player and display these selections under the player names in the browser source.

### Current Architecture Analysis

#### Main Scoreboard (`PCPL ScoreBoard`)
- **Browser Source**: `browser_source.html` - OBS overlay displaying scores and player info
- **Control Panel**: `control_panel.html` - Interface for managing game state
- **Communication**: Uses BroadcastChannel API for real-time updates
- **Styling**: Modern CSS with custom properties for scaling
- **Storage**: IndexedDB for images, localStorage for settings

#### Ball Tracker (`g4BallTracker-1.0.3`)
- **Standalone**: Separate Docker panel with independent functionality
- **Ball Tracking**: Tracks balls 1-15 for 8-ball, 9-ball, and 10-ball games
- **Communication**: BroadcastChannel `g4-balls` with existing integration hooks
- **Assets**: Ball images in multiple color schemes (black, white, standard, AI_render)
- **Configuration**: Flexible positioning and sizing options

### Integration Strategy

#### 1. Control Panel Enhancement
**Location**: Add new section in `control_panel.html` after player colors (line ~136)

**Components**:
- Player 1 ball type selection (Solids/Stripes/Not Assigned)
- Player 2 ball type selection (Solids/Stripes/Not Assigned)
- Ball tracker controls (show/hide, reset, game type)
- Ball size selector
- Integration toggle (enable/disable ball tracking)

**UI Elements**:
```html
<section class="section-card" id="ballTrackerSection">
  <div class="section-card__title">Ball Tracker</div>
  <div class="grid-section grid-cols-2">
    <div class="input-group">
      <label>P1 Ball Type:</label>
      <select id="p1BallType" class="select-field obs28" onchange="ballTypeChange(1)">
        <option value="unassigned">Not Assigned</option>
        <option value="solids">Solids</option>
        <option value="stripes">Stripes</option>
      </select>
    </div>
    <div class="input-group">
      <label>P2 Ball Type:</label>
      <select id="p2BallType" class="select-field obs28" onchange="ballTypeChange(2)">
        <option value="unassigned">Not Assigned</option>
        <option value="solids">Solids</option>
        <option value="stripes">Stripes</option>
      </select>
    </div>
  </div>
</section>
```

#### 2. Browser Source Display Integration
**Location**: Modify `browser_source.html` player name cells (lines ~42-57)

**Components**:
- Ball type indicators under player names
- Ball tracking display (optional overlay)
- Styled to match existing scoreboard aesthetic

**HTML Structure**:
```html
<td id="player1Name" class="bs-player-name">
  <div class="fadeInElm bs-ext-icon" id="p1ExtIcon">Ex</div>
  <img id="player1-photo" class="playerPhoto" src="" alt="">
  <img class="fadeOutElm bs-logo bs-logo-left" id="leftSponsorLogoImg" height="20" src="" alt="">
  <span class="playerNameText">Player 1</span>
  <div id="p1BallType" class="bs-ball-type fadeOutElm">SOLIDS</div>
</td>
```

#### 3. Communication Layer
**BroadcastChannel Extensions**:
- Extend existing `g4-main` channel for ball type messages
- Add new message types for ball type assignments
- Maintain compatibility with existing ball tracker

**Message Protocol**:
```javascript
// Ball type assignment
{
  ballType: {
    player: 1|2,
    type: "solids"|"stripes"|"unassigned"
  }
}

// Ball tracker state
{
  ballTracker: {
    enabled: true|false,
    gameType: "eight"|"nine"|"ten",
    ballSize: 35|45|55,
    balls: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  }
}
```

#### 4. CSS Styling
**New Classes**:
- `.bs-ball-type` - Ball type indicator styling
- `.bs-ball-tracker` - Ball tracking overlay styling
- Responsive scaling with existing CSS variables

**Style Integration**:
```css
.bs-ball-type {
  font-size: var(--ball-type-font-size, 10pt);
  font-weight: bold;
  text-align: center;
  margin-top: 2px;
  opacity: 0.8;
}

.bs-ball-type.solids {
  color: #ff6b6b;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.bs-ball-type.stripes {
  color: #4ecdc4;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}
```

### Implementation Phases

#### Phase 1: Core Integration
1. **Control Panel Addition**
   - Add ball type selection controls
   - Implement basic event handlers
   - Add localStorage persistence

2. **Browser Source Display**
   - Add ball type indicators under player names
   - Implement show/hide functionality
   - Style integration with existing design

3. **Communication Layer**
   - Extend BroadcastChannel messaging
   - Implement real-time synchronization
   - Add error handling and fallbacks

#### Phase 2: Ball Tracking Features
1. **Ball State Management**
   - Integrate ball tracking logic from `g4BallTracker`
   - Add ball state persistence
   - Implement game type switching

2. **Visual Ball Tracking**
   - Add optional ball tracking overlay
   - Implement ball click-to-toggle functionality
   - Add ball size and positioning controls

3. **Advanced Features**
   - Automatic ball type assignment based on first pocketed balls
   - Game state validation (prevent invalid assignments)
   - Integration with scoring system

#### Phase 3: Polish & Optimization
1. **User Experience**
   - Keyboard shortcuts for ball type assignment
   - Visual feedback for interactions
   - Accessibility improvements

2. **Performance Optimization**
   - Optimize BroadcastChannel messaging
   - Reduce DOM updates
   - Improve storage efficiency

3. **Testing & Validation**
   - Cross-browser compatibility testing
   - OBS integration testing
   - Performance benchmarking

### Technical Requirements

#### Dependencies
- No new external dependencies required
- Leverages existing BroadcastChannel API
- Uses existing CSS custom properties system
- Compatible with current IndexedDB/localStorage setup

#### File Modifications
1. `control_panel.html` - Add ball tracker controls
2. `browser_source.html` - Add ball type displays
3. `common/css/browser_source.css` - Add new styling
4. `common/js/control_panel.js` - Add ball type logic
5. `common/js/browser_source.js` - Add display logic
6. `common/js/control_panel_post.js` - Add communication logic

#### Asset Integration
- Copy ball images from `g4BallTracker-1.0.3/images/` to `common/images/balls/`
- Maintain existing ball color schemes
- Add new ball type indicator graphics if needed

### Risk Assessment & Mitigation

#### Potential Issues
1. **BroadcastChannel Compatibility**
   - Risk: Some OBS versions may have limited support
   - Mitigation: Fallback to localStorage polling

2. **Performance Impact**
   - Risk: Additional DOM updates may affect performance
   - Mitigation: Optimize update frequency and batch changes

3. **Storage Limitations**
   - Risk: Ball state data may exceed localStorage limits
   - Mitigation: Use IndexedDB for ball state storage

#### Compatibility Considerations
- Maintain backward compatibility with existing installations
- Graceful degradation if ball tracking features fail
- Optional feature activation (can be disabled)

### Success Criteria

#### Functional Requirements
- [ ] Users can assign solids/stripes to each player
- [ ] Assignments display under player names in browser source
- [ ] Real-time synchronization between control panel and browser source
- [ ] Persistent storage of assignments across sessions
- [ ] Integration with existing scoring system

#### Non-Functional Requirements
- [ ] No performance degradation in existing features
- [ ] Consistent styling with existing scoreboard design
- [ ] Intuitive user interface matching current design patterns
- [ ] Reliable operation in OBS Browser Source environment

### Timeline Estimate

#### Phase 1: Core Integration (2-3 days)
- Day 1: Control panel addition and basic styling
- Day 2: Browser source display and communication layer
- Day 3: Testing and refinement

#### Phase 2: Ball Tracking Features (3-4 days)
- Day 4-5: Ball state management and visual tracking
- Day 6-7: Advanced features and integration

#### Phase 3: Polish & Optimization (1-2 days)
- Day 8: User experience improvements and performance optimization
- Day 9: Final testing and documentation

**Total Estimated Time: 6-9 days**

### Next Steps

1. **Immediate Actions**
   - Backup existing files
   - Create development branch
   - Set up testing environment

2. **Development Priorities**
   - Start with Phase 1 core integration
   - Focus on ball type assignment functionality
   - Ensure existing features remain unaffected

3. **Testing Strategy**
   - Test each phase independently
   - Validate OBS integration throughout
   - Performance testing with typical usage scenarios

---

**Document Created**: December 26, 2025  
**Author**: Cascade AI Assistant  
**Version**: 1.0  
**Status**: Planning Phase
