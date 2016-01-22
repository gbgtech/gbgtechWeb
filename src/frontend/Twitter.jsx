import React from 'react';
import ReactDOM from 'react-dom';

const Twitter = React.createClass({

    componentDidMount() {
        const elem = ReactDOM.findDOMNode(this.link);

        if (!this.initialized) {
            this.initialized = true;

            const js = document.createElement('script')
            js.id = 'twitter-wjs';
            js.src = '//platform.twitter.com/widgets.js';
            elem.parentNode.appendChild(js);
        }
    },

    render() {
        const { path, id, children, width } = this.props;

        return (
            <a
                className="twitter-timeline"
                ref={(link) => this.link = link }
                href={`https://twitter.com/${path}`}
                data-widget-id={id}>
                    {children}
            </a>
        );
    }
});

export default Twitter;
