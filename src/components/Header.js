import React, { Component } from 'react';
import '../App.css';
import GoodMorningNight from '../components/time/GoodMorningNight.js';

class Header extends Component {
	constructor (props) {
		super(props);
		this.state = {
			hidden: true
		};

		// This binding is necessary to make `this` work in the callback
		this.hide = this.hide.bind(this);
	}

	hide() {
		console.log('raint');
		this.setState({ hidden: !this.state.hidden });
	}

  render() {
  	let hideables;

  	if (this.state.hidden) {
  		hideables = <div className="hideable">
	      	<p className="splash-text" onClick={this.hide}><GoodMorningNight /></p>
	        <h1>Raint: The Game</h1>
        </div>
  	} else {
  		hideables = <p></p>
  	}
    return (
      <div>
      	{hideables}
      </div>
    );
  }
}

export default Header;
