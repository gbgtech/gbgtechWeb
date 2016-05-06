import React from 'react';

import EventPane from './EventPane';

import { get } from '../fetcher';

const EventsList = React.createClass({
  getInitialState() {
    return {
      events: []
    };
  },
  componentDidMount() {
    get('/events').then(result => this.setState({ events: result }));
  },
  render() {
    const { events } = this.state;
    return (
      <div className="events-list paper-shadow">
        <h2>Upcoming events</h2>
        {events.map(event => (
          <EventPane key={event.slug} {...event} />
        ))}
      </div>
    );
  }
});


export default EventsList;
