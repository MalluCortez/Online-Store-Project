import React, { Component } from 'react';

class Cart extends Component {
  state = {
    hasProdut: false,
  };

  render() {
    const { hasProdut } = this.state;
    return (
      <div>
        { hasProdut === false && (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>)}
      </div>
    );
  }
}

export default Cart;
