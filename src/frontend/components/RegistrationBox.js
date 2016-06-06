import React from 'react';
import RedditButton from './buttons/RedditButton';
import RssButton from './buttons/RssButton';
import GCalendarButton from './buttons/GCalendarButton';
import { get, postJson,putJson } from '../fetcher';
import { connect } from 'react-redux';
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

    const newCategories=this.state.categories.map((category)=>({
      ...category,
      checked: this.props.user && this.props.user.subscribedCategories.includes(category._id)
    }));


    this.setState({
      modalOpen: true,
      categories: newCategories
    });
  },
  finishRegistration() {
    const { email, categories } = this.state;
    const selected = categories.filter(c => c.checked).map(c => c._id);

    postJson('/users/create', { email, categories: selected }).then(() => {
      swal({type: 'success', title: "Thanks man! 👊", text: (email + " registered with categories " + selected.map(c => c.name).join(', '))});
    });
    this.setState({
      finished: true
    });
  },
  updateCattegorys(){
    const { categories } = this.state;
    const selected = categories.filter(c => c.checked).map(c => c._id);
    putJson('/users/updateCategories', {categories: selected }).then(() => {
      swal({type: 'success', title: "Updated", text: ("Updated with categories")});
    });
    this.setState({
      finished: true
    });
  },

  renderModal() {
    const { categories } = this.state;

    return (
      <div className="follow-container register modal paper-shadow">
      <h3>Choose categories that interests you</h3>
      <div className="categories">
      <ul>
      {categories.map(category => (
        <li key={category._id}>
        <label><input type="checkbox" checked={category.checked} onChange={() => this.handleCategoryChecked(category._id)}/>{category.name}</label>
        </li>
      ))}
      </ul>
      </div>
      <div className="justify-end">
      {this.props.signedIn ?
        (<button className="button" onClick={this.updateCattegorys}> update </button>):
        (<button className="button" onClick={this.finishRegistration}> Sign up</button> )
      }
      </div>
      </div>
    );
  },

  renderFinished() {
    return null;
  },

  changeEmail(event) {
    this.setState({
      email: event.target.value
    });
  },

  renderFollowButtons() {
    return (
      <div className="follow paper-shadow">
        <h3>Follow us on</h3>
        <div className="follow-us follow-button-row">
          <RedditButton />
          <RssButton />
          <GCalendarButton />
        </div>
      </div>
    );
  },
  renderForm() {
    return (
      <div className="follow-container">
      {this.renderEmailForm()}
      {this.renderFollowButtons()}
      </div>
    );
  },
  renderEmailForm(){
    if(this.props.signedIn){
      return (
        <div className="email paper-shadow">
          <h3>Email preferences</h3>
          <div className="row">
            <button className="edit-button button main-follow-button" onClick={this.openModal}>Edit</button>
          </div>
        </div>
      );
    } else {
      return(
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
      );
    }
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

const mapStateToProps = state => ({
  signedIn: state.signedIn,
  user: state.user
});

export default connect(mapStateToProps)(RegistrationBox);
