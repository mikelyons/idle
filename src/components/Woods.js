import React, { Component } from 'react';

class Woods extends Component {
  render() {
    const { wood, updateWood, disabled, energyCost, currentEnergy } = this.props;
    const canAfford = currentEnergy >= energyCost;
    const isDisabled = disabled || !canAfford;

    return (
      <div className="Well">
        <button
          className="well-button action-button"
          onClick={updateWood}
          disabled={isDisabled}
        >
          <span className="hotkey">[C]</span> Chop Wood <span className="energy-cost">{energyCost} energy</span>
        </button>
        <p>{wood}</p>
        {!canAfford && !disabled && (
          <span className="not-enough-energy">Not enough energy</span>
        )}
      </div>
    );
  }
}

export default Woods;
