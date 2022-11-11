import React, { Component } from 'react';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const a = localStorage.getItem('products');
    if (a !== null) {
      const b = JSON.parse(a);
      const c = b.map((i) => i.id);
      const d = c.filter((pt, idx, arr) => arr.indexOf(pt) === idx);
      const arrEmp = d.map((id) => (b.filter((item) => item.id === id)));
      this.setState({ cart: arrEmp });
    }
  };

  render() {
    const { cart } = this.state;
    const num = 0;
    return (
      <div>
        { localStorage.length > num ? cart.map((element, idx) => (
          <div key={ idx }>
            <h3 data-testid="shopping-cart-product-name">{element[num].title}</h3>
            <h3 data-testid="shopping-cart-product-quantity">
              { `${element.length}`}
            </h3>
          </div>
        )) : (
          <h3 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h3>)}
      </div>
    );
  }
}

export default Cart;
