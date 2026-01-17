import React, { Component } from 'react';

class Meditation extends Component {
  render() {
    const {
      enlightenmentStage,
      isMeditating,
      startMeditation,
      energyCost,
      currentEnergy,
      karmaReward
    } = this.props;

    const isUnlocked = enlightenmentStage >= 1;
    const canAffordEnergy = currentEnergy >= energyCost;
    const canMeditate = isUnlocked && !isMeditating && canAffordEnergy;

    return (
      <div className="Well Meditation">
        <button
          className="well-button action-button meditation-button"
          onClick={startMeditation}
          disabled={!canMeditate}
        >
          {!isUnlocked ? (
            <span>Locked</span>
          ) : (
            <>
              <span className="hotkey">[M]</span> Meditate <span className="energy-cost">{energyCost} energy</span>
            </>
          )}
        </button>
        <p>{isUnlocked ? `+${karmaReward} karma` : 'Reach Seeker'}</p>
      </div>
    );
  }
}

export default Meditation;
