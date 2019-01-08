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
    let hide = {display: 'none'}
    let show = {display: 'block'}

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
            <button>{this.props.name}</button>
          </li>

          <li>Water : {this.props.water}</li>
          <li>Wood : {this.props.wood}</li>
          <li>Karma : {this.props.karma}</li>
          <li>Age : <ElapsedTimeInSeconds elapsedTime={this.props.elapsedTime} /> seconds </li>
          <li>Clicks : {this.props.clicks}</li>
        </ul>
      </div>
    );
  }
}

export default Character;
