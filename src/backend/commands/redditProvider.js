"use strict";

var commands = require('./commands');
const Bacon = require('baconjs').Bacon;
const mongoose = require('mongoose');
var Posts = mongoose.model('Posts');
var config = require('../config/config');

const _ = require('lodash');


let currentFilter = p => !_(p.outlets).some({name: 'reddit'});

Bacon.fromNodeCallback(mongoose, 'connect', config.db).onValue(() => {

  var reddit = require('../outlet/reddit');

  const postStream = Posts.find({ eventData: { $ne: null },accepted:"APPROVED" }).then(res=>{
    //console.log(res);
    reddit.postEvents(res.filter(currentFilter)).then(()=>{
      console.log("close mongose");
      mongoose.connection.close();
      process.exit()
    })
  });
});
