import React, { Component } from 'react';
import '../App.css';

import ElapsedTimeInSeconds from '../components/time/ElapsedTimeInSeconds.js';

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name
    }
  }



  render() {
    return (
      <div className="Character">
        <ul>
          <li>
            <label>Nama :</label> <strong>{this.props.name}</strong>
            <label>Nama :</label> <button>{this.props.name}</button>
          </li>

          <li>Water : {this.props.water}</li>
          <li>Wood : {this.props.wood}</li>
        </ul>
        <ElapsedTimeInSeconds elapsedTime={this.props.elapsedTime} />
      </div>
    );
  }
}

export default Character;
