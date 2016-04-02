import React from 'react';
import { get } from '../fetcher';


import NewsPost from './NewsPost';
import RegistrationBox from './RegistrationBox';

const NewsPage = React.createClass({
  getInitialState() {
    return {
      posts: []
    };
  },
  componentWillMount() {
    get('/posts').then(posts => this.setState({ posts }));
  },

  render() {
    const { posts } = this.state;

    return (
      <section>
        <RegistrationBox />
        {posts.map(post => (
          <NewsPost key={post._id} post={post}/>
        ))}
      </section>
    );
  }
});



export default NewsPage;
