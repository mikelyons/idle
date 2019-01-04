import React, { Component } from 'react';

import './reset.css';
import './App.css';

import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Logo from './components/Logo.js';

import Well from './components/Well.js';
import Wallet from './components/Wallet.js';
import Woods from './components/Woods.js';
import Karma from './components/Karma.js'

import Character from './components/Character.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      water: 0,
      wood: 0,
      karma: 0,
      name: "Anonymous",
      date: new Date(),
      elapsedTime: 0,
    }

    // this used to be necessary until we started using => functions
    // this.updateWater = this.updateWater.bind(this);
    // this.updateWood = this.updateWood.bind(this);
    // this.updateElapsedTime= this.updateElapsedTime.bind(this);

    console.log(this.props)
    setInterval(this.updateWater, 10000);
  }
  updateElapsedTime = () => {
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
  updateWater = () => {
    this.setState({ water: this.state.water + 1 });
    console.log("+ water "+this.state.water);
    this.updateElapsedTime()
  }
  updateWood = () => {
    this.setState({ wood: this.state.wood + 1 });
    console.log("+ wood "+this.state.wood)
    this.updateElapsedTime()
  }
  updateKarma = () => {
    this.setState({ karma: this.state.karma+this.state.elapsedTime})
  }
  render() {
    return (
      <div className="App">

        <header className="App-header">

          <Header />

        </header>

        <main>
          <div className="main-row">
            <div className="column left-sidebar">left</div>
            <div className="column col-center">

              <Character name={this.state.name}
                water={this.state.water} 
                wood={this.state.wood}
                elapsedTime={this.state.elapsedTime} />
        <Logo />

              <Wallet />
              <Well updateWater={this.updateWater} water={this.state.water} />
              <Woods updateWood={this.updateWood} wood={this.state.wood} />
              <Karma updateKarma={this.updateKarma} karma={this.state.karma} />
            </div>

            <div className="column right-sidebar">right</div>

          </div>
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
