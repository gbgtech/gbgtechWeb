import React from 'react';

import {Link} from 'react-router';

import { get } from '../fetcher';

const ListFeeds = React.createClass({
  getInitialState() {
    return {
      feeds: []
    };
  },
  componentWillMount() {
    get('/feeds').then(feeds => this.setState({ feeds }));
  },
  render() {
    const { feeds } = this.state;
    return (
      <div className="feeds">
        <Link to={'/feed'} className="button">Add feed</Link>

        {feeds.map(feed => (
          <div className="row">{feed.name}  <Link to={'/feed/'+feed._id+"/edit"}>Edit</Link> </div>
        ))}
      </div>
    );
  }
});



export default ListFeeds;
