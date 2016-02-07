import React from 'react';
import ReactQuill from 'react-quill';
import {postJson,get} from '../fetcher';

const Post = React.createClass({
    getInitialState() {
        return {
            title: '',
            body: '',
            categories: [],
            showEventInfo:false,
            from : '',
            to:'',
            organizer:'',
            rsvpLink:'',
            position:''
        };
    },
    handleShowEventInfo(){
      this.setState({
         showEventInfo :! this.state.showEventInfo
      })
    },



    handleSetValue(event, name){
      this.setState({
        [name]: event.target.value
      });
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
    handleSubmit: function(event) {
      event.preventDefault();
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

                  { this.state.showEventInfo ? this.renderEventInfo() : null }


                <ReactQuill theme="snow" value={this.state.body} onChange={this.onTextChange}  />
                <button className="button">Submit</button>
              </form>

            </section>
        );
    },
    renderEventInfo () {
        return (
            <div className="eventInfo">
                <label>From:<input value={this.state.from} onChange={(event) => this.handleSetValue(event,'from')} type="datetime-local"/></label>
                <label>To:<input value={this.state.to}  onChange={(event) => this.handleSetValue(event,'to')} type="datetime-local"/></label>
                <label>Orginiser:<input value={this.state.organizer}  onChange={(event) => this.handleSetValue(event,'organizer')} /></label>
                <label>RSVP-link (optional):<input  value={this.state.handleRsvpLink}  onChange={(event) => this.handleSetValue(event,'rsvpLink')}  /></label>
                <label>position:<input value={this.state.position}  onChange={(event) => this.handleSetValue(event,'position')} /></label>


            </div>
        );
    }
});





export default Post;
