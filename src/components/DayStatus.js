import React, { Component } from 'react';

class DayStatus extends Component {
  render() {
    const {
      dayNumber,
      currentEnergy,
      maxEnergy,
      onSleep,
      isMeditating,
      passiveWater,
      passiveWood,
      passiveKarma
    } = this.props;

    const energyPercent = (currentEnergy / maxEnergy) * 100;
    const isExhausted = currentEnergy <= 0;
    const hasPassive = passiveWater > 0 || passiveWood > 0 || passiveKarma > 0;

    return (
      <div className="DayStatus">
        <div className="day-header">
          <span className="day-label">Day {dayNumber}</span>
          <span className="energy-numbers">{Math.floor(currentEnergy)}/{maxEnergy}</span>
        </div>

        <div className="energy-bar-container">
          <div
            className={`energy-bar-fill ${isExhausted ? 'exhausted' : ''}`}
            style={{ width: `${energyPercent}%` }}
          />
        </div>

        <div className="day-actions">
          <button
            className={`sleep-button ${isExhausted ? 'prominent' : ''}`}
            onClick={onSleep}
            disabled={isMeditating}
          >
            <span className="hotkey">[S]</span> {isExhausted ? 'Rest' : 'Sleep'}
          </button>
          {hasPassive && (
            <span className="passive-gains">
              {passiveWater > 0 && `+${passiveWater}W `}
              {passiveWood > 0 && `+${passiveWood}L `}
              {passiveKarma > 0 && `+${passiveKarma}K`}
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default DayStatus;
