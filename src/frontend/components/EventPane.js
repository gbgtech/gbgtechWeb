import React from 'react';

import { formatDate } from '../formatter';

const EventPane = (event) => (
    <a className="event-pane" href={'/news/'+event.slug}>
        <h4>{event.title}</h4>
        <small>{formatDate(event.eventData.from)}</small>
    </a>
);

export default EventPane;
