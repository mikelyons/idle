export const ENLIGHTENMENT_STAGES = [
  { stage: 0, name: 'Mundane', karmaRequired: 0 },
  { stage: 1, name: 'Seeker', karmaRequired: 0, requiresUnlock: true },
  { stage: 2, name: 'Student', karmaRequired: 500 },
  { stage: 3, name: 'Practitioner', karmaRequired: 2000 },
  { stage: 4, name: 'Adept', karmaRequired: 10000 },
  { stage: 5, name: 'Illumined', karmaRequired: 50000 },
  { stage: 6, name: 'Awakened', karmaRequired: 200000 },
  { stage: 7, name: 'Enlightened', karmaRequired: 1000000 },
];

export function calculateEnlightenmentStage(karma, seekerUnlocked = false) {
  let currentStage = 0;
  for (let i = ENLIGHTENMENT_STAGES.length - 1; i >= 0; i--) {
    const stage = ENLIGHTENMENT_STAGES[i];
    // Check if stage requires special unlock (like Seeker)
    if (stage.requiresUnlock && !seekerUnlocked) {
      continue;
    }
    if (karma >= stage.karmaRequired) {
      currentStage = i;
      break;
    }
  }
  return currentStage;
}

export function getStageInfo(stage) {
  return ENLIGHTENMENT_STAGES[stage] || ENLIGHTENMENT_STAGES[0];
}

export function getProgressToNextStage(karma, currentStage) {
  if (currentStage >= ENLIGHTENMENT_STAGES.length - 1) {
    return 100; // Max stage reached
  }

  const currentRequired = ENLIGHTENMENT_STAGES[currentStage].karmaRequired;
  const nextRequired = ENLIGHTENMENT_STAGES[currentStage + 1].karmaRequired;
  const progressKarma = karma - currentRequired;
  const neededKarma = nextRequired - currentRequired;

  return Math.min(100, Math.floor((progressKarma / neededKarma) * 100));
}

export function getKarmaToNextStage(karma, currentStage) {
  if (currentStage >= ENLIGHTENMENT_STAGES.length - 1) {
    return 0; // Max stage reached
  }

  const nextRequired = ENLIGHTENMENT_STAGES[currentStage + 1].karmaRequired;
  return nextRequired - karma;
}
