var commands = require('./commands');
const Bacon = require('baconjs').Bacon;
var mongoose = require('mongoose');
var config = require('../config/config');
var Posts = mongoose.model('Posts');
const _ = require('lodash');

const outletInfoFromEvent = (event) => ({ 
  name: "googlecalendar", 
  id: event.id,
  url: event.url
})

const onlyNonGoogleCalendarOutlets = p => !_(p.outlets).some({name: 'googlecalendar'})

const updatePostWithGoogleCalendarOutlet = (event, post) => {
  post.outlets.push(outletInfoFromEvent(event));
  return Bacon.fromNodeCallback(post.save);
}

Bacon.fromNodeCallback(mongoose, 'connect', config.db).onValue(() => {
  // Load Mongoose models
  var calendar = require('../outlet/googlecalendar');

  const postStream = Bacon.fromPromise(Posts.find({ eventData: { $ne: null } }))
    .flatMap(Bacon.fromArray)
    .filter(onlyNonGoogleCalendarOutlets)
    .doAction(post => console.log('postStream', post._id));

  calendar.postEventsFromStream(postStream)
    .doError(err => console.error('Failed to post calendar event', err))
    .combine(postStream, updatePostWithGoogleCalendarOutlet)
    .flatMap(s => s)
    .log()
    .doError(err => console.log("Something went terribly wrong", err))
    .onEnd(() => {
      console.log('Finished');
      mongoose.connection.close();
    });

});
