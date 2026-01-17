# Idle Meditation Game

A spiritual-themed idle/incremental game built with React, inspired by Kittens Game.

## Quick Start

```bash
npm install
npm start
# Open http://localhost:3000
```

## Core Game Loop

Wake → Spend energy on chores/meditation → Sleep → New day

- **100 energy per day** (increases with upgrades/buildings)
- **Chores**: Carry Water [W], Chop Wood [C] - cost energy, gain resources + karma
- **Meditation** [M]: Costs energy, gains karma (unlocks at Seeker stage)
- **Sleep** [S]: Ends day, resets energy, applies passive gains

## Architecture

### Main Files

| File | Purpose |
|------|---------|
| `src/App.js` | Main game state, logic, and layout |
| `src/styles/App.css` | All component styling |
| `src/styles/theme.css` | Dark theme with stage-based color progression |

### Components

| Component | Purpose |
|-----------|---------|
| `DayStatus.js` | Day number, energy bar, sleep button |
| `Character.js` | Player stats (resources, karma) |
| `EnlightenmentProgress.js` | Karma progress toward next stage |
| `Well.js` | Carry water action button |
| `Woods.js` | Chop wood action button |
| `Meditation.js` | Meditation action button |
| `UpgradesPanel.js` | Unified buildings + spiritual upgrades grid |
| `MessageHistory.js` | Game event log |
| `Header.js` / `Footer.js` | App chrome |

### Utility Modules

| File | Purpose |
|------|---------|
| `utils/buildings.js` | Building configs, costs, benefits |
| `utils/upgrades.js` | Spiritual upgrade configs, effects |
| `utils/enlightenment.js` | Karma thresholds for stages |

## Game Systems

### Enlightenment Stages (0-7)

Each stage changes the theme color and unlocks features:
- 0: Mundane (dark slate)
- 1: Seeker (warm ember) - unlocks meditation
- 2: Student (deep ocean)
- 3: Practitioner (forest depths)
- 4: Adept (ancient gold)
- 5: Illumined (deep violet)
- 6: Awakened (cosmic indigo)
- 7: Enlightened (transcendent radiance)

### Buildings

Purchased with water + wood + karma threshold. Provide passive benefits:
- Shelter, Better Bucket, Axe Rack, Garden, Fish Pond, Shrine, Monastery, Zen Garden

Buildings appear when player has 30% of cost (progressive disclosure).
Costs scale: `base × 1.15^owned`

### Spiritual Upgrades

Require karma threshold (not consumed). Provide permanent multipliers:
- Mindfulness, Focus, Discipline, Inner Calm, Enlightened Labor, Deep Meditation, Restful Sleep, Serenity, Oneness, Transcendence

### Visual Unlocks

Decorative elements that appear as you progress:
- Lotus, mandala, enso decorations
- Glow, aura, particles effects
- Stage-specific color themes

## Keyboard Shortcuts

### Actions
- `W` - Carry Water
- `C` - Chop Wood
- `M` - Meditate
- `S` - Sleep

### Buildings
- `H` - Shelter
- `B` - Better Bucket
- `X` - Axe Rack
- `G` - Garden
- `F` - Fish Pond
- `N` - Shrine
- `O` - Monastery
- `Z` - Zen Garden

### Upgrades
- `1-0` - Spiritual upgrades (in order)

## Theme System

Dark mode theme with CSS variables. Each enlightenment stage has unique colors while staying in the dark spectrum. Variables defined in `theme.css`:

- `--bg-primary`, `--bg-secondary`, `--bg-card`
- `--text-primary`, `--text-light`, `--text-muted`
- `--karma-color`, `--progress-fill`
- `--border-light`, `--border-muted`

## Layout

```
┌─────────────────────────────────────────────────────┐
│                    HEADER                           │
├──────────────┬────────────────────┬─────────────────┤
│ Character    │ DayStatus          │ UpgradesPanel   │
│ Enlightment  │ [Energy Bar]       │ (tetris grid)   │
│ Progress     │ [Sleep]            │                 │
│              │                    │ Buildings +     │
│              │ Well  Woods  Med   │ Spiritual in    │
│              │                    │ one unified     │
│              │ MessageHistory     │ column          │
├──────────────┴────────────────────┴─────────────────┤
│                    FOOTER                           │
└─────────────────────────────────────────────────────┘
```

## State Shape (App.js)

```javascript
{
  // Resources
  water: 0,
  wood: 0,
  karma: 0,

  // Day/Energy
  dayNumber: 1,
  currentEnergy: 100,
  maxEnergy: 100,

  // Progression
  enlightenmentStage: 0,
  buildings: { shelter: 0, wellImprovement: 0, ... },
  spiritualUpgrades: [], // array of purchased upgrade IDs
  visualUnlocks: [], // array of unlocked visual effect IDs

  // UI
  messages: [],
  isMeditating: false,
  meditationSessions: 0
}
```
