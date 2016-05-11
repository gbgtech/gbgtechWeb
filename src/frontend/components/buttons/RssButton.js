import React from 'react';

const RssButton = React.createClass({

  //<img src="assets/rss.svg" alt="Embed RSS"/>
  render() {
    return (
      <a className="rss-button main-follow-button" href={process.env.URL}>
      </a>
    );
  }
});

export default RssButton;
