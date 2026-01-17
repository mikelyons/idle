import React, { Component } from 'react';
import GoodMorningNight from '../components/time/GoodMorningNight.js';

class Header extends Component {
	constructor (props) {
		super(props);
		this.state = {
			hidden: true
		};

	}

	hide = () => {
		console.log('raint');
		this.setState({ hidden: !this.state.hidden });
		if (this.props.unlockSeeker) {
			this.props.unlockSeeker();
		}
	}

  render() {
  	let hideables;

  	if (this.state.hidden) {
  		hideables = <div className="hideable">
	      	<p className="splash-text" onClick={this.hide}><GoodMorningNight /></p>
	        <h1>Chop Wood, Carry Water: The Game</h1>
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
