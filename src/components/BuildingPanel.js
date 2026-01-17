import React, { Component } from 'react';
import {
  BUILDINGS,
  calculateBuildingCost,
  isBuildingVisible,
  canAffordBuilding
} from '../utils/buildings';

class BuildingPanel extends Component {
  renderBuilding(buildingId) {
    const { buildings, water, wood, karma, onPurchase } = this.props;
    const building = BUILDINGS[buildingId];
    const owned = buildings[buildingId] || 0;

    const visible = isBuildingVisible(buildingId, owned, water, wood, karma);
    if (!visible) return null;

    const cost = calculateBuildingCost(buildingId, owned);
    const canAfford = canAffordBuilding(buildingId, owned, water, wood, karma);

    return (
      <div key={buildingId} className={`building-item ${canAfford ? 'affordable' : 'locked'}`}>
        <div className="building-header">
          <span className="building-name">{building.name}</span>
          {owned > 0 && <span className="building-owned">x{owned}</span>}
        </div>
        <p className="building-description">{building.description}</p>
        <div className="building-cost">
          <span className={water >= cost.water ? 'met' : 'unmet'}>
            {cost.water} water
          </span>
          <span className={wood >= cost.wood ? 'met' : 'unmet'}>
            {cost.wood} wood
          </span>
          <span className={karma >= cost.karma ? 'met' : 'unmet'}>
            {cost.karma} karma
          </span>
        </div>
        <button
          className="build-button"
          onClick={() => onPurchase(buildingId)}
          disabled={!canAfford}
        >
          <span className="hotkey">[{building.hotkey}]</span> {canAfford ? 'Build' : 'Locked'}
        </button>
      </div>
    );
  }

  render() {
    const buildingIds = Object.keys(BUILDINGS);
    const { buildings, water, wood, karma } = this.props;
    const visibleBuildings = buildingIds.filter(id =>
      isBuildingVisible(id, buildings[id] || 0, water, wood, karma)
    );

    return (
      <div className="BuildingPanel">
        <h4>Buildings</h4>
        {visibleBuildings.length === 0 ? (
          <p className="no-buildings">Gather resources to unlock buildings...</p>
        ) : (
          <div className="building-list">
            {buildingIds.map(id => this.renderBuilding(id))}
          </div>
        )}
      </div>
    );
  }
}

export default BuildingPanel;
