import React, { Component } from 'react';
import '../App.css';

class Karma extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	karma: this.props.karma
    }

    setInterval(this.props.updateKarma, 100000)
  }
  render() {
    return (
      <div className="Karma">
      	<ul>
	      	<li>Karma : {this.props.karma}</li>
      	</ul>
      </div>
    );
  }
}

export default Karma;
