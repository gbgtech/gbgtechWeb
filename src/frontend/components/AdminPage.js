import React  from 'react';
import { browserHistory } from 'react-router';
import { get, putJson } from '../fetcher';

import AdminPostList  from './AdminPostList';

const AdminPage = React.createClass({
  getInitialState() {
    return {
      posts: []
    };
  },
  componentWillMount() {
    get('/posts?admin=1').then(posts => {
      this.setState({ posts });
    });
  },

  render() {
    const { posts } = this.state;
    const pending = posts.filter(p => p.accepted === 'WAITING');
    const processed = posts.filter(p => p.accepted !== 'WAITING');
    return(
      <section className="admin-page">
        <div >
          Pending
          <AdminPostList posts={pending} setAccepted={this.setAccepted} setDenied={this.setDenied} edit={this.edit} reset={this.reset} />
        </div>
        <div>
          Processed
          <AdminPostList posts={processed} setAccepted={this.setAccepted} setDenied={this.setDenied} edit={this.edit} reset={this.reset} />
        </div>
      </section>
    );
  },

  setAccepted(slug) {
    putJson(`/posts/${slug}/accepted`, {
      accepted: 'APPROVED'
    }).then(this.handleAcceptedResponse);
  },

  setDenied(slug) {
    putJson(`/posts/${slug}/accepted`, {
      accepted: 'DENIED'
    }).then(this.handleAcceptedResponse);
  },

  reset(slug) {
    putJson(`/posts/${slug}/accepted`, {
      accepted: 'WAITING'
    }).then(this.handleAcceptedResponse);
  },

  edit(slug) {
    browserHistory.push('/news/' + slug + '/edit');
  },

  handleAcceptedResponse(post) {
    this.setState({
      posts: this.state.posts.map(p => p.slug === post.slug ? post : p)
    });
  }
});

export default AdminPage;
