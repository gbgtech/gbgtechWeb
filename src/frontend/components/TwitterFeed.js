import React from 'react';
import ReactDOM from 'react-dom';

const TwitterFeed = React.createClass({

  render() {
    const { path, id, children} = this.props;

    return (
      <div className="twitter-container paper-shadow">
        <h2>Twitter - <a href={`https://twitter.com/${path}`}>{children}</a></h2>
        <a
          className="twitter-timeline"
          ref={(link) => this.link = link }
          data-chrome="noborders noheader nofooter transparent"
          data-widget-id={id}>
        </a>
      </div>
    );
  }
});

export default TwitterFeed;
