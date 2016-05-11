import React from 'react';

const RssButton = React.createClass({
  render() {
    return (
      <a className="rss-button main-follow-button" href={'/api/rss'} target="_blank" rel="noopener noreferrer"/>
    );
  }
});

export default RssButton;
