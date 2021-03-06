import React, { Component } from 'react';


class MessageHistory extends Component {
  constructor(props){
    super(props)

    // const numbers = [1, 2, 3, 4, 5, 666, 7, 8, 9, 10]
  }


  render() {

    var numbers = this.props.messages
    this.listItems = numbers.slice(0).reverse().map((number) =>
      <li>{number}</li>
    );
    return (
      <div style={this.props.style} className="MessagesHistory-container">
        <p>Messages will list here</p>
        <ul style={{overflow: 'hidden'}}>{this.listItems}</ul>
      </div>
    );
  }
}

export default MessageHistory;
