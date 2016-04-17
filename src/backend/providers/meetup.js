const slugify = require('speakingurl');

const mongoose = require('mongoose');
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
    Feeds.find({
      vendor: 'meetup'
    }).then(feeds => {
      console.log("key: "+ config.meetup.apiKey)
      console.info("Fetching events for meetup:", feeds.map(feed => feed.uniqueId).join(', '))
      const transformedEvents = _.flatMap(feeds, feed =>{


       var upsertPrommesses=  fetchEvents(feed)
       .then(group =>
          {
            return group.results//[]
              .map(result => transformMeetupEvent(result, feed))
          }
        )
        console.log("upsertPrommesses",upsertPrommesses);
        return upsertPrommesses;
      });

      return Promise.all(transformedEvents)//web requests
        .then(events =>{
          return Promise.all(
            _.flatten(events)
            .map(transformToUpsertPromise))
          console.log("events end ",events);
      })
    }).then(
      res => console.log(res)
    )
    .catch(err => console.error("error: ",err));
}


const upsertOptions = { upsert: true, setDefaultsOnInsert: true };


const transformToUpsertPromise = (event) => new Promise((resolve) => Posts.findOneAndUpdate({
  $and: [
      {"origin.provider": event.origin.provider},
      {"origin.id": event.origin.id}
  ]
}, { $set: event }, upsertOptions, (err, res) => {
  if (err) {
    reject(err);
  } else {
    resolve(res);
  }
}));



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
