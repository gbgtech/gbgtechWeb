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
              <form>
                <labels>Title:<input /></labels>
                <labels>body:<input /></labels>
                <ReactQuill theme="snow" value={this.state.value} />

              </form>

            </section>
        );
    }
});



export default Post;
