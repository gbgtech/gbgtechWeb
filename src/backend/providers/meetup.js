const slugify = require('speakingurl');

const mongoose = require('mongoose');
const Bacon = require('baconjs').Bacon;

const Posts = mongoose.model('Posts');
const Feeds = mongoose.model('Feeds');

const config = require('../config/config');

const fetch = require('node-fetch');
const _ = require('lodash');
const Headers = fetch.Headers;


module.exports = {
  fetchMeetupEvents
};


const fetchEvents = (feed) =>//promess()
    fetch(`https://api.meetup.com/2/events?key=${config.meetup.apiKey}&group_urlname=${feed.uniqueId}`)
        .then(res => res.json());

function fetchMeetupEvents() {
    return Bacon
      .fromPromise(Feeds.find({ vendor: 'meetup' }))
      .flatMap(feeds => {
        console.log("key: "+ config.meetup.apiKey)
        console.info("Fetching events for meetup:", feeds.map(feed => feed.uniqueId).join(', '))

        return Bacon.fromArray(feeds)
          .flatMap(feed => Bacon
            .fromPromise(fetchEvents(feed))
            .flatMap(group => Bacon.fromArray(group.results))
            .map(result => transformMeetupEvent(result, feed))
            .flatMap(event => Bacon.fromNodeCallback(transformToUpsertPromise(event)))
          )
      })
      .toPromise()
}


const upsertOptions = { upsert: true, setDefaultsOnInsert: true };


const transformToUpsert = (event, nodeCallback) => Posts.findOneAndUpdate({
  $and: [
      {"origin.provider": event.origin.provider},
      {"origin.id": event.origin.id}
  ]
}, { $set: event }, upsertOptions, nodeCallback);



const transformMeetupEvent = (event, feed) => {

  return {
    origin: {
      updatedAt: event.updated,
      provider: 'meetup',
      id: event.id,
      url: event.event_url
    },
    accepted: feed.acceptedDefault,
    author: feed.userId,
    title: event.name,
    slug: slugify([
      event.id,
      event.group.name,
      event.name
    ].join(' ')),
    body: event.description,
    categories: feed.categories,
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
  }};
