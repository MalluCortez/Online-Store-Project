import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shopping-cart" component={ Cart } />
      </Switch>

    );
  }
}

export default App;
