var commands = require('./commands');
const Bacon = require('baconjs').Bacon;
var mongoose = require('mongoose');
var config = require('../config/config');


Bacon.fromNodeCallback(mongoose, 'connect', config.db).onValue(() => {
  // Load Mongoose models
  var meetup = require('../providers/meetup');
  meetup.fetchMeetupEvents().then(events => {
    mongoose.connection.close();
  })
})
