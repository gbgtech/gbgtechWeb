import React from 'react';
import TwitterButton from './buttons/TwitterButton';
import RedditButton from './buttons/RedditButton';
import { get, postJson } from '../fetcher';
import swal from '../swal';

const RegistrationBox = React.createClass({
  getInitialState() {
    return {
      email: '',
      modalOpen: false,
      finished: false,
      categories: []
    };
  },
  componentDidMount() {
    get('/categories').then(categories => this.setState({categories}));
  },
  handleCategoryChecked(categoryId) {
    const categories = this.state.categories.map(category => {
      if (category._id === categoryId) {
        return {
          ...category,
          checked: !category.checked
        };
      } else {
        return category;
      }
    });

    this.setState({ categories });
  },
  openModal(event) {
    event.preventDefault();

    this.setState({
      modalOpen: true
    });
  },
  finishRegistration() {
    const { email, categories } = this.state;
    const selected = categories.filter(c => c.checked).map(c => c._id);

    postJson('/users/create', { email, categories: selected }).then(res => {
      console.log(res);
      swal({type: 'success', title: "Thanks man! 👊", text: (email + " registered with categories " + selected.map(c => c.name).join(', '))});
    });
    this.setState({
      finished: true
    });
  },

  renderModal() {
    const { categories } = this.state;

    return (
      <div className="register modal">
        <h3>Choose categories that interests you</h3>
        <ul className="categories row">
          {categories.map(category => (
            <li key={category._id}>
              <label><input type="checkbox" checked={category.checked} onChange={() => this.handleCategoryChecked(category._id)}/>{category.name}</label>
            </li>
          ))}
        </ul>
        <button className="button" onClick={this.finishRegistration}>Sign up</button>
      </div>
    );
  },

  renderFinished() {

    const { email, categories } = this.state;
    const selected = categories.filter(category => category.checked);

    return (
      <div className="register">
      </div>
    );
  },

  changeEmail(event) {
    this.setState({
      email: event.target.value
    });
  },

  renderForm() {
    return (
      <div className="follow-container">
        <div className="email paper-shadow">
          <h3>Sign up for our newsfeed</h3>
          <form className="email-form follow-button-row" onSubmit={this.openModal}>
            <input type="email"
                   tabIndex="1"
                   required={true}
                   className="main-follow-button"
                   value={this.state.email}
                   onChange={this.changeEmail}
                   placeholder="enter email" />
            <button className="button main-follow-button">Next</button>
          </form>
        </div>
        <div className="follow paper-shadow">
          <h3>Follow us on</h3>
          <div className="follow-us follow-button-row">
            <TwitterButton />
            <RedditButton />
          </div>
        </div>
      </div>
    );
  },

  render() {
    const { modalOpen, finished } = this.state;

    if (finished) {
      return this.renderFinished();
    } else if (modalOpen) {
      return this.renderModal();
    } else {
      return this.renderForm();
    }
  }
});

export default RegistrationBox;
