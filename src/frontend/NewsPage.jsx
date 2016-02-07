import React from 'react';
import { get } from './fetcher';


import NewsPost from './NewsPost';

const NewsPage = React.createClass({
    getInitialState() {
        return {
            posts: []
        };
    },
    componentDidMount() {
        get('/posts').then(posts => this.setState({ posts }));
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
