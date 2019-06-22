import React, { Component } from 'react';
import './App.css';
import Maps from './maps';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentScreen: []
    }
  }
  componentWillMount() {
    let mapsPage = [];
    mapsPage.push(<Maps appContext={this}/>)
    this.setState({
      currentScreen: mapsPage
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.currentScreen}
      </div>
    );
  }
}

export default App;