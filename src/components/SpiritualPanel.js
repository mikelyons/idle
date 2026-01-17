import React, { Component } from 'react';
import {
  SPIRITUAL_UPGRADES,
  isUpgradeVisible,
  canPurchaseUpgrade
} from '../utils/upgrades';

class SpiritualPanel extends Component {
  renderUpgrade(upgradeId) {
    const { karma, spiritualUpgrades, onPurchase } = this.props;
    const upgrade = SPIRITUAL_UPGRADES[upgradeId];

    const visible = isUpgradeVisible(upgradeId, karma);
    if (!visible) return null;

    const isOwned = spiritualUpgrades.includes(upgradeId);
    const canPurchase = canPurchaseUpgrade(upgradeId, karma, spiritualUpgrades);

    return (
      <div key={upgradeId} className={`upgrade-item ${isOwned ? 'owned' : canPurchase ? 'available' : 'locked'}`}>
        <div className="upgrade-header">
          <span className="upgrade-name">{upgrade.name}</span>
          {isOwned && <span className="upgrade-owned">Attained</span>}
        </div>
        <p className="upgrade-description">{upgrade.description}</p>
        {!isOwned && (
          <div className="upgrade-requirement">
            <span className={karma >= upgrade.karmaRequired ? 'met' : 'unmet'}>
              {upgrade.karmaRequired} karma needed
            </span>
          </div>
        )}
        {!isOwned && (
          <button
            className="upgrade-button"
            onClick={() => onPurchase(upgradeId)}
            disabled={!canPurchase}
          >
            <span className="hotkey">[{upgrade.hotkey}]</span> {canPurchase ? 'Attain' : 'Locked'}
          </button>
        )}
      </div>
    );
  }

  render() {
    const { karma, spiritualUpgrades } = this.props;
    const upgradeIds = Object.keys(SPIRITUAL_UPGRADES);
    const visibleUpgrades = upgradeIds.filter(id => isUpgradeVisible(id, karma));

    return (
      <div className="SpiritualPanel">
        <h4>Spiritual Path</h4>
        {visibleUpgrades.length === 0 ? (
          <p className="no-upgrades">Accumulate karma to begin your journey...</p>
        ) : (
          <div className="upgrade-list">
            {upgradeIds.map(id => this.renderUpgrade(id))}
          </div>
        )}
        {spiritualUpgrades.length > 0 && (
          <div className="owned-count">
            {spiritualUpgrades.length} / {upgradeIds.length} attained
          </div>
        )}
      </div>
    );
  }
}

export default SpiritualPanel;
