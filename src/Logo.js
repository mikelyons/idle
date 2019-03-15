import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Logo extends Component {
  render() {
    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <p> Click to Start the game. </p>

        <a
          className="App-link"
          href="#"
        >
          Start the Game.
        </a>
      </div>
    );
  }
}

export default Logo;
