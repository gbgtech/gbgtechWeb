var commands = require('./commands');
const Bacon = require('baconjs').Bacon;
var mongoose = require('mongoose');
var config = require('../config/config');

Bacon.fromNodeCallback(mongoose, 'connect', config.db).onValue(() => {
  // Load Mongoose models

  var facebook = require('../providers/facebook');
  facebook.fetchEvents();
  /*.then(events => {
    mongoose.connection.close();
  });*/


  /* add this onese more
  var meetup = require('../providers/meetup');
  meetup.fetchEvents().then(events => {
  mongoose.connection.close();
})*/
})
