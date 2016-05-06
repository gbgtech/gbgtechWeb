import React from 'react';

const TwitterButton = React.createClass({
  render() {
    return (
      <a data-show-count="false"
         className="twitter-follow-button main-follow-button"
         href="https://twitter.com/gbgtech"
         data-size="large"/>
    );
  }
});

export default TwitterButton;
