import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class Details extends React.Component {
  state = {
    productDetails: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productDetails = await getProductById(id);
    this.setState({
      productDetails,
    });
  }

  render() {
    const { productDetails: { title, thumbnail, price },
      productDetails } = this.state;

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
