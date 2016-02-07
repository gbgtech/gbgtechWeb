import React from 'react';

import { get, postJson } from '../fetcher';

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

        postJson('/users/create',
            { email, categories: selected }
        )
        .then(res => {
            console.log(res);
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
                <h3>Thanks man! 👊</h3>
                {email}
                {selected.map(c => c.name).join(', ')}
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
            <div className="register row">
                <h3>Sign up for our newsfeed:</h3>
                <form className="row" onSubmit={this.openModal}>
                    <input type="email" tabIndex="1" required value={this.state.email} onChange={this.changeEmail} placeholder="Enter your email" />
                    <button className="button">Next</button>
                </form>
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

