import React, { Component } from 'react';

class Well extends Component {
  render() {
    const { water, updateWater, disabled, energyCost, currentEnergy } = this.props;
    const canAfford = currentEnergy >= energyCost;
    const isDisabled = disabled || !canAfford;

    return (
      <div className="Well">
        <button
          className="well-button action-button"
          onClick={updateWater}
          disabled={isDisabled}
        >
          <span className="hotkey">[W]</span> Carry Water <span className="energy-cost">{energyCost} energy</span>
        </button>
        <p>{water}</p>
        {!canAfford && !disabled && (
          <span className="not-enough-energy">Not enough energy</span>
        )}
      </div>
    );
  }
}

export default Well;
