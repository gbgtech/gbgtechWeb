"use strict";

const commands = require('./commands');
const Bacon = require('baconjs').Bacon;
const mongoose = require('mongoose');
const Posts = mongoose.model('Posts');
const config = require('../config/config');

const _ = require('lodash');


let currentFilter = p => !_(p.outlets).some({name: 'email'});

Bacon.fromNodeCallback(mongoose, 'connect', config.db).onValue(() => {

  var email = require('../outlet/email');

  const postStream = Posts.find({ eventData: { $ne: null },accepted:"APPROVED" }).then(res=>{
    email.sendToSubscribers(res.filter(currentFilter)).then(()=>{
      console.log("close mongose");
      mongoose.connection.close()
    })
  });
});
