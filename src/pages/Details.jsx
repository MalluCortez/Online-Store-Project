import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class Details extends React.Component {
  state = {
    productDetails: {},
    email: '',
    rating: 0,
    text: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productDetails = await getProductById(id);
    const itemStorage = JSON.parse(localStorage.getItem(productDetails.id));
    if (itemStorage === null) {
      this.setState({ productDetails });
    } else {
      this.setState({
        productDetails,
        email: itemStorage[0].email,
        rating: itemStorage[0].rating,
        text: itemStorage[0].text,
      });
    }
  }

  saveLocalStorage = (element) => {
    const intemStorage = JSON.parse(localStorage.getItem('product'));
    if (intemStorage === null) {
      localStorage.setItem('product', JSON.stringify([element]));
    } else {
      localStorage.setItem('product', JSON.stringify([...intemStorage, element]));
    }
  };

  setLocalStorage = () => {
    const { productDetails } = this.state;
    const itemStorage = JSON.parse(localStorage.getItem(productDetails.id));
    const { email, rating, text } = this.state;
    if (itemStorage === null) {
      localStorage.setItem(productDetails.id, JSON.stringify(
        [
          {
            email,
            text,
            rating,
          },
        ],
      ));
    } else {
      localStorage.setItem(productDetails.id, JSON.stringify([...itemStorage, {
        email,
        text,
        rating,
      }]));
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    this.setState({
      email: '',
      text: '',
    });
    this.setLocalStorage();
  };

  render() {
    const { productDetails: { title, thumbnail, price },
      productDetails, email, text } = this.state;

    const result = JSON.parse(localStorage.getItem(productDetails.id));

    return (
      <div>
        <h1 data-testid="product-detail-name">{title}</h1>
        <h2 data-testid="product-detail-price">{`R$ ${price}`}</h2>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.saveLocalStorage(productDetails) }
        >
          Adicionar ao carrinho
        </button>
        <nav>
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            Carrinho
          </Link>
        </nav>

        <form>
          <fieldset>
            <input
              data-testid="product-detail-email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </fieldset>
          <fieldset>
            <label
              htmlFor="radio"
            >
              1
              <input
                data-testid="1-rating"
                type="radio"
                name="rating"
                onChange={ this.handleChange }
              />
            </label>
            <label
              htmlFor="radio"
            >
              2
              <input
                data-testid="2-rating"
                type="radio"
                name="rating"
                onChange={ this.handleChange }
              />
            </label>
            <label
              htmlFor="radio"
            >
              3
              <input
                data-testid="3-rating"
                type="radio"
                name="rating"
                onChange={ this.handleChange }
              />
            </label>
            <label
              htmlFor="radio"
            >
              4
              <input
                data-testid="4-rating"
                type="radio"
                name="rating"
                onChange={ this.handleChange }
              />
            </label>
            <label
              htmlFor="radio"
            >
              5
              <input
                data-testid="5-rating"
                type="radio"
                name="rating"
                onChange={ this.handleChange }
              />
            </label>
          </fieldset>
          <fieldset>
            <textarea
              data-testid="product-detail-evaluation"
              name="text"
              value={ text }
              onChange={ this.handleChange }
            />
          </fieldset>
          <button
            data-testid="submit-review-btn"
            type="button"
            onClick={ this.handleClick }
          >
            Enviar
          </button>
        </form>
        {
          result !== null
          && result.map((e) => (
            <>
              <p data-testid="review-card-email">{e.email}</p>
              <p data-testid="review-card-evaluation">{e.text}</p>
              <p data-testid="review-card-rating">{e.rating}</p>
            </>
          ))
        }
      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Details;
