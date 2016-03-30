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
    get('/events').then(result => this.setState({ events: result.items }));
  },
  render() {
    const { events } = this.state;
    return (
      <div>
        {events.map(event => (
          <EventPane key={event.id} {...event} />
        ))}
      </div>
    );
  }
});


export default EventsList;
