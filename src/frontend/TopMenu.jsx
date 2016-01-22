import React from 'react';
import { Link } from 'react-router';

var TopMenu = React.createClass({

    render() {
         return (
            <ul className="top-menu">
                <li><Link to={'/news'}>news</Link></li>
                <li><Link to={'/hubs'}>hubs</Link></li>
                <li><a href="http://gothenburgstartup.com">gothenburg startup map</a></li>
            </ul>
        );
    }
});

export default TopMenu;
