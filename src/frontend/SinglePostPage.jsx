import React from 'react';
import moment from 'moment';

import { get } from './fetcher';

import NewsPost from './NewsPost';

const NewsPage = React.createClass({
    getInitialState() {
        return {
            post: undefined
        };
    },
    componentDidMount() {
        get('/posts/' + this.props.params.postId).then(post => {
            this.setState({ post });
        });
    },
    render() {
        const { post } = this.state;

        if (!post) {
            return <section></section>;
        }

        return (
            <section>
                <NewsPost key={post._id} post={post}/>
            </section>
        );
    }
});



export default NewsPage;