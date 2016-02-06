import React from 'react';
import moment from 'moment';

import { Link } from 'react-router';

const NewsPost = ({ post }) => (
    <article>
        <h2><Link to={`/news/${post._id}`}>{post.title}</Link></h2>
        <small>by {post.author.email} | {moment(post.updatedAt).fromNow()} | {post.categories.map(c => c.name).join(', ')}</small>
        <p>{post.body}</p>
    </article>
);

export default NewsPost;