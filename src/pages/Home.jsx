import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Category from '../components/Category';

class Home extends Component {
  state = {
    infoMessage: '',
    query: [],
    onClick: false,
  };

  getApi = async () => {
    const { infoMessage } = this.state;
    const product = await getProductsFromCategoryAndQuery('', infoMessage);
    console.log(product);
    this.setState({ query: product.results });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleOnClick = () => {
    const { infoMessage } = this.state;
    this.getApi(infoMessage);
  };

  saveLocalStorage = (element) => {
    const intemStorage = JSON.parse(localStorage.getItem('products'));
    if (intemStorage === null) {
      localStorage.setItem('products', JSON.stringify([element]));
    } else {
      localStorage.setItem('products', JSON.stringify([...intemStorage, element]));
    }
  };

  render() {
    const { infoMessage, query, onClick } = this.state;
    return (
      <div>
        <label htmlFor="home">
          <input
            data-testid="query-input"
            type="text"
            value={ infoMessage }
            onChange={ this.handleChange }
            placeholder="pesquise um produto"
            name="infoMessage"
            id="home"
          />
        </label>
        <button
          data-testid="query-button"
          type="button"
          onClick={ () => {
            this.handleOnClick();
            this.setState({ onClick: true });
          } }
        >
          Pesquisar
        </button>
        <nav>
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            Carrinho
          </Link>
        </nav>

        {
          infoMessage === '' && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
        }
        { query.length <= 0 && onClick ? <p>Nenhum produto foi encontrado</p> : (
          <div>
            { query.map((element) => (
              <div
                data-testid="product"
                key={ element.id }
              >
                <h3>{element.title}</h3>
                <p>{element.price}</p>
                <img src={ element.thumbnail } alt={ element.title } />
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => this.saveLocalStorage(element) }
                >
                  Adicionar ao carrinho
                </button>
              </div>
            )) }
          </div>
        )}
        <Category />
      </div>
    );
  }
}

export default Home;
