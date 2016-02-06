import React from 'react';

import moment from 'moment';

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
                    <article key={post.id}>
                        <h2>{post.title}</h2>
                        <small>by {post.author.email} | {moment(post.updatedAt).fromNow()} | {post.categories.map(c => c.name).join(', ')}</small>
                        <p>{post.body}</p>
                    </article>
                ))}
            </section>
        );
    }
});



export default NewsPage;
