import React, { Component } from 'react';

class ElapsedTimeInSeconds extends Component {
  render() {
    let elapsedTime = this.props.elapsedTime;

    // strip the ms
    elapsedTime /= 1000;

    // get seconds 
    var seconds = Math.round(elapsedTime);

    return (
      <span>{seconds}</span>
    );
  }
}

export default ElapsedTimeInSeconds;
