import React, { Component } from 'react';
import Category from '../Category';

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
        <Category />
      </div>
    );
  }
}

export default Home;
