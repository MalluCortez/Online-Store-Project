import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

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
              </div>
            )) }
          </div>
        )}

      </div>
    );
  }
}

export default Home;
