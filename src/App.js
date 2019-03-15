import React, { Component } from 'react';

import './styles/reset.css';
import './styles/App.css';

import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Logo from './components/Logo.js';

import Well from './components/Well.js';
import Wallet from './components/Wallet.js';
import Woods from './components/Woods.js';
import Karma from './components/Karma.js'

import Character from './components/Character.js';

import MessageHistory from './components/MessageHistory.js'

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
      clicks: 0,
      messages: [],
    }

    setInterval(()=>{this.updateWater(-1)}, 15000);
  }
  updateMessages = (message) => {
    console.log(this.state.messages)
    console.log(message)
    let messageArray = this.state.messages
    messageArray.push(message)
    console.log(messageArray)
    this.setState({messages: messageArray})
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
  updateWater = (amount) => {
    amount = parseInt(amount) || 1
    this.setState({ water: this.state.water + amount });
    console.log("water+ " + amount + " totel: "+this.state.water);
    this.updateElapsedTime()
    this.updateMessages("ahh a nice refreshing drink")
  }
  updateWood = () => {
    this.setState({ wood: this.state.wood + 1 });
    console.log("+ wood "+this.state.wood)
    this.updateElapsedTime()
    this.updateMessages("More wood for the fire")
  }
  updateKarma = () => {
    this.setState({ karma: this.state.karma+this.state.elapsedTime})
  }
  countClick = () => {
    this.setState({clicks: this.state.clicks+1})
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.countClick);
  }
  messagesHistory() {
    return {
      clear: 'both',
      height: 300,
      border: 'solid',
      overflow: 'hidden'
    }
  }
  render() {
    return (
      <div className="App">

        <header className="App-header">

          <Header />

        </header>

        <main>
          <div className="main-row">
            <div className="column left-sidebar">
              <h3>Character</h3>

              <Character name={this.state.name}
                water={this.state.water} 
                wood={this.state.wood}
                karma={this.state.karma}
                elapsedTime={this.state.elapsedTime} 
                clicks={this.state.clicks}
              />
              <Wallet />
            </div>
            <div className="column col-center">
              <Well updateWater={this.updateWater} water={this.state.water} />
              <Woods updateWood={this.updateWood} wood={this.state.wood} />
              <Karma updateKarma={this.updateKarma} karma={this.state.karma} />
              <MessageHistory style={this.messagesHistory()} messages={this.state.messages}></MessageHistory>
            </div>

            <div className="column right-sidebar">right</div>

          </div>
          <div className="main-row">
            <div className="column left-sidebar">left</div>
            <div className="column col-center">
              <Logo />
            </div>
            <div className="column right-sidebar">right</div>
          </div>
          <div className="main-row">
            <div className="column left-sidebar">left</div>
            <div className="column col-center">
            <h3>this will have inner world</h3>
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
