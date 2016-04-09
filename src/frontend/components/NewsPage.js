import React from 'react';
import { get } from '../fetcher';
import { connect } from 'react-redux';

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
    const { signedIn } = this.props;
    const { posts } = this.state;
    return (
      <section>
          {!signedIn && <RegistrationBox />}
        {posts.map(post => (
          <NewsPost key={post._id} post={post}/>
        ))}
      </section>
    );
  }
});

const mapStateToProps = state => ({
  signedIn: state.signedIn
});

export default connect(mapStateToProps)(NewsPage);
