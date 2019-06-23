import React, { Component } from 'react';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import User from './components/user'
import Charity from './components/charity'
import Home from './components/home'
import Maps from './maps'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: []
    }
  }
  componentWillMount() {
    let mapsPage = [];
    mapsPage.push(<Maps appContext={this} />)
    this.setState({
      currentScreen: mapsPage
    })
  }

  render() {
    return (
      <div>

        <Router>
          <div className="App">
            <header className="App-header">
              <a href="/" className="btn btn-info" role="button" id="nav-button">Home</a>

            </header>
            {/* <div className="map">
              {this.state.currentScreen}
            </div> */}
          </div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/user' component={User} />
            <Route exact path='/charity' component={Charity} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;