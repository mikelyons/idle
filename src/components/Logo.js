import React, { Component } from 'react';
import logo from '../logo.svg';
import buddha from '../black-buddha.png';
import '../App.css';

class Logo extends Component {
  render() {
    return (
      <div className="Logo">
        <img src={buddha} className="App-logo" alt="logo" />
        <p> Click to Start the game. </p>
      </div>
    );
  }
}

export default Logo;
