import React, { Component } from 'react';


class MessageHistory extends Component {

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
