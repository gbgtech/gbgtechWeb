import React from 'react';
import ReactQuill from 'react-quill';
import {postJson,get} from '../fetcher';

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
         showEventInfo :! this.state.showEventInfo
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
    onTextChange: function(body) {
      this.setState({
        post: {
          ...this.state.post,
          body
        }
      });
    },
    componentDidMount() {
        get('/categories').then(categories => {
            this.setState({categories});
        });
    },
    handleSubmit: function(event) {
      event.preventDefault();
        postJson('/posts/create',
            {
              ...this.state.post,
              categories: this.state.categories.filter(c => c.checked).map(c => c._id)
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
                <ReactQuill theme="snow" value={body} onChange={this.onTextChange}  />
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
