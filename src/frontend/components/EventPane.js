import React from 'react';

import { formatDateTime } from '../formatter';

import { renderTimeTag } from './NewsPost';

const EventPane = (event) => (
    <a className="event-pane" href={'/news/'+event.slug}>
        <small>{renderTimeTag(event.eventData.from, formatDateTime)}</small>
        <h4>{event.title}</h4>
    </a>
);

export default EventPane;
