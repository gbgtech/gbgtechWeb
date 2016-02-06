import React from 'react';
import moment from 'moment';


import NewsPost from './NewsPost';

const NewsPage = React.createClass({
    getInitialState() {
        return {
            posts: []
        };
    },
    componentDidMount() {
        fetch('/api/posts').then(res => res.json()).then(posts => {
            this.setState({ posts });
        })
    },
    render() {
        const { posts } = this.state;

        return (
            <section>
                {posts.map(post => (
                    <NewsPost key={post._id} post={post}/>
                ))}
            </section>
        );
    }
});



export default NewsPage;
