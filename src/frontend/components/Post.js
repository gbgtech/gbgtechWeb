import React from 'react';
import ReactQuill from 'react-quill';
import {postJson, putJson, get} from '../fetcher';
import { browserHistory } from 'react-router';
import moment from 'moment';
import Geosuggest from 'react-geosuggest'

const formatDate = (momentDate = moment()) => moment(momentDate).format('YYYY-MM-DDTHH:mm');

const Post = React.createClass({
  getInitialState() {
    return {
      post: {
        title: '',
        body: '',
        categories: [],
        showEventInfo: false,
        from : formatDate(),
        to: formatDate(),
        organizer:'',
        rsvpLink:'',
        location:''
      },
      message: null
    };
  },
  handleShowEventInfo(){
    this.setState({
      post: {
        ...this.state.post,
        showEventInfo :! this.state.post.showEventInfo
      }
    });
  },
  handleSetValue(value, name){
    this.setState({
      post: {
        ...this.state.post,
        [name]: value
      }
    });
  },
  handleSetValueWithEvent(event, name){
    this.handleSetValue(event.target.value, name)
  },
  onTextChange(body) {
    this.setState({
      post: {
        ...this.state.post,
        body
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
        get(`/posts/${params.postId}`)
      );
    }

    Promise.all(requests)
    .then(([categories, post]) => {
      if (post) {
        const showEventInfo = !!post.eventData;
        const postCategories = post.categories.map(c => c._id);
        this.setState({post: {
          ...post,
          ...post.eventData,
          from: formatDate(post.eventData.from),
          to:   formatDate(post.eventData.to),
          showEventInfo,
          categories: categories.map(category => ({
            ...category,
            checked: postCategories.includes(category._id)
          }))
        }});

      } else {
        this.setState({post: {
          ...this.state.post,
          categories: categories
        }});
      }
    });
  },
  handleSubmit(event) {
    event.preventDefault();
    let endpoint = '/posts/create';
    let httpMethod = postJson;
    if (this.state.post.slug) {
      endpoint = `/posts/${this.state.post.slug}`;
      httpMethod = putJson;
    }
    httpMethod(endpoint, {
      ...this.state.post,
      categories: this.state.post.categories.filter(c => c.checked).map(c => c._id)
    })
    .then(res => {
      if (res.accepted === 'APPROVED') {
        browserHistory.push(`/news/${res.slug}`);
      } else {
        this.setState({
          message: 'Post has been submitted for review'
        });
      }
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
    const { message } = this.state;
    const { categories, title, showEventInfo, body } = this.state.post;
    return (
      <section>
        {message && <div className="message">{message}</div>}
        <form className="postForm" onSubmit={this.handleSubmit}>
          <labels>Title:<input value={title} onChange={(event) => this.handleSetValueWithEvent(event,'title')} /></labels>
          <ul className="categories row">
            {categories.map(category => (
              <li key={category._id}>
                <label><input type="checkbox" checked={category.checked || false} onChange={() => this.handleCategoryChecked(category._id)}/>{category.name}</label>
              </li>
            ))}
          </ul>
          <label><input type="checkbox" checked={showEventInfo} onChange={this.handleShowEventInfo}/>Is event</label>
          {showEventInfo && this.renderEventInfo()}
          <ReactQuill theme="snow" value={body} onChange={this.onTextChange} />
          <button className="button">Submit</button>
        </form>
      </section>
    );
  },
  renderEventInfo() {
    const { from, to, organizer, rsvpLink, location } = this.state.post;

    return (
      <div className="eventInfo">
        <label>
          From:
          <input value={from} onChange={(event) => this.handleSetValueWithEvent(event, 'from')} type="datetime-local"/>
        </label>
        <label>
          To:
          <input value={to} onChange={(event) => this.handleSetValueWithEvent(event, 'to')} type="datetime-local"/>
        </label>
        <label>
          Organizer:
          <input value={organizer} onChange={(event) => this.handleSetValueWithEvent(event, 'organizer')} />
        </label>
        <label>
          RSVP-link (optional):
          <input value={rsvpLink} onChange={(event) => this.handleSetValueWithEvent(event, 'rsvpLink')} />
        </label>

        <label>
          {/*<input value={location}  onChange={(event) => this.handleSetValueWithEvent(event, 'location')} />*/}
          Location:
          <Geosuggest
            onChange={this.onChange}
            onSuggestSelect={this.handleSelectSuggest}
            location={new google.maps.LatLng(57.7020124, 11.6135073)} // eslint-disable-line
            radius={42}
            autoActivateFirstSuggest={true}
          />
        </label>
      </div>
    );
  },

  handleSelectSuggest(suggest) {
    this.handleSetValue(
      {
        lat: suggest.location.lat,
        lng: suggest.location.lng
      },
      'location')
  }
});



export default Post;
