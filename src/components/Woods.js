import React, { Component } from 'react';

class Woods extends Component {
	constructor (props) {
		super(props);
		this.state = {
			wood: this.props.wood
		};

		// This binding is necessary to make `this` work in the callback
		this.chopWood = this.chopWood.bind(this);
	}

	chopWood(){
		this.setState({ wood: this.state.wood + 1 });
	}

  render() {
    return (
      <div className="Well">
      	<button 
	      	className="well-button" 
	      	onClick={this.props.updateWood}>Chop Wood</button>
      	<p>{this.props.wood}</p>
      </div>
    );
  }
}

export default Woods;
