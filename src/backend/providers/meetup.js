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
  fetchEvents
};


const fetchEvents = (feed) =>//promess()
fetch(`https://api.meetup.com/2/events?key=${config.meetup.apiKey}&group_urlname=${feed.uniqueId}`)
.then(res => res.json());

function fetchEvents() {
  return Bacon
  .fromPromise(Feeds.find({ vendor: 'meetup' }))
  .flatMap(feeds => {
    console.info("Fetching events for meetup:", feeds.map(feed => feed.uniqueId).join(', '))

    return Bacon.fromArray(feeds)
    .flatMap(feed => Bacon
      .fromPromise(fetchEvents(feed))
      .flatMap(group => Bacon.fromArray(group.results))
      .flatMap(result => Bacon.fromPromise(transformMeetupEvent(result, feed)))
      .flatMap(event => Bacon.fromNodeCallback(transformToUpsert, event))
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
  console.log("transformMeetupEvent");
  var newPost={
    origin: {
      updatedAt: event.updated,
      provider: 'meetup',
      id: event.id,
      url: event.event_url
    },
    author: feed.userId,
    title: event.name,
    slug: slugify([
      event.id,
      event.group.name,
      event.name
    ].join(' ')),
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

  };
  return new Promise(function(resolve, reject) {//This one check if it updates och create new events
    Posts.findOne({
      $and: [
        {"origin.provider": newPost.origin.provider},
        {"origin.id": newPost.origin.id}
      ]
    },function(err,res) {
      console.log("foundOne");
      console.log(res);
      if(!res){
        newPost.categories=feed.categories;
        newPost.accepted= feed.acceptedDefault;
        newPost.acceptedAt=(feed.acceptedDefault=="APPROVED"?Date.now():null);

        newPost.outlet=  feed.defaultBlockedOutlets.map((blockedOutlet) => ({
          name:blockedOutlet,
          blockedFromOutlet:true
        }))
      }
      resolve(newPost);
    })
  }).catch(function (err) {
    console.error(err);
  });

}
