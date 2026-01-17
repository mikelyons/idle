import React, { Component } from 'react';
import { getStageInfo, getProgressToNextStage, getKarmaToNextStage, ENLIGHTENMENT_STAGES } from '../utils/enlightenment';

class EnlightenmentProgress extends Component {
  render() {
    const { karma, enlightenmentStage } = this.props;
    const stageInfo = getStageInfo(enlightenmentStage);
    const progress = getProgressToNextStage(karma, enlightenmentStage);
    const karmaToNext = getKarmaToNextStage(karma, enlightenmentStage);
    const isMaxStage = enlightenmentStage >= ENLIGHTENMENT_STAGES.length - 1;

    return (
      <div className="EnlightenmentProgress">
        <h4>Spiritual Progress</h4>

        <div className="stage-info">
          <span className="stage-name">
            Stage {stageInfo.stage}: {stageInfo.name}
          </span>
        </div>

        <div className="karma-display">
          <span className="dharma-wheel">☸</span>
          <span>{Math.floor(karma).toLocaleString()} Karma</span>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="progress-text">
          {isMaxStage ? (
            <span>You have achieved enlightenment!</span>
          ) : enlightenmentStage === 0 ? (
            <span>Seek and you shall find...</span>
          ) : (
            <span>{karmaToNext.toLocaleString()} karma to {ENLIGHTENMENT_STAGES[enlightenmentStage + 1].name}</span>
          )}
        </div>
      </div>
    );
  }
}

export default EnlightenmentProgress;
