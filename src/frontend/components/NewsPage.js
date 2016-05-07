import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { get } from '../fetcher';

import NewsPost from './NewsPost';
import RegistrationBox from './RegistrationBox';

import * as actions from '../store/actions';


const NewsPage = React.createClass({
  componentWillMount() {
    this.props.requestPosts();
  },
  render() {
    const { posts } = this.props;
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

const mapStateToProps = (state, props) => {
  const { postsOrder, posts } = state;
  return {
    order: postsOrder,
    posts: postsOrder.map(id => posts[id])
  }
}


export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actions, dispatch)
)(NewsPage);
