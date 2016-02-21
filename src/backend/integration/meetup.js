const mongoose = require('mongoose');
const Posts = mongoose.model('Posts');

const config = require('../config/config');

const fetch = require('node-fetch');
const _ = require('lodash');
const Headers = fetch.Headers;


module.exports = {
  fetchMeetupEvents
};


const fetchEvents = (group) =>
    fetch(`https://api.meetup.com/2/events?key=${config.meetup.apiKey}&group_urlname=${group}`)
        .then(res => res.json());

function fetchMeetupEvents() {

    return Promise.all(config.meetup.groups.map(fetchEvents))
      .then(events => {
          events = _.flatMap(events, (e) => e.results)
                      .map(transformMeetupEvent);

          return Promise.all(events.map(transformToUpsertPromise))
            .then((events) => res.json(events).end())
      })
      .catch(err => console.error(err))
}


const upsertOptions = { upsert: true, setDefaultsOnInsert: true };


const transformToUpsertPromise = (event) => new Promise((resolve) => Posts.findOneAndUpdate({
  $and: [
      {"origin.provider": event.origin.provider},
      {"origin.id": event.origin.id}
  ]
}, { $set: event }, upsertOptions, (err, res) => resolve(res));



const transformMeetupEvent = (event) => ({
  origin: {
    updatedAt: event.updated,
    provider: 'meetup',
    id: event.id,
    url: event.event_url
  },
  accepted: 'APPROVED',
  title: event.name,
  body: event.description,
  eventData: {
    from: event.time,
    to: ((event.duration && event.time + event.duration) || (event.time + 3600000)),
    organizer: event.group.name,
    rsvp: event.event_url,
    location: {
      lat: event.venue.lat,
      lng: event.venue.lon,
      name: [event.venue.name, event.venue.address_1].join(', ')
    }
  }
});
