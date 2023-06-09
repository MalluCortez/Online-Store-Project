import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    const a = this.getLocalStorage();
    this.setState({ cart: a });
  }

  getLocalStorage = () => {
    const a = localStorage.getItem('products');
    if (a !== null) {
      const b = JSON.parse(a);
      const c = b.map((i) => i.id);
      const d = c.filter((pt, idx, arr) => arr.indexOf(pt) === idx);
      const arrEmp = d.map((id) => (b.filter((item) => item.id === id)));
      return arrEmp;
    }
  };

  increaseQuantity = (element) => {
    const intemStorage = JSON.parse(localStorage.getItem('products'));
    const filterElement = intemStorage.filter((prod) => prod.id === element[0].id);
    console.log(element[0].available_quantity);
    if (filterElement.length < element[0].available_quantity) {
      localStorage.setItem('products', JSON.stringify([...intemStorage, element[0]]));
      const a = this.getLocalStorage();
      console.log(a);
      this.setState({ cart: a });
    }
  };

  decreaseQuantity = (element) => {
    const { cart } = this.state;
    if (element.length > 1) {
      const intemStorage = JSON.parse(localStorage.getItem('products'));
      const index = intemStorage.findIndex((prod) => prod.id === element[0].id);
      intemStorage.splice(index, 1);
      localStorage.setItem('products', JSON.stringify([...intemStorage]));
      this.getLocalStorage();
      const shoppingCart = cart;
      const i = shoppingCart.findIndex((prod) => prod[0].id === element[0].id);
      shoppingCart[i].shift();
      this.setState({ cart: shoppingCart });
    }
  };

  removeProduct = (element) => {
    const intemStorage = JSON.parse(localStorage.getItem('products'));
    const index = intemStorage.findIndex((prod) => prod.id === element[0].id);
    element.forEach(() => {
      intemStorage.splice(index, 1);
      localStorage.setItem('products', JSON.stringify([...intemStorage]));
      const a = this.getLocalStorage();
      this.setState({ cart: a });
    });
  };

  render() {
    const { cart } = this.state;
    console.log(cart);
    const local = localStorage.getItem('products');
    const num = 0;
    return (
      <div>
        { local !== null && local !== undefined ? cart.map((element, idx) => (
          <div key={ idx }>
            <button
              type="button"
              data-testid="remove-product"
              onClick={ () => this.removeProduct(element) }
            >
              X
            </button>
            <h3 data-testid="shopping-cart-product-name">{element[num].title}</h3>
            <button
              type="button"
              data-testid="product-increase-quantity"
              onClick={ () => this.increaseQuantity(element) }
            >
              +
            </button>
            <h3 data-testid="shopping-cart-product-quantity">
              { `${element.length}`}
            </h3>
            <button
              type="button"
              data-testid="product-decrease-quantity"
              onClick={ () => this.decreaseQuantity(element) }
            >
              -
            </button>
          </div>
        )) : ''}
        {local !== null && local !== undefined ? (
          <Link to="/checkout" data-testid="checkout-products">
            Finalizar compra
          </Link>
        ) : (
          <h3 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h3>
        )}
      </div>
    );
  }
}

export default Cart;
