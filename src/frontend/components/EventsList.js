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
    events.forEach(event => {
      console.log(event.eventData.from);
    })
    return (
      <div>
        {events.map(event => (
          <EventPane key={event.slug} {...event} />
        ))}
      </div>
    );
  }
});


export default EventsList;
