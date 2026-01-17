# Idle Game - Project Documentation

> "Chop Wood, Carry Water: The Game"

A React-based idle/clicker browser game created as a learning project.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Developer's Vision](#developers-vision)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Game Mechanics](#game-mechanics)
6. [Components](#components)
7. [Styling](#styling)
8. [Development](#development)
9. [Known Issues](#known-issues)

---

## Project Overview

**Name:** Idle (Raint Game)
**Version:** 0.1.0
**Type:** Idle/Clicker Browser Game
**Framework:** React (Create React App)

This is a personal learning project exploring React fundamentals through building an idle game mechanic. Players collect resources (water, wood) and accumulate karma over time.

---

## Developer's Vision

### The Journey to Enlightenment

This idle clicker game guides a total beginner through all the stages of spiritual growth, culminating in ultimate awakening and enlightenment.

### Dual Nature of Gameplay

The game operates on two parallel tracks:

**Mundane Layer - Survival & Daily Life**
- Taking care of base everyday survival needs
- Activities of daily life (chopping wood, carrying water)
- Resource management and basic necessities
- The grounded, physical aspect of existence

**Spiritual Layer - Practice & Awakening**
- Spiritual practices and disciplines
- Realizations and insights
- Mystical experiences and altered states
- The transcendent journey toward enlightenment

### Progressive Visual Transformation

As the player advances spiritually, the interface itself undergoes a metamorphosis:

| Stage | Interface State |
|-------|-----------------|
| Beginning | Clean, minimal, mundane |
| Mid-game | Subtle spiritual symbols emerge |
| Late-game | Rich mystical imagery |
| End-game | Psychedelic/occult phenomena |

The end-game interface becomes a visual representation of expanded consciousness - filled with spiritual graphics, sacred geometry, and otherworldly visual phenomena. The transformation is gradual and subtle, rewarding long-term players with an increasingly transcendent aesthetic experience.

### Design Philosophy

> "Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water."

The game embodies this Zen teaching - the mundane activities remain constant, but the player's perception and the visual world around them transforms completely.

---

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| UI Framework | React | 16.7.0 |
| DOM Bindings | React DOM | 16.7.0 |
| Build Tools | React Scripts | 2.1.5 |
| Backend | Firebase | 5.8.2 |
| Package Manager | Yarn | - |

**Browser Support:** Modern browsers (>0.2% market share), no IE11 or Opera Mini

---

## Project Structure

```
idle/
├── public/                     # Static files
│   ├── index.html             # Main HTML entry (title: "Raint Game")
│   ├── manifest.json          # PWA manifest
│   └── favicon.ico
│
├── src/                        # Source code
│   ├── index.js               # React entry point
│   ├── App.js                 # Main application (state container)
│   ├── firebase.config.js     # Firebase configuration
│   │
│   ├── components/            # React components
│   │   ├── Character.js       # Player status display
│   │   ├── Header.js          # Header with greeting
│   │   ├── Footer.js          # Footer component
│   │   ├── Logo.js            # Spinning buddha logo
│   │   ├── Well.js            # Water collection
│   │   ├── Woods.js           # Wood chopping
│   │   ├── Karma.js           # Karma tracking
│   │   ├── Wallet.js          # Placeholder component
│   │   ├── MessageHistory.js  # Event log display
│   │   │
│   │   ├── forms/             # Form utilities (legacy)
│   │   │   ├── TextInput.js
│   │   │   └── codepenForms.js
│   │   │
│   │   └── time/              # Time utilities
│   │       ├── GoodMorningNight.js
│   │       └── ElapsedTimeInSeconds.js
│   │
│   └── styles/                # Stylesheets
│       ├── App.css            # Main styles (166 lines)
│       ├── index.css          # Global styles
│       └── reset.css          # CSS reset
│
├── assets/                    # Game assets
│   ├── black-buddha.png       # Buddha logo image
│   └── logo.svg               # SVG logo
│
├── scratch/                   # Experimental code
│   ├── Scratch.js
│   └── component.js
│
├── package.json               # NPM configuration
├── yarn.lock                  # Yarn lockfile
└── README.md                  # Project readme
```

---

## Game Mechanics

### Core Game State

The main application (`App.js`) manages all game state:

```javascript
state = {
  water: 0,           // Water resource count
  wood: 0,            // Wood resource count
  karma: 0,           // Karma points
  clicks: 0,          // Total click count
  messages: [],       // Message history log
  elapsedTime: 0,     // Seconds since game start
  date: timestamp,    // Game start time
  name: "Anonymous"   // Player name
}
```

### Resource Collection

| Resource | Component | Action | Button Text |
|----------|-----------|--------|-------------|
| Water | Well | +1 water per click | "Carry Water" |
| Wood | Woods | +1 wood per click | "Chop Wood" |
| Karma | Karma | +elapsedTime every 100s | (passive) |

### Water Tax System

Water depletes automatically:
- **Rate:** -1 water every 15 seconds
- **Implementation:** `setInterval` in `App.js`

### Click Tracking

Global click tracking via `mousedown` event listener on the document. All clicks are counted in state.

---

## Components

### Component Hierarchy

```
App (state container)
├── Header
│   └── GoodMorningNight
├── Character
│   └── ElapsedTimeInSeconds
├── Wallet (placeholder)
├── Well
├── Woods
├── Karma
├── MessageHistory
├── Logo
└── Footer
```

### Component Details

#### `App.js` (Main Container)
- Class-based component
- Centralized state management
- Handles all resource updates
- Sets up intervals for time-based mechanics

#### `Character.js`
- Displays player stats: name, water, wood, karma, age, clicks
- Contains hidden name change form

#### `Well.js`
- Water collection button
- Displays current water count
- Adds message on collection: "ahh a nice refreshing drink"

#### `Woods.js`
- Wood chopping button
- Displays current wood count
- Adds message on collection: "More wood for the fire"

#### `Karma.js`
- Displays karma count
- Updates every 100 seconds

#### `Header.js`
- Game title: "Chop Wood, Carry Water: The Game"
- Time-based greeting via `GoodMorningNight`

#### `GoodMorningNight.js`
Dynamic greeting based on hour:
- 0-1h: Witching hour
- 0-11h: Morning
- 12-16h: Afternoon
- 17-19h: Evening
- 20-23h: Night

#### `MessageHistory.js`
- Event log showing recent actions
- Displays messages in reverse chronological order
- 300px height container with overflow hidden

#### `Logo.js`
- Buddha image with 20-second rotation animation
- Start game prompt

---

## Styling

### Layout

Three-column float-based layout:
- **Left sidebar:** 25% width (Character, Wallet)
- **Center column:** 75% width (Game mechanics)
- **Right sidebar:** 0% width (placeholder)

Main row containers: 420px height

### Color Scheme

| Element | Color |
|---------|-------|
| Background | Light grey (#eee) |
| Header | Dark (#282c34) |
| Text | Whitesmoke / Black |
| Accent | Yellow |
| Borders | White, green, black |

### Visual Effects

- **Rainbow animation:** Applied to H1 elements
- **Logo spin:** 20-second continuous rotation
- **Splash text:** Rotated -20 degrees

### Responsive Design

Mobile breakpoint at `max-width: 600px` switches to single column layout.

---

## Development

### Available Scripts

```bash
# Start development server (localhost:3000)
yarn start

# Build for production
yarn build

# Run tests
yarn test

# Eject from Create React App (irreversible)
yarn eject
```

### Firebase Configuration

Firebase is configured in `src/firebase.config.js`:
- Project: `clickergame-8bcc0`
- Features: Auth domain, database, storage, messaging

**Note:** Firebase is initialized but not actively used in current components.

---

## Known Issues

### Technical Debt

1. **Firebase Credentials Exposed**
   - API key in source code
   - Should use environment variables

2. **Memory Leaks Risk**
   - Multiple `setInterval` calls without cleanup
   - Missing `componentWillUnmount` cleanup

3. **State Duplication**
   - Woods component maintains duplicate of parent water state

4. **Performance**
   - Global click tracking on document could impact performance

### Incomplete Features

- `Wallet` component is an empty stub
- Form components in `/forms` appear unused
- Commented out service worker registration

### Code Quality

- CSS duplication (App.css exists in multiple locations)
- Legacy form code uses older React patterns
- Some components lack PropTypes validation

---

## Statistics

| Metric | Count |
|--------|-------|
| JavaScript files | 20 |
| CSS files | 3 |
| Main components | 8 |
| Utility components | 4 |
| Lines in App.js | 151 |
| Dependencies | 4 |

---

## Git History

Recent commits show active development with ongoing refactoring:

```
98b3aeb - running again after reorging styles n stuff
3b57dbc - updating readme for great justice
20b6522 - I dont remember what I was doing but heres the last commit
5716943 - message history, wood/water count, 15 second water tax
427e729 - new layout before ripping it apart
```

---

*Documentation generated January 2026*
