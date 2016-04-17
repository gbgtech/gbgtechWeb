var commands = require('./commands');
const Bacon = require('baconjs').Bacon;
var mongoose = require('mongoose');
var config = require('../config/config');
var Posts = mongoose.model('Posts');
var _ = require('lodash');
var promiseRetry = require('promise-retry');

function backoffExp(promiseFunc, successCallback) {
  return promiseRetry((retry, number) => {
    return promiseFunc().catch(retry);
  });
}

const outletInfoFromEvent = (event) => ({ 
            name: "googlecalendar", 
            id: event.id,
            url: event.url
          })

const onlyNonGoogleCalendarOutlets = p => !_(p.outlets).some({name: 'googlecalendar'})

const updatePostWithGoogleCalendarOutlet = (post, event) => {
  post.outlets.push(outletInfoFromEvent(event));
  return Bacon.fromNodeCallback(post.save);
}

Bacon.fromNodeCallback(mongoose, 'connect', config.db).onValue(() => {
  // Load Mongoose models
  var calendar = require('../outlet/googlecalendar');

  baconStream = Bacon.fromPromise(Posts.find({ eventData: { $ne: null } }))
    .flatMap(Bacon.fromArray)
    .filter(onlyNonGoogleCalendarOutlets)
    .flatMap((post) => { 
      const bs = Bacon
      .fromPromise(backoffExp(() => calendar.postEvents(post)))
      .flatMap(event => updatePostWithGoogleCalendarOutlet(post, event));
      bs.onError(err => console.error('Failed to post calendar event', err))
      return bs 
    });

  baconStream.onError((err) => console.log("Something went terribly wrong", err));
  baconStream.onEnd(() => { console.log('Finished'); mongoose.connection.close();});

})
