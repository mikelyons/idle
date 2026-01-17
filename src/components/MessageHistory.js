import React, { Component } from 'react';

class MessageHistory extends Component {
  render() {
    const messages = this.props.messages || [];
    const listItems = messages.slice(-15).reverse().map((message, index) =>
      <li key={index}>{message}</li>
    );

    return (
      <div className="MessageHistory">
        <ul>{listItems}</ul>
      </div>
    );
  }
}

export default MessageHistory;
