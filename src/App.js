import React, { Component } from 'react';

import './styles/reset.css';
import './styles/theme.css';
import './styles/App.css';

import Header from './components/Header.js';
import Footer from './components/Footer.js';

import Well from './components/Well.js';
import Woods from './components/Woods.js';

import Character from './components/Character.js';
import EnlightenmentProgress from './components/EnlightenmentProgress.js';
import Meditation from './components/Meditation.js';
import DayStatus from './components/DayStatus.js';
import UpgradesPanel from './components/UpgradesPanel.js';

import MessageHistory from './components/MessageHistory.js'

import { calculateEnlightenmentStage } from './utils/enlightenment';
import {
  BUILDINGS,
  calculateBuildingCost,
  canAffordBuilding,
  calculateBuildingBenefits,
  getBuildingVisualUnlocks
} from './utils/buildings';
import {
  SPIRITUAL_UPGRADES,
  ACTION_COSTS,
  KARMA_REWARDS,
  calculateUpgradeEffects,
  getUpgradeVisualUnlocks
} from './utils/upgrades';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Resources
      water: 0,
      wood: 0,
      karma: 0,

      // Character
      name: "Seeker",
      date: new Date(),
      elapsedTime: 0,
      clicks: 0,

      // Messages
      messages: ["Your journey begins..."],

      // Enlightenment
      enlightenmentStage: 0,
      seekerUnlocked: false,

      // Meditation
      isMeditating: false,
      meditationSessions: 0,

      // Day/Energy System
      dayNumber: 1,
      currentEnergy: 100,
      maxEnergy: 100,

      // Buildings (owned count)
      buildings: {
        shelter: 0,
        wellImprovement: 0,
        axeRack: 0,
        garden: 0,
        fishPond: 0,
        shrine: 0,
        monastery: 0,
        zenGarden: 0
      },

      // Spiritual upgrades (purchased IDs)
      spiritualUpgrades: [],

      // Visual unlocks collected
      visualUnlocks: []
    }
  }

  // Get all visual unlocks (from buildings + upgrades + milestones)
  getVisualUnlocks = () => {
    const buildingUnlocks = getBuildingVisualUnlocks(this.state.buildings);
    const upgradeUnlocks = getUpgradeVisualUnlocks(this.state.spiritualUpgrades);
    return [...new Set([...this.state.visualUnlocks, ...buildingUnlocks, ...upgradeUnlocks])];
  }

  // Calculate effective energy costs based on upgrades
  getEnergyCosts = () => {
    const upgradeEffects = calculateUpgradeEffects(this.state.spiritualUpgrades);
    return {
      water: Math.ceil(ACTION_COSTS.water * upgradeEffects.choreEnergyCostMultiplier),
      wood: Math.ceil(ACTION_COSTS.wood * upgradeEffects.choreEnergyCostMultiplier),
      meditate: ACTION_COSTS.meditate
    };
  }

  // Calculate karma rewards with multipliers
  getKarmaRewards = () => {
    const upgradeEffects = calculateUpgradeEffects(this.state.spiritualUpgrades);
    const globalMult = upgradeEffects.globalMultiplier;
    return {
      water: Math.floor(KARMA_REWARDS.water * upgradeEffects.choreKarmaMultiplier * globalMult),
      wood: Math.floor(KARMA_REWARDS.wood * upgradeEffects.choreKarmaMultiplier * globalMult)
    };
  }

  // Calculate meditation karma reward with all multipliers
  getMeditationKarmaReward = () => {
    const buildingBenefits = calculateBuildingBenefits(this.state.buildings);
    const upgradeEffects = calculateUpgradeEffects(this.state.spiritualUpgrades);
    return Math.floor(
      KARMA_REWARDS.meditate *
      buildingBenefits.meditationKarmaMultiplier *
      upgradeEffects.meditationKarmaMultiplier *
      upgradeEffects.globalMultiplier
    );
  }

  // Calculate max energy with building and upgrade bonuses
  getMaxEnergy = () => {
    const buildingBenefits = calculateBuildingBenefits(this.state.buildings);
    const upgradeEffects = calculateUpgradeEffects(this.state.spiritualUpgrades);
    return this.state.maxEnergy + buildingBenefits.maxEnergyBonus + upgradeEffects.maxEnergyBonus;
  }

  // Calculate water gained per action
  getWaterPerAction = () => {
    const buildingBenefits = calculateBuildingBenefits(this.state.buildings);
    return 1 + buildingBenefits.waterPerAction;
  }

  // Calculate wood gained per action
  getWoodPerAction = () => {
    const buildingBenefits = calculateBuildingBenefits(this.state.buildings);
    return 1 + buildingBenefits.woodPerAction;
  }

  updateMessages = (message) => {
    let messageArray = [...this.state.messages];
    messageArray.push(message);
    // Keep only last 50 messages
    if (messageArray.length > 50) {
      messageArray = messageArray.slice(-50);
    }
    this.setState({ messages: messageArray });
  }

  updateElapsedTime = () => {
    let endTime = new Date();
    var timeDiff = endTime - this.state.date;
    this.setState({ elapsedTime: timeDiff });
  }

  updateWater = () => {
    const energyCost = this.getEnergyCosts().water;
    if (this.state.currentEnergy < energyCost) return;

    const waterGain = this.getWaterPerAction();
    const karmaGain = this.getKarmaRewards().water;

    this.setState(prevState => ({
      water: prevState.water + waterGain,
      currentEnergy: prevState.currentEnergy - energyCost,
      karma: prevState.karma + karmaGain
    }), () => {
      this.updateElapsedTime();
      this.updateMessages(`Carried ${waterGain} water. (+${karmaGain} karma)`);
      this.checkEnlightenmentStage();
      this.checkMilestones();
    });
  }

  updateWood = () => {
    const energyCost = this.getEnergyCosts().wood;
    if (this.state.currentEnergy < energyCost) return;

    const woodGain = this.getWoodPerAction();
    const karmaGain = this.getKarmaRewards().wood;

    this.setState(prevState => ({
      wood: prevState.wood + woodGain,
      currentEnergy: prevState.currentEnergy - energyCost,
      karma: prevState.karma + karmaGain
    }), () => {
      this.updateElapsedTime();
      this.updateMessages(`Chopped ${woodGain} wood. (+${karmaGain} karma)`);
      this.checkEnlightenmentStage();
      this.checkMilestones();
    });
  }

  countClick = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  }

  checkEnlightenmentStage = () => {
    const newStage = calculateEnlightenmentStage(this.state.karma, this.state.seekerUnlocked);
    if (newStage !== this.state.enlightenmentStage) {
      this.setState({ enlightenmentStage: newStage });
      this.updateMessages(`You have reached Stage ${newStage}: ${this.getStageName(newStage)}!`);
    }
  }

  // Check for visual unlock milestones
  checkMilestones = () => {
    const { karma, visualUnlocks, meditationSessions } = this.state;
    const newUnlocks = [...visualUnlocks];

    // Karma milestones
    if (karma >= 100 && !visualUnlocks.includes('glow')) {
      newUnlocks.push('glow');
      this.updateMessages("A gentle glow surrounds your practice...");
    }
    if (karma >= 500 && !visualUnlocks.includes('particles')) {
      newUnlocks.push('particles');
      this.updateMessages("Energy particles dance in your presence...");
    }
    if (karma >= 1500 && !visualUnlocks.includes('halo')) {
      newUnlocks.push('halo');
      this.updateMessages("A soft halo forms above...");
    }

    // Meditation milestones
    if (meditationSessions >= 1 && !visualUnlocks.includes('firstMeditation')) {
      newUnlocks.push('firstMeditation');
    }
    if (meditationSessions >= 10 && !visualUnlocks.includes('dedicatedPractice')) {
      newUnlocks.push('dedicatedPractice');
      this.updateMessages("Your dedication to practice deepens...");
    }

    if (newUnlocks.length !== visualUnlocks.length) {
      this.setState({ visualUnlocks: newUnlocks });
    }
  }

  unlockSeeker = () => {
    if (!this.state.seekerUnlocked) {
      this.setState({ seekerUnlocked: true }, () => {
        this.checkEnlightenmentStage();
        this.updateMessages("Your curiosity has awakened something within...");
      });
    }
  }

  getStageName = (stage) => {
    const names = ['Mundane', 'Seeker', 'Student', 'Practitioner', 'Adept', 'Illumined', 'Awakened', 'Enlightened'];
    return names[stage] || 'Unknown';
  }

  // Meditation is instant (costs energy, gives karma immediately)
  startMeditation = () => {
    const energyCost = this.getEnergyCosts().meditate;
    if (this.state.enlightenmentStage < 1) return;
    if (this.state.currentEnergy < energyCost) return;

    const karmaReward = this.getMeditationKarmaReward();

    this.setState(prevState => ({
      currentEnergy: prevState.currentEnergy - energyCost,
      karma: prevState.karma + karmaReward,
      meditationSessions: prevState.meditationSessions + 1
    }), () => {
      this.updateMessages(`Meditated deeply. (+${karmaReward} karma)`);
      this.checkEnlightenmentStage();
      this.checkMilestones();
    });
  }

  // Sleep: Reset energy, advance day, apply passive gains
  handleSleep = () => {
    const buildingBenefits = calculateBuildingBenefits(this.state.buildings);
    const upgradeEffects = calculateUpgradeEffects(this.state.spiritualUpgrades);
    const maxEnergy = this.getMaxEnergy();

    // Calculate energy restored (with upgrade bonus)
    const energyRestored = Math.floor(maxEnergy * upgradeEffects.sleepEnergyMultiplier);
    const finalEnergy = Math.min(energyRestored, maxEnergy);

    // Passive gains from buildings
    const passiveWater = buildingBenefits.passiveWater;
    const passiveWood = buildingBenefits.passiveWood;
    const passiveKarmaBuilding = buildingBenefits.passiveKarma || 0;

    // Passive karma from upgrades
    const passiveKarmaUpgrade = upgradeEffects.passiveKarmaOnSleep;
    const totalPassiveKarma = passiveKarmaBuilding + passiveKarmaUpgrade;

    this.setState(prevState => ({
      dayNumber: prevState.dayNumber + 1,
      currentEnergy: finalEnergy,
      water: prevState.water + passiveWater,
      wood: prevState.wood + passiveWood,
      karma: prevState.karma + totalPassiveKarma
    }), () => {
      let sleepMessage = `Day ${this.state.dayNumber} dawns.`;
      if (passiveWater > 0 || passiveWood > 0) {
        sleepMessage += ` Gained: ${passiveWater > 0 ? `+${passiveWater} water ` : ''}${passiveWood > 0 ? `+${passiveWood} wood` : ''}`;
      }
      if (totalPassiveKarma > 0) {
        sleepMessage += ` (+${totalPassiveKarma} karma)`;
      }
      this.updateMessages(sleepMessage);
      this.checkEnlightenmentStage();
    });
  }

  // Purchase building
  purchaseBuilding = (buildingId) => {
    const building = BUILDINGS[buildingId];
    if (!building) return;

    const owned = this.state.buildings[buildingId] || 0;
    if (!canAffordBuilding(buildingId, owned, this.state.water, this.state.wood, this.state.karma)) {
      return;
    }

    const cost = calculateBuildingCost(buildingId, owned);

    this.setState(prevState => ({
      water: prevState.water - cost.water,
      wood: prevState.wood - cost.wood,
      buildings: {
        ...prevState.buildings,
        [buildingId]: (prevState.buildings[buildingId] || 0) + 1
      }
    }), () => {
      this.updateMessages(`Built ${building.name}!`);
      if (building.visualUnlock) {
        this.updateMessages(`New visual: ${building.visualUnlock} unlocked!`);
      }
    });
  }

  // Purchase spiritual upgrade
  purchaseUpgrade = (upgradeId) => {
    const upgrade = SPIRITUAL_UPGRADES[upgradeId];
    if (!upgrade) return;
    if (this.state.spiritualUpgrades.includes(upgradeId)) return;
    if (this.state.karma < upgrade.karmaRequired) return;

    this.setState(prevState => ({
      spiritualUpgrades: [...prevState.spiritualUpgrades, upgradeId]
    }), () => {
      this.updateMessages(`Attained ${upgrade.name}!`);
      if (upgrade.visualUnlock) {
        this.updateMessages(`Your spirit manifests: ${upgrade.visualUnlock}`);
      }
    });
  }

  handleKeyDown = (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const key = e.key.toLowerCase();

    // Main actions
    switch (key) {
      case 'w':
        this.updateWater();
        break;
      case 'c':
        this.updateWood();
        break;
      case 'm':
        this.startMeditation();
        break;
      case 's':
        this.handleSleep();
        break;
      default:
        break;
    }

    // Building hotkeys
    Object.entries(BUILDINGS).forEach(([id, building]) => {
      if (key === building.hotkey.toLowerCase()) {
        this.purchaseBuilding(id);
      }
    });

    // Upgrade hotkeys (1-0)
    Object.entries(SPIRITUAL_UPGRADES).forEach(([id, upgrade]) => {
      if (key === upgrade.hotkey) {
        this.purchaseUpgrade(id);
      }
    });
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.countClick);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.countClick);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const visualUnlocks = this.getVisualUnlocks();
    const visualClasses = visualUnlocks.map(u => `unlock-${u}`).join(' ');
    const appClasses = `App stage-${this.state.enlightenmentStage} ${visualClasses}`.trim();

    const energyCosts = this.getEnergyCosts();
    const buildingBenefits = calculateBuildingBenefits(this.state.buildings);
    const maxEnergy = this.getMaxEnergy();
    const meditationKarmaReward = this.getMeditationKarmaReward();

    return (
      <div className={appClasses}>
        {/* Visual decoration layers */}
        <div className="visual-decorations">
          {visualUnlocks.includes('lotus') && <div className="decoration lotus-decoration"></div>}
          {visualUnlocks.includes('mandala') && <div className="decoration mandala-decoration"></div>}
          {visualUnlocks.includes('enso') && <div className="decoration enso-decoration"></div>}
          {visualUnlocks.includes('particles') && <div className="decoration particles-decoration"></div>}
        </div>

        <header className="App-header">
          <Header unlockSeeker={this.unlockSeeker} />
        </header>

        <main>
          <div className="main-row">
            <div className="column left-sidebar">
              <Character
                name={this.state.name}
                water={this.state.water}
                wood={this.state.wood}
                karma={this.state.karma}
                elapsedTime={this.state.elapsedTime}
                clicks={this.state.clicks}
                dayNumber={this.state.dayNumber}
                currentEnergy={this.state.currentEnergy}
                maxEnergy={maxEnergy}
              />
              <EnlightenmentProgress
                karma={this.state.karma}
                enlightenmentStage={this.state.enlightenmentStage}
              />
            </div>

            <div className="column col-center">
              <DayStatus
                dayNumber={this.state.dayNumber}
                currentEnergy={this.state.currentEnergy}
                maxEnergy={maxEnergy}
                onSleep={this.handleSleep}
                isMeditating={this.state.isMeditating}
                passiveWater={buildingBenefits.passiveWater}
                passiveWood={buildingBenefits.passiveWood}
                passiveKarma={buildingBenefits.passiveKarma}
              />
              <div className="actions-row">
                <Well
                  updateWater={this.updateWater}
                  water={this.state.water}
                  disabled={this.state.isMeditating}
                  energyCost={energyCosts.water}
                  currentEnergy={this.state.currentEnergy}
                />
                <Woods
                  updateWood={this.updateWood}
                  wood={this.state.wood}
                  disabled={this.state.isMeditating}
                  energyCost={energyCosts.wood}
                  currentEnergy={this.state.currentEnergy}
                />
                <Meditation
                  enlightenmentStage={this.state.enlightenmentStage}
                  isMeditating={this.state.isMeditating}
                  meditationSessions={this.state.meditationSessions}
                  startMeditation={this.startMeditation}
                  energyCost={energyCosts.meditate}
                  currentEnergy={this.state.currentEnergy}
                  karmaReward={meditationKarmaReward}
                />
              </div>
              <MessageHistory messages={this.state.messages}></MessageHistory>
            </div>

            <div className="column upgrades-column">
              <UpgradesPanel
                buildings={this.state.buildings}
                water={this.state.water}
                wood={this.state.wood}
                karma={this.state.karma}
                spiritualUpgrades={this.state.spiritualUpgrades}
                onPurchaseBuilding={this.purchaseBuilding}
                onPurchaseUpgrade={this.purchaseUpgrade}
              />
            </div>

          </div>
        </main>

        <footer className="App-footer">
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
