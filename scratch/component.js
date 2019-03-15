import React, { Component } from 'react';
import '../App.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()}
  }
  render() {
    return (
      <div className="App">
	      <h1>SOMETHING TO GET EXCITED ABOUT!</h1>
      </div>
    );
  }
}

export default Footer;
