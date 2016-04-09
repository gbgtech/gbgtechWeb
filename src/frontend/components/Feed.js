import React from 'react';
import {postJson,putJson,get} from '../fetcher';
import { browserHistory } from 'react-router';

const feed = React.createClass({
  getInitialState() {
    return {
      feed: {
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
      feed: {
        ...this.state.feed,
        [name]: event.target.value
      }
    });
  },
  componentDidMount() {

    const requests = [
      get('/categories')
    ];
    const { params, route: { path } } = this.props;

    if (path.includes('/edit')) {
      requests.push(
        get(`/Feeds/${params.feedId}`)
      );
    }

    Promise.all(requests)
    .then(([categories, feed]) => {
      if(feed){
        this.setState({feed: {
          ...feed,
          categories: categories.map(category => ({
            ...category,
            checked: feed.categories.includes(category._id)
          }))
        }
        });
      }else{
        this.setState({feed: {
          ...this.state.feed,
          categories: categories
        }});
      }
    });
  },
  handleSubmit: function(event) {
    event.preventDefault();
    const {params, route: { path } } = this.props;
    let endpoint = '/feeds/create';
    let httpMethod = postJson;
    if (path.includes('/edit')) {
      endpoint = `/feeds/${params.feedId}`;
      httpMethod = putJson;
    }
    httpMethod(endpoint, {
      ...this.state.feed,
      categories: this.state.feed.categories.filter(c => c.checked).map(c => c._id)
    })
    .then(() => {
      browserHistory.push(`/feeds`);

    });

  },
  handleCategoryChecked(categoryId) {
    const categories = this.state.feed.categories.map(category => {
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
      feed: {
        ...this.state.feed,
        categories
      }
    });
  },
  render() {
    const { categories, name,uniqueId} = this.state.feed;
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

export default feed;
