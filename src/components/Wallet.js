import React, { Component } from 'react';
// import '../styles/App.css';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()}
  }

  render() {
    return (
      <div className="Wallet">
      Wallet<br />

      </div>
    );
  }
}

export default Wallet;
