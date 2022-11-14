import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class Details extends React.Component {
  state = {
    productDetails: {},
    email: '',
    text: '',
    radioValue: '',
    radio1: false,
    radio2: false,
    radio3: false,
    radio4: false,
    radio5: false,
    onClick: false,
    invalid: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productDetails = await getProductById(id);
    this.setState({
      productDetails,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      invalid: false,
    });
  };

  handleChangeRadio = ({ target }) => {
    const { name, value, checked } = target;
    this.setState({
      [name]: checked,
      radioValue: value,
      invalid: false,
    });
  };

  handleClick = () => {
    const { match: { params: { id } } } = this.props;
    const { email, text, radioValue } = this.state;
    if (email !== '' && radioValue !== ''
    && email.includes('@') && email.includes('.com')) {
      const intemStorage = JSON.parse(localStorage.getItem(id));
      if (intemStorage === null) {
        localStorage.setItem(id, JSON.stringify([{ email, text, rating: radioValue }]));
      } else {
        localStorage.setItem(id, JSON.stringify([...intemStorage, {
          email,
          text,
          rating: radioValue,
        }]));
      }
      this.setState({
        onClick: true,
        invalid: false,
        email: '',
        text: '',
        radio1: false,
        radio2: false,
        radio3: false,
        radio4: false,
        radio5: false,
      });
    } else {
      this.setState({
        invalid: true,
      });
    }
  };

  render() {
    const { productDetails: { title, thumbnail, price }, productDetails,
      radio1, radio2, radio3, radio4,
      radio5, email, text, onClick, invalid, radioValue } = this.state;
    return (
      <div>
        <h1 data-testid="product-detail-name">{title}</h1>
        <h2 data-testid="product-detail-price">{`R$ ${price}`}</h2>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <form action="">
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="product-detail-email"
            onChange={ this.handleChange }
            id=""
          />
          <label htmlFor="radio1">
            1
            <input
              type="radio"
              data-testid="1-rating"
              value="1"
              checked={ radio1 }
              onChange={ this.handleChangeRadio }
              name="radio1"
              id="radio1"
            />
          </label>
          <label htmlFor="radio2">
            2
            <input
              type="radio"
              data-testid="2-rating"
              value="2"
              checked={ radio2 }
              onChange={ this.handleChangeRadio }
              name="radio2"
              id="radio2"
            />
          </label>
          <label htmlFor="radio3">
            3
            <input
              data-testid="3-rating"
              type="radio"
              value="3"
              checked={ radio3 }
              onChange={ this.handleChangeRadio }
              name="radio3"
              id="radio3"
            />
          </label>
          <label htmlFor="radio4">
            4
            <input
              type="radio"
              data-testid="4-rating"
              value="4"
              checked={ radio4 }
              onChange={ this.handleChangeRadio }
              name="radio4"
              id="radio4"
            />
          </label>
          <label htmlFor="radio5">
            5
            <input
              type="radio"
              data-testid="5-rating"
              value="5"
              checked={ radio5 }
              onChange={ this.handleChangeRadio }
              name="radio5"
              id="radio5"
            />
          </label>
          <textarea
            name="text"
            value={ text }
            onChange={ this.handleChange }
            data-testid="product-detail-evaluation"
            id=""
            cols="30"
            rows="10"
          />
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="submit-review-btn"
          >
            Enviar
          </button>

        </form>
        {invalid && <p data-testid="error-msg">Campos inválidos</p>}

        {JSON.parse(localStorage.getItem(productDetails.id)) !== null && (
          JSON.parse(localStorage.getItem(productDetails.id)).map((element, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">{element.email}</p>
              <p data-testid="review-card-rating">{element.email.rating}</p>
              <p data-testid="review-card-evaluation">{element.text}</p>
            </div>))
        )}
        {onClick && (
          <div>
            <p data-testid="review-card-email">{ email }</p>
            <p data-testid="review-card-rating">{ radioValue }</p>
            <p data-testid="review-card-evaluation">{ text }</p>
          </div>
        )}
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
