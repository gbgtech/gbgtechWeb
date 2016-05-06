import React from 'react';
import ReactDOM from 'react-dom';

const Twitter = React.createClass({

  componentDidMount() {
    const elem = ReactDOM.findDOMNode(this.link);

    if (!this.initialized) {
      this.initialized = true;

      const js = document.createElement('script');
      js.id = 'twitter-wjs';
      js.src = '//platform.twitter.com/widgets.js';
      elem.parentNode.appendChild(js);
    }
  },

  render() {
    const { path, id, children} = this.props;

    return (
      <div className="twitter-container">
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

export default Twitter;
