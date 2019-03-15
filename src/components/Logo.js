import React, { Component } from 'react';
// import '../App.css';

class Logo extends Component {

  render() {
    let buddha = '../../assets/black-buddha.png';
    return (

      <div className="Logo">
        <img src={buddha} className="App-logo" alt="logo" />
        <p> Click to Start the game. </p>
      </div>
    );
  }
}

export default Logo;
