"use strict";

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



const updatePostWithGoogleCalendarOutlet = (event, post) => {
  post.outlets.push(outletInfoFromEvent(event));
  return Bacon.fromNodeCallback(post.save);
}

Bacon.fromNodeCallback(mongoose, 'connect', config.db).onValue(() => {
  // Load Mongoose models
  var calendar = require('../outlet/googlecalendar');


  if(process.argv[2]=="--resset"){
    //console.log("resseting");
    calendar.resetAll().then(() => {
      const postStream = Posts.find({ eventData: { $ne: null } }).then(res=>{
      //  console.log("add postEvent");

        calendar.postEvents(res).then(()=>{
          console.log("close mongose");mongoose.connection.close()
        })
      });
    });
  }else{
    let currentFilter = p => !_(p.outlets).some({name: 'googlecalendar'});

    const postStream = Posts.find({ eventData: { $ne: null },accepted:"APPROVED" }).then(res=>{
      console.log(res);
      calendar.postEvents(res.filter(currentFilter)).then(()=>{console.log("close mongose");mongoose.connection.close()})
    });
  }
});
