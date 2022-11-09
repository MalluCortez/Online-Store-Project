import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = {
    infoMessage: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { infoMessage } = this.state;
    return (
      <div>
        <nav>
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            Carrinho
          </Link>
        </nav>
        <input
          value={ infoMessage }
          onChange={ this.handleChange }
          placeholder="pesquise um produto"
          type="text"
          name="infoMessage"
          id=""
        />
        {
          infoMessage === '' && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
        }

      </div>
    );
  }
}

export default Home;
