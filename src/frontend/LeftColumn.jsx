import React from 'react';

import EventPane from './EventPane';

const LeftColumn = React.createClass({

    render() {
        return (
            <div className="left-column">
                <EventPane date="11 januari">Ping pong</EventPane>
                <EventPane date="11 januari">Ping pong</EventPane>
                <EventPane date="11 januari">Ping pong</EventPane>
                <EventPane date="11 januari">Ping pong</EventPane>
                <EventPane date="11 januari">Ping pong</EventPane>
                <EventPane date="11 januari">Ping pong</EventPane>
                <EventPane date="11 januari">Ping pong</EventPane>
                <EventPane date="11 januari">Ping pong</EventPane>
                <EventPane date="11 januari">Ping pong</EventPane>
                <EventPane date="11 januari">Ping pong</EventPane>
                <EventPane date="11 januari">Ping pong</EventPane>
            </div>
        );
    }
});

export default LeftColumn;
