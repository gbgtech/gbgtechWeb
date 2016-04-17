require('dotenv').config();
var mongoose = require('mongoose');
var config = require('../config/config');
var fs = require('fs');
const _ = require('lodash');

var modelDir = './src/backend/model';

fs.readdirSync(modelDir).forEach((modelPath) => {
  console.log(modelDir + '/' + modelPath);
  require('../model/' + modelPath);
});

const Feeds = mongoose.model('Feeds');


mongoose.connect(config.db, function(err) {
    // Load Mongoose models
    var meetup = require('../providers/meetup');
    meetup.fetchMeetupEvents();
});

/*console.log(_.flatMap([ [1,2,3] , [1,2] , [] ]));
*/
