import React from 'react';
import Editor from './Editor';

import { convertToRaw, convertFromRaw, EditorState, ContentState } from 'draft-js';
import _ from 'lodash';

import {postJson, get} from '../fetcher';

const LOCAL_STORAGE_KEY = 'gbgtechweb:post:new'

const emptyPost = {
  title: '',
  body: null,
  categories: [],
  showEventInfo: false,
  from: '',
  to: '',
  organizer: '',
  rsvpLink: '',
  position: ''
};

const Post = React.createClass({
  getInitialState() {
    let savedState = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedState) {
      savedState = JSON.parse(savedState);
      if (savedState.body) {
        savedState.body = EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromRaw(savedState.body)
          )
        )
      }
      savedState = {
        ...emptyPost,
        ...savedState
      }
    }

    return {
      categories: [],
      post: savedState || emptyPost
    };
  },
  setPostState(post, callback) {
    this.setState({ post }, () => {
      if (callback) {
        callback();
      }
      this.storePostState(this.state.post);
    })
  },
  handleShowEventInfo(){
    this.setPostState({
      ...this.state.post,
      showEventInfo: !this.state.post.showEventInfo
    })
  },
  handleSetValue(event, name){
    this.setPostState({
      ...this.state.post,
      [name]: event.target.value
    });
  },
  onTextChange(body) {
    this.setPostState({
      ...this.state.post,
      body
    });
  },
  componentDidMount() {
    get('/categories').then(categories => {
      this.setState({ categories });
    });

    this.storePostState = _.debounce(() => {
      const post = this.state.post;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        ...post,
        body: post.body && convertToRaw(post.body.getCurrentContent())
      }));
    }, 2000);
  },
  handleSubmit(event) {
    event.preventDefault();
    postJson('/posts/create', {
      ...this.state.post,
      body: convertToRaw(this.state.post.body.getCurrentContent())
    })
    .then(res => {
      console.log(res);
    });
  },
  handleCategoryChecked(categoryId) {
    if (this.state.post.categories.includes(categoryId)) {
      this.setPostState({
        ...this.state.post,
        categories: this.state.post.categories.filter(c => c !== categoryId)
      })
    } else {
      this.setPostState({
        ...this.state.post,
        categories: [...this.state.post.categories, categoryId]
      })
    }
  },

  render() {
    const categories = this.state.categories;
    const { categories: selectedCategories, title, showEventInfo, body } = this.state.post;
    return (
      <section>
        <form className="postForm" onSubmit={this.handleSubmit}>
          <labels>Title:<input value={title} onChange={(event) => this.handleSetValue(event,'title')} /></labels>
          <ul className="categories row">
            {categories.map(category => (
              <li key={category._id}>
                <label><input type="checkbox" checked={selectedCategories.includes(category._id)} onChange={() => this.handleCategoryChecked(category._id)}/>{category.name}</label>
              </li>
            ))}
          </ul>
          <label><input type="checkbox" checked={showEventInfo} onChange={this.handleShowEventInfo}/>Is event</label>
          {showEventInfo && this.renderEventInfo()}
          <Editor onChange={this.onTextChange} initialValue={body} />

          <button className="button">Submit</button>
        </form>
      </section>
    );
  },
  renderEventInfo () {
    const { from, to, organizer, rsvpLink, position } = this.state.post;

    return (
      <div className="eventInfo">
        <label> From:
          <input value={from} onChange={(event) => this.handleSetValue(event, 'from')} type="datetime-local"/>
        </label>
        <label> To:
          <input value={to} onChange={(event) => this.handleSetValue(event, 'to')} type="datetime-local"/>
        </label>
        <label> Organizer:
          <input value={organizer} onChange={(event) => this.handleSetValue(event, 'organizer')} />
        </label>
        <label> RSVP-link (optional):
          <input value={rsvpLink} onChange={(event) => this.handleSetValue(event, 'rsvpLink')} />
        </label>
        <label> Position:
          <input value={position}  onChange={(event) => this.handleSetValue(event, 'position')} />
        </label>
      </div>
    );
  }
});





export default Post;
