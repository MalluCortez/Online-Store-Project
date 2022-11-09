import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }
  // state = {  }
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
      </Switch>

    );
  }
}

export default App;
