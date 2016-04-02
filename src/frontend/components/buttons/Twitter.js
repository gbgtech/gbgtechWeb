import React from 'react';

const Twitter = React.createClass({

  componentDidMount() {
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
  },

  render() {
    return (
      <a
        data-show-count="false"
        className="twitter-follow-button"
        href="https://twitter.com/gbgtech"
         />
    );
  }
});

export default Twitter;
