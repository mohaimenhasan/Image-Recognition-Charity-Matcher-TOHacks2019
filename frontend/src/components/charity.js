import React, { Component } from 'react';
import '../App.css';

class Charity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitute: '',
      longitude: '',
      needs: [],
      name: ''
    };
  }

  render() {
    return (
        <div>
            Hello Charity
        </div>
    );
  }
}

export default Charity;