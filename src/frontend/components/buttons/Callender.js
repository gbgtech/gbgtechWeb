import React from 'react';
import ReactDOM from 'react-dom';

const Github = React.createClass({

  componentDidMount() {
    //TODO code this 
    const elem = ReactDOM.findDOMNode(this.link);

    if (!this.initialized) {
      this.initialized = true;
      const js = document.createElement('script');
      js.id = 'github-bjs';
      js.async=true;
      js.defer=true;
      js.src = 'https://buttons.github.io/buttons.js';
      elem.parentNode.appendChild(js);
    }
  },

  render() {
    return (
      <a class="github-button" href="https://github.com/ntkme/github-buttons/issues" data-style="mega" data-count-api="/repos/ntkme/github-buttons#open_issues_count" data-count-aria-label="# issues on GitHub" aria-label="Issue ntkme/github-buttons on GitHub">Issue</a>
    );
  }
});

export default Github
