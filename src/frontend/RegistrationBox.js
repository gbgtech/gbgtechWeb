import React from 'react';

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
        // fetch data -> setState
        this.setState({
            categories: [
                {id: 1, name: 'Ping pong', checked: false},
                {id: 2, name: 'Techföreläsning', checked: false},
                {id: 3, name: 'Startupföreläsning', checked: false},
                {id: 4, name: 'After hours (fest)', checked: false},
                {id: 5, name: 'Show and tell', checked: false},
                {id: 6, name: 'Ping pong', checked: false},
                {id: 7, name: 'Techföreläsning', checked: false},
                {id: 8, name: 'Startupföreläsning', checked: false},
                {id: 9, name: 'After hours (fest)', checked: false},
                {id: 10, name: 'Show and tell', checked: false}
            ]
        });
    },
    handleCategoryChecked(categoryId) {
        const categories = this.state.categories.map(category => {
            if (category.id === categoryId) {
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
        const selected = categories.filter(c => c.checked).map(c => c.id);

        fetch('/api/users/create', {
            method: 'POST',
            body: JSON.stringify({ email, categories: selected })
        }).then(res => {
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
                        <li key={category.id}>
                            <label><input type="checkbox" checked={category.checked} onChange={() => this.handleCategoryChecked(category.id)}/>{category.name}</label>
                        </li>
                    ))}
                </ul>
                <button onClick={this.finishRegistration}>Sign up</button>
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
                    <input type="email" required value={this.state.email} onChange={this.changeEmail} placeholder="Enter your email" />
                    <button>Next</button>
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

