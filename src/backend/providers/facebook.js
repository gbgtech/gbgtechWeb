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

function fetchEvents() {
  console.log("fetchEvents");
  FB.api('oauth/access_token', {//request access_token for the App
    client_id: '1545702515739469',
    client_secret: '7e551e333ab4c9f16cf9fc76b42c2904',
    grant_type: 'client_credentials'
  }, function (res) {
    if(!res || res.error) {
      console.log(!res ? 'error occurred' : res.error);
      return;
    }

    FB.setAccessToken(res.access_token);

    Feeds.find({ vendor: 'facebook' }).then((lisOfFBPages)=>{
      lisOfFBPages.forEach((feed)=>{
        console.log(feed);
        fetchFromAPage(feed);
      })

    })


  });

}

function fetchFromAPage(feed) {
  FB.api(feed.uniqueId+'/events', function (res) {
    if(!res || res.error) {
      console.log(!res ? 'error occurred' : res.error);
      return;
    }
    res.data.forEach((event)=> {
      addToDataBase(event,feed);
    })

  });
}

function addToDataBase(event,feed) {
  console.log("transformFBEvent");
  var newPost={
    origin: {
      provider: 'facebook',
      id: event.id,
      url: "https://www.facebook.com/events/"+event.id
    },
  //  author: feed.userId,
    title: event.name,
    slug: slugify([
      event.id,
      event.name
    ].join(' ')),
    body: event.description,
    eventData: {
      from: event.start_time,
      to: (event.end_time && end_time || (event.start_time + 3600000)),
    //  organizer: event.group.name,
  //    rsvp: event.event_url,
      location: {
        lat: event.place.location.latitude,
        lng: event.place.location.longitude,
        name: event.place.name
      }
    }

  };

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


}
