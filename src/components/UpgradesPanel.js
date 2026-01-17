import React, { Component } from 'react';
import {
  BUILDINGS,
  calculateBuildingCost,
  isBuildingVisible,
  canAffordBuilding
} from '../utils/buildings';
import {
  SPIRITUAL_UPGRADES,
  isUpgradeVisible,
  canPurchaseUpgrade
} from '../utils/upgrades';

class UpgradesPanel extends Component {
  getAllItems() {
    const { buildings, water, wood, karma, spiritualUpgrades } = this.props;
    const items = [];

    // Add visible buildings
    Object.entries(BUILDINGS).forEach(([id, building]) => {
      const owned = buildings[id] || 0;
      if (isBuildingVisible(id, owned, water, wood, karma)) {
        const cost = calculateBuildingCost(id, owned);
        const canAfford = canAffordBuilding(id, owned, water, wood, karma);
        items.push({
          type: 'building',
          id,
          name: building.name,
          description: building.description,
          hotkey: building.hotkey,
          owned,
          canAct: canAfford,
          cost,
          water,
          wood,
          karma
        });
      }
    });

    // Add visible spiritual upgrades
    Object.entries(SPIRITUAL_UPGRADES).forEach(([id, upgrade]) => {
      if (isUpgradeVisible(id, karma)) {
        const isOwned = spiritualUpgrades.includes(id);
        const canPurchase = canPurchaseUpgrade(id, karma, spiritualUpgrades);
        items.push({
          type: 'spiritual',
          id,
          name: upgrade.name,
          description: upgrade.description,
          hotkey: upgrade.hotkey,
          isOwned,
          canAct: canPurchase,
          karmaRequired: upgrade.karmaRequired,
          karma
        });
      }
    });

    // Sort: actionable first, then by type
    items.sort((a, b) => {
      // Owned spiritual items go last
      if (a.type === 'spiritual' && a.isOwned) return 1;
      if (b.type === 'spiritual' && b.isOwned) return -1;
      // Actionable items first
      if (a.canAct && !b.canAct) return -1;
      if (!a.canAct && b.canAct) return 1;
      return 0;
    });

    return items;
  }

  renderBuildingItem(item) {
    const { onPurchaseBuilding } = this.props;
    const costMet = {
      water: item.water >= item.cost.water,
      wood: item.wood >= item.cost.wood,
      karma: item.karma >= item.cost.karma
    };

    return (
      <div
        key={`b-${item.id}`}
        className={`upgrade-tile building ${item.canAct ? 'can-act' : ''}`}
        onClick={() => item.canAct && onPurchaseBuilding(item.id)}
        title={item.description}
      >
        <div className="tile-header">
          <span className="tile-name">{item.name}</span>
          {item.owned > 0 && <span className="tile-count">x{item.owned}</span>}
        </div>
        <div className="tile-cost">
          <span className={costMet.water ? 'met' : ''}>{item.cost.water}w</span>
          <span className={costMet.wood ? 'met' : ''}>{item.cost.wood}L</span>
          <span className={costMet.karma ? 'met' : ''}>{item.cost.karma}k</span>
        </div>
        <div className="tile-key">[{item.hotkey}]</div>
      </div>
    );
  }

  renderSpiritualItem(item) {
    const { onPurchaseUpgrade } = this.props;

    if (item.isOwned) {
      return (
        <div
          key={`s-${item.id}`}
          className="upgrade-tile spiritual owned"
          title={item.description}
        >
          <div className="tile-header">
            <span className="tile-name">{item.name}</span>
            <span className="tile-owned">&#10003;</span>
          </div>
        </div>
      );
    }

    return (
      <div
        key={`s-${item.id}`}
        className={`upgrade-tile spiritual ${item.canAct ? 'can-act' : ''}`}
        onClick={() => item.canAct && onPurchaseUpgrade(item.id)}
        title={item.description}
      >
        <div className="tile-header">
          <span className="tile-name">{item.name}</span>
        </div>
        <div className="tile-cost">
          <span className={item.karma >= item.karmaRequired ? 'met' : ''}>
            {item.karmaRequired}k
          </span>
        </div>
        <div className="tile-key">[{item.hotkey}]</div>
      </div>
    );
  }

  render() {
    const items = this.getAllItems();

    return (
      <div className="UpgradesPanel">
        <h4>Upgrades</h4>
        {items.length === 0 ? (
          <p className="no-items">Gather resources...</p>
        ) : (
          <div className="upgrades-grid">
            {items.map(item =>
              item.type === 'building'
                ? this.renderBuildingItem(item)
                : this.renderSpiritualItem(item)
            )}
          </div>
        )}
      </div>
    );
  }
}

export default UpgradesPanel;
