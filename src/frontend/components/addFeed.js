import React from 'react';
import {postJson,get} from '../fetcher';

const Post = React.createClass({
    getInitialState() {
        return {
          post: {
            name: '',
            uniqueId: '',
            categories: [],
            vendor:'Meetup',
            acceptedDefault:  'WAITING'
          }
        };
    },
    handleSetValue(event, name){
      this.setState({
        post: {
          ...this.state.post,
          [name]: event.target.value
        }
      });
    },
    componentDidMount() {
        get('/categories').then(categories => {
            console.log("state.post: ",this.state.post);
            this.setState({post: {
              ...this.state.post,
              categories: categories
            }});
          //  console.log(this.state.categories);

        });
    },
    handleSubmit: function(event) {
      event.preventDefault();
        postJson('/feeds/create',
            {
              ...this.state.post,
              categories: this.state.post.categories.filter(c => c.checked).map(c => c._id)
            }
        )
        .then(res => {
            console.log(res);
        });
    },
    handleCategoryChecked(categoryId) {
        const categories = this.state.post.categories.map(category => {
            if (category._id === categoryId) {
                return {
                    ...category,
                    checked: !category.checked
                };
            } else {
                return category;
            }
        });

        this.setState({
          post: {
            ...this.state.post,
            categories
          }
        });
    },
    render() {
      console.log(this.state);
      const { categories, name,uniqueId, showEventInfo, body } = this.state.post;
        return (
            <section>
              <form className="postForm" onSubmit={this.handleSubmit}>
                <select defaultValue="Meetup"  onChange={(event) => this.handleSetValue(event,'vendor')}>
                 <option value="Meetup">Meetup</option>
               </select>

                <labels>Name:<input value={name} onChange={(event) => this.handleSetValue(event,'name')} /></labels>
                <labels>Group name:<input value={uniqueId} onChange={(event) => this.handleSetValue(event,'uniqueId')} /></labels>
                <ul className="categories row">
                  {categories.map(category => (
                    <li key={category._id}>
                      <label><input type="checkbox" checked={category.checked} onChange={() => this.handleCategoryChecked(category._id)}/>{category.name}</label>
                    </li>
                  ))}
                </ul>
                <select defaultValue="WAITING" onChange={(event) => this.handleSetValue(event,'acceptedDefault')} name="acceptedDefault">
                 <option value="DENIED">DENIED</option>
                 <option value="WAITING">WAITING</option>
                 <option value="APPROVED">APPROVED</option>
               </select>
                <button className="button">Submit</button>
              </form>
            </section>
        );
    },
    renderEventInfo () {
      const { from, to, organizer, rsvpLink, position } = this.state.post;

      return (
          <div className="eventInfo">
              <label>
                From:
                <input value={from} onChange={(event) => this.handleSetValue(event, 'from')} type="datetime-local"/>
              </label>
              <label>
                To:
                <input value={to} onChange={(event) => this.handleSetValue(event, 'to')} type="datetime-local"/>
              </label>
              <label>
                Organizer:
                <input value={organizer} onChange={(event) => this.handleSetValue(event, 'organizer')} />
              </label>
              <label>
                RSVP-link (optional):
                <input value={rsvpLink} onChange={(event) => this.handleSetValue(event, 'rsvpLink')} />
              </label>
              <label>
                Position:
                <input value={position}  onChange={(event) => this.handleSetValue(event, 'position')} />
              </label>
          </div>
      );
    }
});

export default Post;
