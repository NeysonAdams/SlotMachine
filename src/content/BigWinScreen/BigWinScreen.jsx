import React, { Component } from 'react';
import './BigWinScreen.css';

class BigWinScreen extends Component {
  render() {
    return (
      <div className="big-win-screen">
        {this.props.children}
      </div>
    );
  }
}

export default  BigWinScreen