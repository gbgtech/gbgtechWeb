import React from 'react';
import { Link } from 'react-router';

var TopMenu = React.createClass({

    render() {
         return (
            <div className="top-menu">
              <ul>
                <li><Link to={'/news'}>news</Link></li>
                <li><Link to={'/hubs'}>hubs</Link></li>
                <li><a href="http://gothenburgstartup.com">Gothenburgstartup map</a></li>
              </ul>
            </div>
        );
    }
});

export default TopMenu;
