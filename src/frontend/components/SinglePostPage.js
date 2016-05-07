import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { get } from '../fetcher';

import NewsPost from './NewsPost';

import * as actions from '../store/actions';

const NewsPage = React.createClass({
  componentWillMount() {
    this.props.requestPost(this.props.postId);
  },
  render() {
    const { post } = this.props;

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

const mapStateToProps = (state, props) => {
  return {
    postId: props.params.postId,
    post: state.posts[props.params.postId]
  }
}

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actions, dispatch)
)(NewsPage);
