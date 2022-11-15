import React from 'react';
import PropTypes from 'prop-types';

class Payment extends React.Component {
  state = {
    adress: '',
    cep: '',
    phone: '',
    cpf: '',
    email: '',
    cart: [],
    invalidFields: true,
    payment: '',
  };

  componentDidMount() {
    const a = this.getLocalStorage();
    this.setState({ cart: a });
  }

  getLocalStorage = () => {
    const a = localStorage.getItem('products');
    if (a !== null) {
      const b = JSON.parse(a);
      const c = b.map((i) => i.id);
      const d = c.filter((pt, idx, arr) => arr.indexOf(pt) === idx);
      const arrEmp = d.map((id) => (b.filter((item) => item.id === id)));
      return arrEmp;
    }
  };

  verifyFields = () => {
    const { history } = this.props;
    const { email, cpf, phone, cep, adress, payment } = this.state;
    if (phone !== ''
      && adress !== ''
      && cep !== ''
      && email !== ''
      && email.includes('@')
      && email.includes('.com')
      && cpf !== ''
      && payment === 'on'
    ) {
      this.setState({ invalidFields: true });
      history.push('/');
      localStorage.removeItem('products');
    } else {
      this.setState({ invalidFields: false });
    }
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  render() {
    const { cart, invalidFields } = this.state;
    const filteredCart = cart.reduce((acc, cur) => {
      if (!acc.some((item) => item[0].id === cur.id)) acc.push(cur);
      return acc;
    }, []);
    return (
      <div className="payment">
        <fieldset className="produtosInCart">
          {filteredCart.map((item) => (
            <div key={ item[0].id }>
              <p>{item[0].title}</p>
              <p>{item[0].price}</p>
            </div>
          ))}
          <h4>Total:</h4>
        </fieldset>
        <form>
          <fieldset className="PersonalData">
            {invalidFields === false
            && <h2 data-testid="error-msg">Campos inválidos</h2> }
            <label htmlFor="fullName">
              Nome Completo:
              <input
                required
                data-testid="checkout-fullname"
                type="text"
                name="fullName"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                onChange={ this.handleChange }
                required
                data-testid="checkout-email"
                type="email"
                name="email"
              />
            </label>
            <label htmlFor="cpf">
              CPF:
              <input
                onChange={ this.handleChange }
                required
                data-testid="checkout-cpf"
                type="text"
                name="cpf"
              />
            </label>
            <label htmlFor="phone">
              Telefone:
              <input
                onChange={ this.handleChange }
                required
                data-testid="checkout-phone"
                type="text"
                name="phone"
              />
            </label>
            <label htmlFor="cep">
              CEP:
              <input
                onChange={ this.handleChange }
                required
                data-testid="checkout-cep"
                type="text"
                name="cep"
              />
            </label>
            <label htmlFor="adress">
              Endereço:
              <input
                onChange={ this.handleChange }
                required
                data-testid="checkout-address"
                type="text"
                name="adress"
              />
            </label>
          </fieldset>
          <fieldset className="paymentMetod">
            <label htmlFor="ticket">
              Boelto
              <input
                onChange={ this.handleChange }
                required
                data-testid="ticket-payment"
                type="radio"
                name="payment"
                id="boleto"
              />
            </label>
            <label htmlFor="visa">
              Visa
              <input
                onChange={ this.handleChange }
                required
                data-testid="visa-payment"
                type="radio"
                name="payment"
                id="visa"
              />
            </label>
            <label htmlFor="master">
              Master Card
              <input
                onChange={ this.handleChange }
                required
                data-testid="master-payment"
                type="radio"
                name="payment"
                id="master"
              />
            </label>
            <label htmlFor="elo">
              Elo
              <input
                onChange={ this.handleChange }
                required
                data-testid="elo-payment"
                type="radio"
                name="payment"
                id="elo"
              />
            </label>
          </fieldset>
          <button
            onClick={ this.verifyFields }
            data-testid="checkout-btn"
            type="button"
          >
            Finalizar
          </button>
        </form>
      </div>
    );
  }
}
Payment.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Payment;
