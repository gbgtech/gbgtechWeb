import React from 'react';
import ReactQuill from 'react-quill';
import {postJson, putJson, get} from '../fetcher';

const Post = React.createClass({
  getInitialState() {
    return {
      post: {
        title: '',
        body: '',
        categories: [],
        showEventInfo:false,
        from : '',
        to:'',
        organizer:'',
        rsvpLink:'',
        position:''
      }
    };
  },
  handleShowEventInfo(){
    this.setState({
      post: {
        ...this.state.post,
        showEventInfo :! this.state.post.showEventInfo
      }
    })
  },
  handleSetValue(event, name){
    this.setState({
      post: {
        ...this.state.post,
        [name]: event.target.value
      }
    });
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
        const postCategories = post.categories.map(c => c._id);
        this.setState({post: {
          ...post,
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
    let method = postJson;
    if (this.state.post.id) {
      endpoint = `/posts/${this.state.posts.id}`;
      method = putJson;
    }
    method(endpoint, {
      ...this.state.post,
      categories: this.state.categories.filter(c => c.checked).map(c => c._id)
    })
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
    const { categories, title, showEventInfo, body } = this.state.post;
    return (
      <section>
        <form className="postForm" onSubmit={this.handleSubmit}>
          <labels>Title:<input value={title} onChange={(event) => this.handleSetValue(event,'title')} /></labels>
          <ul className="categories row">
            {categories.map(category => (
              <li key={category._id}>
                <label><input type="checkbox" checked={category.checked} onChange={() => this.handleCategoryChecked(category._id)}/>{category.name}</label>
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
