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

  setAccepted(id) {
    putJson(`/posts/${id}/accepted`, {
      accepted: 'APPROVED'
    }).then(this.handleAcceptedResponse);
  },

  setDenied(id) {
    putJson(`/posts/${id}/accepted`, {
      accepted: 'DENIED'
    }).then(this.handleAcceptedResponse);
  },

  reset(id) {
    putJson(`/posts/${id}/accepted`, {
      accepted: 'WAITING'
    }).then(this.handleAcceptedResponse);
  },

  edit(id) {
    browserHistory.push('/news/' + id + '/edit');
  },

  handleAcceptedResponse(post) {
    this.setState({
      posts: this.state.posts.map(p => p.slug === post.slug ? post : p)
    });
  }
});

export default AdminPage;
