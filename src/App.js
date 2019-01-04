import React, { Component } from 'react';

import './reset.css';
import './App.css';

import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Logo from './components/Logo.js';

import Well from './components/Well.js';
import Wallet from './components/Wallet.js';
import Woods from './components/Woods.js';

import Character from './components/Character.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      water: 0,
      wood: 0,
      name: "Anonymous",
      date: new Date(),
      elapsedTime: 0,
    }

    this.updateWater = this.updateWater.bind(this);
    this.updateWood = this.updateWood.bind(this);
    this.updateElapsedTime= this.updateElapsedTime.bind(this);
    setInterval(this.updateWater, 10000);
  }


  updateElapsedTime() {
    console.log(this.state.elapsedTime);
    let endTime = new Date();
    var timeDiff = endTime - this.state.date; //in ms
    this.setState({ elapsedTime: timeDiff });
    // strip the ms
    timeDiff /= 1000;

    // get seconds 
    var seconds = Math.round(timeDiff);
    console.log(seconds + " seconds");
  }

  updateWater() {
    this.setState({ water: this.state.water + 1 });
    console.log("plus water"+this.state.water);
    this.updateElapsedTime()
  }
  updateWood() {
    this.setState({ wood: this.state.wood + 1 });
    console.log("plus wood"+this.state.wood)
    this.updateElapsedTime()
  }
  render() {
    return (
      <div className="App">

        <header className="App-header">

          <Header />

        </header>

        <main>

          <Character name={this.state.name}
            water={this.state.water} 
            wood={this.state.wood}
            elapsedTime={this.state.elapsedTime} />

          <Wallet />
          <Well updateWater={this.updateWater} water={this.state.water} />
          <Woods updateWood={this.updateWood} wood={this.state.wood} />
          <Logo />

        </main>

        <footer className="App-footer">

          <Footer />

        </footer>

        <article>
          <h1>EXTRA: REDRUM!</h1>
          <aside>THATS EXACTLY WHATS HAPPENING RIGHT NOW!!!</aside>
        </article>

        <p className="version">{this.state.date.toLocaleTimeString()}</p>
      </div>
    );
  }
}

export default App;
