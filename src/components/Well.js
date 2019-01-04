import React, { Component } from 'react';
import '../App.css';

class Well extends Component {
	constructor (props) {
		super(props);
		this.state = {
			water: this.props.water,
			isToggleOn: true
		};

		// This binding is necessary to make `this` work in the callback
		// if the function is not an => function
		// this.carryWater = this.carryWater.bind(this);
	}

	carryWater = () => {
		// increment water
		this.setState({ water: this.state.water + 1 });
	}

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
