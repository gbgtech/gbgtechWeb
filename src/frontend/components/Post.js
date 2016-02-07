import React from 'react';
import ReactQuill from 'react-quill';

const Post = React.createClass({
    getInitialState() {
        return {
            email: '',
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
    componentDidMount() {
        fetch('/api/categories').then(res => res.json()).then(categories => {
            this.setState({categories});
        });
    },
    render() {
      const { categories } = this.state;
        return (
            <section>
              <form className="postForm">
                <labels>Title:<input value={this.state.body} /></labels>
                  <ul className="categories row">
                      {categories.map(category => (
                          <li key={category._id}>
                              <label><input type="checkbox" checked={category.checked} onChange={() => this.handleCategoryChecked(category._id)}/>{category.name}</label>
                          </li>
                      ))}
                  </ul>

                  <label><input type="checkbox" checked={this.state.showEventInfo} onChange={ this.handleShowEventInfo}/>Is event</label>

                  { this.state.showEventInfo ? <EventInfo /> : null }


                <ReactQuill theme="snow" value={this.state.body} />

              </form>

            </section>
        );
    }
});

var EventInfo = React.createClass({
    render: function() {
        return (
            <div className="eventInfo">
                <label>From:<input/></label>
                <label>To:<input/></label>
                <label>Orginiser:<input/></label>
                <label>rsvp (opt):<input/></label>
                <label>position:
                </label>

            </div>
        );
    }
});



export default Post;
