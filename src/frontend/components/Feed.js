import React from 'react';
import {postJson,putJson,get} from '../fetcher';
import { browserHistory } from 'react-router';


const outlets = [
  {
    "code": "reddit",
    "name": "Reddit"
  },
  {
    "code": "email",
    "name": "Email"
  },
  {
    "code": "twitter",
    "name": "Twitter"
  },
  {
    "code": "calendar",
    "name": "Calendar"
  },
  {
    "code": "site",
    "name": "Publish to newsfeed"
  }
]

const feed = React.createClass({
  getInitialState() {
    return {
      feed: {
        name: '',
        uniqueId: '',
        categories: [],
        vendor: 'meetup',
        acceptedDefault:  'WAITING',
        outlets: outlets.map(outlet => ({
          ...outlet,
          checked: true
        }))
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
    const { acceptedDefault, outlets, categories, name, uniqueId} = this.state.feed;
    return (
      <section className="feeds">
        <form className="postForm" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="control-label">Vendor</label>
            <select defaultValue="meetup" onChange={(event) => this.handleSetValue(event,'vendor')}>
              <option value="meetup">Meetup</option>
            </select>
          </div>
          <div className="form-group">
            <label className="control-label">Name</label>
            <input value={name} onChange={(event) => this.handleSetValue(event,'name')} />
          </div>
          <div className="form-group">
            <label className="control-label">Group name:</label>
            <input value={uniqueId} onChange={(event) => this.handleSetValue(event,'uniqueId')} />
          </div>
          <div className="form-group">
            <label className="control-label">Categories</label>
            <ul className="categories form-control">
              {categories.map(category => (
                <li key={category._id}>
                  <label>
                    <input type="checkbox" checked={category.checked} onChange={() => this.handleCategoryChecked(category._id)}/> {category.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="form-group">
            <label className="control-label">Default accepted status</label>
            <select value={acceptedDefault} onChange={(event) => this.handleSetValue(event,'acceptedDefault')} name="acceptedDefault">
              <option value="WAITING">Waiting</option>
              <option value="APPROVED">Approved</option>
            </select>
          </div>
          <div className="form-group">
            <label className="control-label">Publish to outlets</label>
            <ul className="categories form-control">
              {outlets.map(outlet => (
                <li key={outlet.code}>
                  <label>
                    <input type="checkbox" checked={outlet.checked} onChange={() => this.handleOutletChecked(outlet.code)}/> {outlet.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="form-group">
            <label className="control-label"></label>
            <button className="button">Submit</button>
          </div>
        </form>
      </section>
    );
  }
});

export default feed;
