# PCPL ScoreBoard Agent Guide

This document explains the specialized AI agents available for the PCPL ScoreBoard project and when to use each one.

## Quick Reference

| Agent Name | Color | Use When... |
|------------|-------|-------------|
| **obs-compatibility-guardian** | Blue | Making changes that affect OBS integration |
| **storage-migration-expert** | Purple | Working on localStorage → IndexedDB migration |
| **feature-planning-architect** | Orange | Planning new features or major enhancements |
| **state-messaging-expert** | Yellow | Working with state sync or BroadcastChannel |
| **testing-verification-specialist** | Green | Creating test plans or verifying changes |
| **code-modernization-guide** | Cyan | Refactoring jQuery code to modern JavaScript |
| **html-css-architect** | Green | HTML/CSS layout and styling work |
| **pcpl-refactor-guide** | Cyan | General refactoring with OBS constraints |

## Agent Details

### 1. OBS Compatibility Guardian 🔵

**File**: `.claude/agents/obs-compatibility-guardian.md`

**Purpose**: Ensures all code changes maintain compatibility with OBS Studio browser sources and docks.

**Use This Agent When**:
- Modifying localStorage or IndexedDB access patterns
- Changing BroadcastChannel messaging
- Updating DOM structure or element IDs
- Working with file paths or asset loading
- Making any change that renders in OBS

**What This Agent Does**:
- Identifies OBS-specific constraints and pitfalls
- Provides comprehensive OBS testing checklists
- Ensures storage persistence across OBS restarts
- Validates message contracts won't break
- Creates rollback procedures for risky changes

**Example Usage**:
```
User: "I want to rename the player1Score element ID to p1-score"
Agent: This breaks the contract! The ID is referenced in multiple places.
       Here's a safe migration strategy...
```

**Key Outputs**:
- Pre-flight compatibility checklist
- OBS-specific test scenarios
- Risk assessment (Low/Medium/High)
- Integration testing steps

---

### 2. Storage Migration Expert 🟣

**File**: `.claude/agents/storage-migration-expert.md`

**Purpose**: Guides the transition from localStorage (base64 images) to IndexedDB (binary blobs).

**Use This Agent When**:
- Implementing IndexedDB storage code
- Migrating existing images from localStorage
- Adding new image upload functionality
- Debugging storage quota issues
- Planning advertising image expansion

**What This Agent Does**:
- Provides IndexedDB implementation patterns
- Creates migration routines for existing data
- Designs fallback strategies to localStorage
- Ensures OBS persistence across restarts
- Handles error cases and quota limits

**Example Usage**:
```
User: "How do I save an uploaded image to IndexedDB?"
Agent: Here's the complete pattern with blob storage,
       error handling, and localStorage fallback...
```

**Key Outputs**:
- IndexedDB wrapper code examples
- Migration phase checklists
- Persistence testing procedures
- Fallback mechanism implementation

---

### 3. Feature Planning Architect 🟠

**File**: `.claude/agents/feature-planning-architect.md`

**Purpose**: Breaks down complex features into safe, incremental phases with clear testing checkpoints.

**Use This Agent When**:
- Planning a new feature (like ball tracker, advertising system)
- Need to break down a large task
- Want phased rollout with early validation
- Identifying dependencies and risks
- Creating implementation roadmaps

**What This Agent Does**:
- Creates detailed phased implementation plans
- Identifies all file dependencies
- Maps integration points across components
- Assigns risk levels to each phase
- Provides concrete testing strategies

**Example Usage**:
```
User: "I want to add a new player statistics tracking feature"
Agent: Let me break this into 6 phases:
       Phase 0: Preparation and data model design
       Phase 1: Control panel UI for stats entry
       Phase 2: Storage layer implementation
       ...
```

**Key Outputs**:
- Multi-phase implementation plans
- Dependency maps
- Risk mitigation strategies
- Testing checklist per phase
- Technical specifications

---

### 4. State & Messaging Expert 🟡

**File**: `.claude/agents/state-messaging-expert.md`

**Purpose**: Designs robust state management and BroadcastChannel communication patterns.

**Use This Agent When**:
- Adding new state fields to localStorage
- Designing BroadcastChannel message contracts
- Debugging sync issues between panel and source
- Handling race conditions
- Managing complex JSON state

**What This Agent Does**:
- Designs clear message contracts
- Ensures control panel → browser source sync
- Handles edge cases (missing data, rapid updates)
- Creates state migration strategies
- Provides debugging techniques

**Example Usage**:
```
User: "The browser source isn't updating when I change the score"
Agent: Let me check the message flow:
       1. Control panel broadcasts
       2. Browser source receives
       3. State loads from localStorage
       Here's where it's breaking...
```

**Key Outputs**:
- Message contract specifications
- State update patterns (control panel)
- State read patterns (browser source)
- Race condition handling code
- Debug logging implementations

---

### 5. Testing & Verification Specialist 🟢

**File**: `.claude/agents/testing-verification-specialist.md`

**Purpose**: Creates comprehensive test plans and verification procedures for OBS environments.

**Use This Agent When**:
- Creating test plans for new features
- Verifying changes work in OBS
- Need regression test checklists
- Identifying edge cases to test
- Documenting expected vs actual behavior

**What This Agent Does**:
- Creates detailed test scenarios
- Provides step-by-step OBS testing procedures
- Identifies edge cases and error scenarios
- Designs regression test suites
- Documents test results and bugs

**Example Usage**:
```
User: "I just finished the ball tracker feature, what should I test?"
Agent: Here's a comprehensive test plan with 23 test cases:
       - Functional tests (enable/disable, game types, etc.)
       - Integration tests (with score updates, resets)
       - Persistence tests (OBS restart scenarios)
       - Edge cases (rapid clicks, invalid state)
```

