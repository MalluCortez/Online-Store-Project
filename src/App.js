import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Details from './pages/Details';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Payment from './pages/Payment';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shopping-cart" component={ Cart } />
        <Route exact path="/details/:id" component={ Details } />
        <Route exact path="/checkout" component={ Payment } />
      </Switch>

    );
  }
}

export default App;
