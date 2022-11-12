/* import React, { Component } from 'react';

class Form extends Component {
  state = {
    email: '',
    rating: 0,
    text: '',
    isValid: true,
  };

  componentDidMount() {
    const { product } = this.props;
    const itemStorage = JSON.parse(localStorage.getItem(product.id));
    this.setState({
      email: itemStorage[0].email,
      rating: itemStorage[0].rating,
      text: itemStorage[0].text,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { email, rating, text } = this.state;
    if (email === '' && rating === 0 && text === '') {
      this.setState({
        isValid: false,
      });
    }
    this.setLocalStorage();
  };

  setLocalStorage = () => {
    const { product } = this.props;
    const itemStorage = JSON.parse(localStorage.getItem(product.id));
    const { email, rating, text } = this.state;
    if (itemStorage === null) {
      localStorage.setItem(product.id, JSON.stringify(
        [
          {
            email,
            text,
            rating,
          },
        ],
      ));
    } else {
      localStorage.setItem(product.id, JSON.stringify([...itemStorage, {
        email,
        text,
        rating,
      }]));
    }
  };

  render() {
    const { email, rating, text, isValid } = this.state;
    return (
      <>
        <form>
          <fieldset>
            <input
              data-testid="product-detail-email"
              type="email"
              name="email"
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
                value="1"
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
                value="2"
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
                value="3"
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
                value="4"
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
                value="5"
                onChange={ this.handleChange }
              />
            </label>
          </fieldset>
          <fieldset>
            <textarea
              data-testid="product-detail-evaluation"
              name="text"
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
          isValid === false ? <p data-testid="error-msg">Campos inválidos</p> : (
            <>
              <p>{email}</p>
              <p>{text}</p>
              <p>{rating}</p>
            </>
          )
        }
      </>

    );
  }
}

export default Form; */
