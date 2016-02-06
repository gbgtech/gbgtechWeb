import React from 'react';
import ReactQuill from 'react-quill';



const Post = React.createClass({
    getInitialState() {
        return {
            email: '',
            modalOpen: false,
            finished: false,
            categories: []
        };
    },
    render() {
        return (
            <section>
              <form className="postForm">
                <labels>Title:<input /></labels>
                <labels>body:</labels>
                <ReactQuill theme="snow" value={this.state.value} />

              </form>

            </section>
        );
    }
});


export default Post;
