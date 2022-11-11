import React from 'react';
import PropTypes from 'prop-types';
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
    const { productDetails: { title, thumbnail, price } } = this.state;
    return (
      <div>
        <h1 data-testid="product-detail-name">{title}</h1>
        <h2 data-testid="product-detail-price">{`R$ ${price}`}</h2>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
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
