const slugify = require('speakingurl');

const mongoose = require('mongoose');
const Bacon = require('baconjs').Bacon;

const Posts = mongoose.model('Posts');
const Feeds = mongoose.model('Feeds');

const config = require('../config/config');

const fetch = require('node-fetch');
const _ = require('lodash');
const Headers = fetch.Headers;
var {FB, FacebookApiException} = require('fb');

module.exports = {
  fetchEvents
};

function createFacebookClient() {
  return new Promise((resolve, reject) => {
    FB.api('oauth/access_token', {
      client_id: '1545702515739469',
      client_secret: '7e551e333ab4c9f16cf9fc76b42c2904',
      grant_type: 'client_credentials'
    }, (res) => {
      if (!res || res.error) {
        reject(res)
      } else {
        resolve(res)
      }
    })
  })
}

function createAndAuthorizeFacebookClient() {
  return createFacebookClient().then(res => {
    FB.setAccessToken(res.access_token);
    return FB
  })
}

function fetchEventsFromFacebookId(fbClient, pageId) {
  return new Promise((resolve, reject) => {
    fbClient.api(pageId + '/events', (res) => {
      if (!res || res.error) {
        reject(res)
      } else {
        resolve(res)
      }
    })
  })
}

const upsertOptions = { upsert: true, setDefaultsOnInsert: true };

const transformToUpsert = (event, nodeCallback) => Posts.findOneAndUpdate({
  $and: [
    {"origin.provider": event.origin.provider},
    {"origin.id": event.origin.id}
  ]
}, { $set: event }, upsertOptions, nodeCallback);

function fetchEvents() {
  return Bacon.fromPromise(createAndAuthorizeFacebookClient())
    .flatMap(fbClient => Bacon
      .fromPromise(Feeds.find({ vendor: 'facebook' }))
      .flatMap(Bacon.fromArray)
      .flatMap(feed => Bacon
        .fromPromise(fetchEventsFromFacebookId(fbClient, feed.uniqueId))
        .flatMap(res => Bacon.fromArray(res.data))
        .flatMap(fbEvent => Bacon.fromPromise(transformFacebookEvent(fbEvent, feed)))
        .log('transformFacebookEvent')
        .flatMap(event => Bacon.fromNodeCallback(transformToUpsert, event))
        .log('transformToUpsert')
      )
    )
    .toPromise()
}

function transformFacebookEvent(event,feed) {
  var url = "https://www.facebook.com/events/" + event.id;

  var newPost={
    origin: {
      provider: 'facebook',
      id: event.id,
      url: url
    },
    author: feed.userId,
    title: event.name,
    slug: slugify([
      event.id,
      event.name
    ].join(' ')),
    body: event.description.replace(/\n/g, '<br>'),
    eventData: {
      from: event.start_time,
      to: (event.end_time || (event.start_time + 3600000)),
      organizer: feed.name,
      rsvp: url,
      location: {
        lat: event.place && event.place.location && event.place.location.latitude,
        lng: event.place && event.place.location && event.place.location.longitude,
        name: event.place && event.place.name
      }
    }

  };

  return new Promise((resolve, reject) => {
    Posts.findOne({
      $and: [
        {"origin.provider": newPost.origin.provider},
        {"origin.id": newPost.origin.id}
      ]
    },function(err,res) {
      console.log("foundOne", res);
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
  })
}
