require('dotenv').config();
var mongoose = require('mongoose');
var config = require('../config/config');
var fs = require('fs');
const _ = require('lodash');
const Bacon = require('baconjs').Bacon;

var modelDir = './src/backend/model';

fs.readdirSync(modelDir).forEach((modelPath) => {
  console.log(modelDir + '/' + modelPath);
  require('../model/' + modelPath);
});

const Feeds = mongoose.model('Feeds');

Bacon.fromNodeCallback(mongoose, 'connect', config.db).onValue(() => {
  // Load Mongoose models
  var meetup = require('../providers/meetup');
  meetup.fetchMeetupEvents().then(events => {
    process.exit();
  })
})
