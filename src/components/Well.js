import React, { Component } from 'react';
import '../App.css';

class Well extends Component {
  render() {
    return (
      <div className="Well">
      	<button 
	      	className="well-button" 
	      	onClick={this.props.updateWater}>Carry Water</button>
      	<p>{this.props.water}</p>
      </div>
    );
  }
}

export default Well;
