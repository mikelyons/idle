import React, { Component } from 'react';

import ElapsedTimeInSeconds from '../components/time/ElapsedTimeInSeconds.js';

class Character extends Component {
  render() {
    const {
      name,
      water,
      wood,
      karma,
      elapsedTime,
      clicks,
      dayNumber,
      currentEnergy,
      maxEnergy
    } = this.props;

    let hide = {display: 'none'}

    return (
      <div className="Character">
        <form style={hide}>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <ul>
          <li>
            <button>{name}</button>
          </li>
          <li>Day: {dayNumber}</li>
          <li>Energy: {Math.floor(currentEnergy)} / {maxEnergy}</li>
          <li>Water: {water}</li>
          <li>Wood: {wood}</li>
          <li>Karma: {Math.floor(karma)}</li>
          <li>Age: <ElapsedTimeInSeconds elapsedTime={elapsedTime} /> seconds </li>
          <li>Clicks: {clicks}</li>
        </ul>
      </div>
    );
  }
}

export default Character;
