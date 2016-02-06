import React from 'react';
import ReactQuill from 'react-quill';



const Hello = React.createClass({
    render() {
        return (
            <section>
              <form>
                <labels>Title:<input /></labels>
                <labels>body:<input /></labels>
                <ReactQuill value={this.state.value} />

              </form>

            </section>
        );
    }
});



export default Hello;
