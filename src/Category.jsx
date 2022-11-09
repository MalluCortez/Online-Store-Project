import React, { Component } from 'react';
import { getCategories } from './services/api';

class Category extends Component {
  // constructor(props) {
  //     super(props);
  // }
  state = { list: [] };

  async componentDidMount() {
    const apiCategory = await getCategories();
    this.setState({ list: apiCategory });
  }

  render() {
    const { list } = this.state;

    return (
      <ul>
        {list.map((cat) => (
          <li id="liProducts" key={ cat.id }>
            <label data-testid="category" htmlFor={ cat.id }>
              <input type="radio" name="category" id={ cat.id } />
              {cat.name}
            </label>
          </li>
        ))}

      </ul>
    );
  }
}

export default Category;
