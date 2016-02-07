import React from 'react';
import ReactQuill from 'react-quill';
import {postJson,get} from '../fetcher';

const Post = React.createClass({
    getInitialState() {
        return {
            title: '',
            body: '',
            categories: [],
            showEventInfo:false
        };
    },
    handleShowEventInfo(){
      this.setState({
         showEventInfo :! this.state.showEventInfo
      })
    },
    handleTitlechange(event){
      this.setState({
         title : event.target.value
      })
    },
    onTextChange: function(value) {
      this.setState({ body:value });
    },
    componentDidMount() {
        get('/categories').then(categories => {
            this.setState({categories});
        });
    },
    handleSubmit: function() {
        postJson('/posts/create',
            {
              ...this.state,
              categories: this.state.categories.filter(c => c.checked).map(c => c._id)
            }
        )
        .then(res => {
            console.log(res);
        });

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

    render() {
      const { categories } = this.state;
        return (
            <section>
              <form className="postForm" onSubmit={this.handleSubmit}>
                <labels>Title:<input value={this.state.title} onChange={this.handleTitlechange} /></labels>
                  <ul className="categories row">
                      {categories.map(category => (
                          <li key={category._id}>
                              <label><input type="checkbox" checked={category.checked} onChange={() => this.handleCategoryChecked(category._id)}/>{category.name}</label>
                          </li>
                      ))}
                  </ul>

                  <label><input type="checkbox" checked={this.state.showEventInfo} onChange={ this.handleShowEventInfo}/>Is event</label>

                  { this.state.showEventInfo ? <EventInfo /> : null }


                <ReactQuill theme="snow" value={this.state.body} onChange={this.onTextChange}  />
                <button className="button">Submit</button>
              </form>

            </section>
        );
    }
});

var EventInfo = React.createClass({
    render: function() {
        return (
            <div className="eventInfo">
                <label>From:<input type="datetime-local"/></label>
                <label>To:<input type="datetime-local"/></label>
                <label>Orginiser:<input/></label>
                <label>RSVP-link (optional):<input/></label>
                <label>position:<input/></label>


            </div>
        );
    }
});



export default Post;
