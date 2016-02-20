import React from 'react';

import { formatDate } from '../formatter';

const EventPane = (event) => (
    <div className="event-pane">
        <h4>{event.summary}</h4>
        <small>{formatDate(event.start.dateTime)}</small>
        <div className="description">{event.description}</div>
    </div>
);

export default EventPane;