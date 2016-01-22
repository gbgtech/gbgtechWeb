import React from 'react';


const EventPane = ({date, children}) => (
    <div className="event-pane">
        <h6>{date}</h6>
        {children}
    </div>
);

export default EventPane;