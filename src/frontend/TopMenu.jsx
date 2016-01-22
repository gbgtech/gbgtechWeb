import React from 'react';
import { Link } from 'react-router';

var TopMenu = React.createClass({

    render() {
         return (
            <div>
                <Link to={'/hubs'}>hubs</Link>
                <Link to={'/map'}>map</Link>
            </div>
        );
    }


});

export default TopMenu;