**Key Outputs**:
- Detailed test plans with steps
- OBS-specific testing procedures
- Edge case test scenarios
- Bug report templates
- Pass/fail checklists

---

### 6. Code Modernization Guide 🔵

**File**: `.claude/agents/code-modernization-guide.md`

**Purpose**: Safely refactors legacy jQuery code to modern JavaScript while maintaining OBS compatibility.

**Use This Agent When**:
- Refactoring jQuery to vanilla JavaScript
- Adopting ES6+ features (classes, arrow functions, etc.)
- Organizing code into modules
- Improving code quality and maintainability
- Modernizing without breaking OBS

**What This Agent Does**:
- Provides safe refactoring patterns
- Shows jQuery → modern JS conversions
- Ensures OBS CEF compatibility
- Creates incremental refactoring strategies
- Improves code organization

**Example Usage**:
```
User: "Can I refactor this jQuery code to use ES6 classes?"
Agent: Yes! Here's the incremental approach:
       Step 1: Modern syntax (const, arrow functions)
       Step 2: Extract to class
       Step 3: Add async/await
       Each step is testable independently...
```

**Key Outputs**:
- Before/after code examples
- ES6+ feature compatibility matrix
- Incremental refactoring steps
- OBS compatibility checks
- Module organization strategies

---

### 7. HTML/CSS Architect 🟢

**File**: `.claude/agents/html-css-architect.md`

**Purpose**: Expert in HTML structure and CSS styling for the scoreboard overlay.

**Use This Agent When**:
- Creating new UI components
- Fixing layout/rendering issues
- Restructuring HTML for better semantics
- Debugging CSS problems
- Working with scaling variants

**What This Agent Does**:
- Writes semantic HTML5 markup
- Solves CSS layout challenges
- Handles responsive design
- Works with OBS theme variants
- Debugs rendering issues systematically

---

### 8. PCPL Refactor Guide 🔵

**File**: `.claude/agents/pcpl-refactor-guide.md`

**Purpose**: General refactoring guidance with focus on OBS constraints and project-specific patterns.

**Use This Agent When**:
- General refactoring questions
- Understanding project architecture
- Following refactoring best practices
- Maintaining OBS compatibility during changes

---

## How to Use These Agents

### In Claude Code CLI

When chatting with Claude Code, you can invoke agents using the Task tool:

```
You: "I need to plan the advertising system feature"
Claude: "I'll use the feature-planning-architect agent to create a comprehensive plan"
[Invokes Task tool with subagent_type='feature-planning-architect']
```

Claude will automatically choose the right agent based on your request, or you can explicitly ask for a specific agent:

```
You: "Use the obs-compatibility-guardian agent to review my changes"
```

### Agent Selection Matrix

**If you're...**

| Task | Use This Agent |
|------|----------------|
| Adding a new feature | feature-planning-architect |
| Changing how images are stored | storage-migration-expert |
| Modifying state or messaging | state-messaging-expert |
| Updating HTML/CSS layout | html-css-architect |
| Refactoring JavaScript code | code-modernization-guide |
| Testing in OBS | testing-verification-specialist |
| Worried about OBS compatibility | obs-compatibility-guardian |

### Multi-Agent Workflows

Some tasks benefit from using multiple agents in sequence:

**Example: Adding Ball Tracker Feature**
1. **feature-planning-architect** - Create phased implementation plan
2. **state-messaging-expert** - Design state and message contracts
3. **html-css-architect** - Design UI layout
4. **obs-compatibility-guardian** - Review for OBS issues
5. **testing-verification-specialist** - Create test plan
6. **code-modernization-guide** - Ensure code quality

**Example: Refactoring Legacy Code**
1. **code-modernization-guide** - Plan refactoring approach
2. **obs-compatibility-guardian** - Ensure OBS compatibility
3. **state-messaging-expert** - Review state management patterns
4. **testing-verification-specialist** - Verify no regressions

---

## Agent Benefits

### Better AI Guidance
- Agents have deep context about specific problem domains
- Provide detailed, actionable guidance
- Catch issues early before they reach production

### Consistent Standards
- All agents follow OBS compatibility principles
- Ensure testing happens at appropriate checkpoints
- Maintain code quality standards

### Reduced Errors
- Comprehensive checklists prevent oversights
- Multiple validation points catch issues
- Clear rollback procedures for safety

### Faster Development
- Pre-defined patterns and templates
- Don't need to re-explain context each time
- Focus on specific problem domain

---

## Tips for Working with Agents

### 1. Be Specific About Your Goal
```
❌ "I want to change some code"
✅ "I want to refactor the score update function in control_panel.js to use modern JavaScript"
```

### 2. Mention the Component You're Working On
```
❌ "How do I add a new field?"
✅ "How do I add a new field to the scoreboard state that syncs between control panel and browser source?"
```

### 3. Ask for What You Need
```
❌ "Tell me about testing"
✅ "Create a test plan for the new ball tracker feature with OBS-specific test scenarios"
```

### 4. Combine Agent Expertise
```
"Use the feature-planning-architect to create a plan, then use the
testing-verification-specialist to create the test strategy"
```

---

## Updating These Agents

Agents are defined in `.claude/agents/*.md` files. You can:
- Edit existing agents to refine their guidance
- Add new examples to agent descriptions
- Create new agents for new problem domains
- Share agents across projects

---

## Questions?

If you're unsure which agent to use, just describe your task to Claude Code and it will automatically select the most appropriate agent(s) based on your needs.

**Happy coding!** 🎱✨
