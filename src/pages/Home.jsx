import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery,
  getCategories, getCategoriesId } from '../services/api';

class Home extends Component {
  state = {
    infoMessage: '',
    query: [],
    onClick: false,
    onCl: false,
    quantity: 0,
    list: [],
    listCatProduc: [],
  };

  async componentDidMount() {
    const apiCategory = await getCategories();
    this.setState({ list: apiCategory });
    const local = localStorage.getItem('products');
    if (local !== null && local !== undefined) {
      localStorage.setItem('quantity', JSON.stringify(JSON.parse(local).length));
      this.setState({
        quantity: localStorage.getItem('quantity'),
      });
    } else {
      localStorage.setItem('quantity', JSON.stringify(0));
    }
  }

  getApi = async () => {
    const { infoMessage } = this.state;
    const product = await getProductsFromCategoryAndQuery('', infoMessage);
    this.setState({ query: product.results });
  };

  getApiCategory = async (catId) => {
    const product = await getCategoriesId(catId);
    this.setState({ listCatProduc: product.results });
  };

  handleClick = (id) => {
    this.getApiCategory(id);
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
      const local = localStorage.getItem('products');
      localStorage.setItem('quantity', JSON.stringify(JSON.parse(local).length));
      this.setState({
        quantity: localStorage.getItem('quantity'),
      });
    } else {
      localStorage.setItem('products', JSON.stringify([...intemStorage, element]));
      const local = localStorage.getItem('products');
      localStorage.setItem('quantity', JSON.stringify(JSON.parse(local).length));
      this.setState({
        quantity: localStorage.getItem('quantity'),
      });
    }
  };

  render() {
    const { infoMessage, query, onClick,
      quantity, list, listCatProduc, onCl } = this.state;
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
            <p data-testid="shopping-cart-size">
              { quantity }
            </p>
          </Link>
        </nav>

        {
          infoMessage === '' && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
        }

        <div>
          <ul>
            {list.map((cat) => (
              <li id="liProducts" key={ cat.id }>

                <button
                  data-testid="category"
                  value={ cat.id }
                  onClick={ () => {
                    this.handleClick(cat.id);
                    this.setState({ onCl: true });
                  } }
                  type="button"
                  name="category"
                  id={ cat.id }
                >
                  {cat.name}
                </button>

              </li>
            ))}
          </ul>
          {listCatProduc.length <= 0 && onCl ? <p>Nenhum produto foi encontrado</p> : (
            <div>
              {listCatProduc.map((element) => (
                <div data-testid="product" key={ element.id }>
                  <h3>{element.title}</h3>
                  <p>
                    R$
                    {element.price}
                  </p>
                  <img src={ element.thumbnail } alt={ element.title } />
                  <Link
                    to={ `details/${element.id}` }
                    data-testid="product-detail-link"
                  >
                    <button type="button">Detalhes</button>
                  </Link>
                  <button
                    type="button"
                    data-testid="product-add-to-cart"
                    onClick={ () => this.saveLocalStorage(element) }
                  >
                    Adicionar ao carrinho
                  </button>
                  {
                    element.shipping.free_shipping === true
                    && <p data-testid="free-shipping">Frete grátis</p>
                  }
                </div>
              ))}
              {' '}
            </div>
          )}
        </div>

        { query.length <= 0 && onClick ? <p>Nenhum produto foi encontrado</p> : (
          <div>
            { query.map((element) => (
              <div
                data-testid="product"
                key={ element.id }
              >
                <h3>{element.title}</h3>
                <p>
                  R$
                  {element.price}
                </p>
                <img src={ element.thumbnail } alt={ element.title } />
                <Link
                  to={ `details/${element.id}` }
                  data-testid="product-detail-link"
                >
                  <button type="button">Detalhes</button>
                </Link>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => this.saveLocalStorage(element) }
                >
                  Adicionar ao carrinho
                </button>
                {
                  element.shipping.free_shipping === true
                    && <p data-testid="free-shipping">Frete grátis</p>
                }
              </div>
            )) }
          </div>
        )}
      </div>
    );
  }
}

export default Home;
