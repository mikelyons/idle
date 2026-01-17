// Spiritual Upgrade configurations
// Tiered progression with visual unlocks
// Karma is required but NOT consumed

export const SPIRITUAL_UPGRADES = {
  // Tier 1 - Early game (10-50 karma)
  mindfulness: {
    id: 'mindfulness',
    name: 'Mindfulness',
    description: 'Awareness blooms - lotus appears',
    karmaRequired: 10,
    effect: {},
    visualUnlock: 'lotus',
    hotkey: '1'
  },

  // Tier 2 - Getting started (50-150 karma)
  focus: {
    id: 'focus',
    name: 'Focus',
    description: '+15% meditation karma',
    karmaRequired: 50,
    effect: {
      meditationKarmaMultiplier: 1.15
    },
    visualUnlock: 'ripples',
    hotkey: '2'
  },

  discipline: {
    id: 'discipline',
    name: 'Discipline',
    description: '-15% chore energy cost',
    karmaRequired: 75,
    effect: {
      choreEnergyCostMultiplier: 0.85
    },
    hotkey: '3'
  },

  // Tier 3 - Mid game (150-500 karma)
  innerCalm: {
    id: 'innerCalm',
    name: 'Inner Calm',
    description: '+15 max energy, peaceful aura',
    karmaRequired: 150,
    effect: {
      maxEnergyBonus: 15
    },
    visualUnlock: 'aura',
    hotkey: '4'
  },

  enlightenedLabor: {
    id: 'enlightenedLabor',
    name: 'Enlightened Labor',
    description: 'Chores give +50% karma',
    karmaRequired: 250,
    effect: {
      choreKarmaMultiplier: 1.5
    },
    hotkey: '5'
  },

  // Tier 4 - Late game (500-2000 karma)
  deepMeditation: {
    id: 'deepMeditation',
    name: 'Deep Meditation',
    description: '2x meditation karma, mandala appears',
    karmaRequired: 500,
    effect: {
      meditationKarmaMultiplier: 2
    },
    visualUnlock: 'mandala',
    hotkey: '6'
  },

  restfulSleep: {
    id: 'restfulSleep',
    name: 'Restful Sleep',
    description: 'Sleep restores +25% energy',
    karmaRequired: 750,
    effect: {
      sleepEnergyMultiplier: 1.25
    },
    hotkey: '7'
  },

  serenity: {
    id: 'serenity',
    name: 'Serenity',
    description: '+5 karma while sleeping',
    karmaRequired: 1000,
    effect: {
      passiveKarmaOnSleep: 5
    },
    visualUnlock: 'yinyang',
    hotkey: '8'
  },

  // Tier 5 - End game (2000+ karma)
  oneness: {
    id: 'oneness',
    name: 'Oneness',
    description: 'All bonuses +10%, cosmic unity',
    karmaRequired: 2000,
    effect: {
      globalMultiplier: 1.1
    },
    visualUnlock: 'enso',
    hotkey: '9'
  },

  transcendence: {
    id: 'transcendence',
    name: 'Transcendence',
    description: 'Ultimate enlightenment achieved',
    karmaRequired: 5000,
    effect: {
      meditationKarmaMultiplier: 1.5,
      maxEnergyBonus: 50
    },
    visualUnlock: 'transcendence',
    hotkey: '0'
  }
};

// Check if upgrade is visible (karma >= 50% of requirement)
export function isUpgradeVisible(upgradeId, karma) {
  const upgrade = SPIRITUAL_UPGRADES[upgradeId];
  if (!upgrade) return false;

  return karma >= upgrade.karmaRequired * 0.5;
}

// Check if upgrade can be purchased (karma >= requirement, not already owned)
export function canPurchaseUpgrade(upgradeId, karma, ownedUpgrades) {
  const upgrade = SPIRITUAL_UPGRADES[upgradeId];
  if (!upgrade) return false;

  return (
    karma >= upgrade.karmaRequired &&
    !ownedUpgrades.includes(upgradeId)
  );
}

// Calculate total effects from all owned upgrades
export function calculateUpgradeEffects(ownedUpgrades) {
  let effects = {
    meditationKarmaMultiplier: 1,
    sleepEnergyMultiplier: 1,
    choreEnergyCostMultiplier: 1,
    choreKarmaMultiplier: 1,
    passiveKarmaOnSleep: 0,
    maxEnergyBonus: 0,
    globalMultiplier: 1
  };

  ownedUpgrades.forEach(upgradeId => {
    const upgrade = SPIRITUAL_UPGRADES[upgradeId];
    if (!upgrade) return;

    if (upgrade.effect.meditationKarmaMultiplier) {
      effects.meditationKarmaMultiplier *= upgrade.effect.meditationKarmaMultiplier;
    }
    if (upgrade.effect.sleepEnergyMultiplier) {
      effects.sleepEnergyMultiplier *= upgrade.effect.sleepEnergyMultiplier;
    }
    if (upgrade.effect.choreEnergyCostMultiplier) {
      effects.choreEnergyCostMultiplier *= upgrade.effect.choreEnergyCostMultiplier;
    }
    if (upgrade.effect.choreKarmaMultiplier) {
      effects.choreKarmaMultiplier *= upgrade.effect.choreKarmaMultiplier;
    }
    if (upgrade.effect.passiveKarmaOnSleep) {
      effects.passiveKarmaOnSleep += upgrade.effect.passiveKarmaOnSleep;
    }
    if (upgrade.effect.maxEnergyBonus) {
      effects.maxEnergyBonus += upgrade.effect.maxEnergyBonus;
    }
    if (upgrade.effect.globalMultiplier) {
      effects.globalMultiplier *= upgrade.effect.globalMultiplier;
    }
  });

  return effects;
}

// Get visual unlocks from upgrades
export function getUpgradeVisualUnlocks(ownedUpgrades) {
  const unlocks = [];
  ownedUpgrades.forEach(upgradeId => {
    const upgrade = SPIRITUAL_UPGRADES[upgradeId];
    if (upgrade && upgrade.visualUnlock) {
      unlocks.push(upgrade.visualUnlock);
    }
  });
  return unlocks;
}

// Energy costs for actions (base values)
export const ACTION_COSTS = {
  water: 10,
  wood: 12,
  meditate: 20
};

// Karma rewards for actions (base values)
export const KARMA_REWARDS = {
  water: 2,
  wood: 3,
  meditate: 15
};
