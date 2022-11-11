import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getCategoriesId } from '../services/api';

class Category extends Component {
  state = {
    list: [],
    listCatProduc: [],
    onClick: false,

  };

  async componentDidMount() {
    const apiCategory = await getCategories();
    this.setState({ list: apiCategory });
  }

  getApi = async (catId) => {
    const product = await getCategoriesId(catId);
    this.setState({ listCatProduc: product.results });
  };

  handleClick = (id) => {
    this.getApi(id);
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
    const { list, onClick, listCatProduc } = this.state;

    return (
      <div>
        <ul>
          {list.map((cat) => (
            <li id="liProducts" key={ cat.id }>

              <button
                data-testid="category"
                value={ cat.id }
                onClick={ () => {
                  this.handleClick(cat.id);
                  this.setState({ onClick: true });
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
        {listCatProduc.length <= 0 && onClick ? <p>Nenhum produto foi encontrado</p> : (
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
              </div>
            ))}
            {' '}
          </div>
        )}
      </div>

    );
  }
}

export default Category;
