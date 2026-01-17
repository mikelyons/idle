// Building configurations
// Cost formula: base × 1.15^owned
// Rebalanced for smooth early-game progression

export const BUILDINGS = {
  shelter: {
    id: 'shelter',
    name: 'Shelter',
    description: '+10 max energy',
    baseCost: { water: 20, wood: 20, karma: 30 },
    benefits: {
      maxEnergyBonus: 10
    },
    hotkey: 'H'
  },
  wellImprovement: {
    id: 'wellImprovement',
    name: 'Better Bucket',
    description: '+1 water per carry',
    baseCost: { water: 30, wood: 15, karma: 50 },
    benefits: {
      waterPerAction: 1
    },
    hotkey: 'B'
  },
  axeRack: {
    id: 'axeRack',
    name: 'Axe Rack',
    description: '+1 wood per chop',
    baseCost: { water: 15, wood: 40, karma: 50 },
    benefits: {
      woodPerAction: 1
    },
    hotkey: 'X'
  },
  garden: {
    id: 'garden',
    name: 'Garden',
    description: '+2 passive wood/day',
    baseCost: { water: 25, wood: 60, karma: 100 },
    benefits: {
      passiveWood: 2
    },
    hotkey: 'G'
  },
  fishPond: {
    id: 'fishPond',
    name: 'Fish Pond',
    description: '+2 passive water/day',
    baseCost: { water: 60, wood: 25, karma: 100 },
    benefits: {
      passiveWater: 2
    },
    hotkey: 'F'
  },
  shrine: {
    id: 'shrine',
    name: 'Shrine',
    description: '+25% meditation karma, adds incense',
    baseCost: { water: 50, wood: 50, karma: 200 },
    benefits: {
      meditationKarmaMultiplier: 1.25
    },
    visualUnlock: 'shrine',
    hotkey: 'N'
  },
  monastery: {
    id: 'monastery',
    name: 'Monastery',
    description: '+50% meditation karma, sacred space',
    baseCost: { water: 150, wood: 150, karma: 1000 },
    benefits: {
      meditationKarmaMultiplier: 1.5
    },
    visualUnlock: 'monastery',
    hotkey: 'O'
  },
  zenGarden: {
    id: 'zenGarden',
    name: 'Zen Garden',
    description: '+3 passive karma/day, tranquil beauty',
    baseCost: { water: 100, wood: 100, karma: 500 },
    benefits: {
      passiveKarma: 3
    },
    visualUnlock: 'zenGarden',
    hotkey: 'Z'
  }
};

// Calculate scaled cost for a building based on how many are owned
export function calculateBuildingCost(buildingId, owned) {
  const building = BUILDINGS[buildingId];
  if (!building) return null;

  const scaleFactor = Math.pow(1.15, owned);

  return {
    water: Math.ceil(building.baseCost.water * scaleFactor),
    wood: Math.ceil(building.baseCost.wood * scaleFactor),
    karma: Math.ceil(building.baseCost.karma * scaleFactor)
  };
}

// Check if building should be visible (player has 30% of cost)
export function isBuildingVisible(buildingId, owned, water, wood, karma) {
  const cost = calculateBuildingCost(buildingId, owned);
  if (!cost) return false;

  const threshold = 0.3;
  return (
    water >= cost.water * threshold ||
    wood >= cost.wood * threshold ||
    karma >= cost.karma * threshold
  );
}

// Check if player can afford building
export function canAffordBuilding(buildingId, owned, water, wood, karma) {
  const cost = calculateBuildingCost(buildingId, owned);
  if (!cost) return false;

  return (
    water >= cost.water &&
    wood >= cost.wood &&
    karma >= cost.karma
  );
}

// Calculate total benefits from all owned buildings
export function calculateBuildingBenefits(buildings) {
  let benefits = {
    maxEnergyBonus: 0,
    waterPerAction: 0,
    woodPerAction: 0,
    passiveWater: 0,
    passiveWood: 0,
    passiveKarma: 0,
    meditationKarmaMultiplier: 1
  };

  Object.entries(buildings).forEach(([buildingId, count]) => {
    const building = BUILDINGS[buildingId];
    if (!building || count === 0) return;

    for (let i = 0; i < count; i++) {
      if (building.benefits.maxEnergyBonus) {
        benefits.maxEnergyBonus += building.benefits.maxEnergyBonus;
      }
      if (building.benefits.waterPerAction) {
        benefits.waterPerAction += building.benefits.waterPerAction;
      }
      if (building.benefits.woodPerAction) {
        benefits.woodPerAction += building.benefits.woodPerAction;
      }
      if (building.benefits.passiveWater) {
        benefits.passiveWater += building.benefits.passiveWater;
      }
      if (building.benefits.passiveWood) {
        benefits.passiveWood += building.benefits.passiveWood;
      }
      if (building.benefits.passiveKarma) {
        benefits.passiveKarma += building.benefits.passiveKarma;
      }
      if (building.benefits.meditationKarmaMultiplier) {
        benefits.meditationKarmaMultiplier *= building.benefits.meditationKarmaMultiplier;
      }
    }
  });

  return benefits;
}

// Get visual unlocks from buildings
export function getBuildingVisualUnlocks(buildings) {
  const unlocks = [];
  Object.entries(buildings).forEach(([buildingId, count]) => {
    const building = BUILDINGS[buildingId];
    if (building && building.visualUnlock && count > 0) {
      unlocks.push(building.visualUnlock);
    }
  });
  return unlocks;
}
