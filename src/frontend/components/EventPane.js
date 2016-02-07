import React from 'react';
import moment from 'moment';


const EventPane = (event) => (
    <div className="event-pane">
        <h4>{event.summary}</h4>
        <small>{moment(event.start.dateTime).format('YYYY-MM-DD HH:mm')}</small>
        <div className="description">{event.description}</div>
    </div>
);

export default EventPane;