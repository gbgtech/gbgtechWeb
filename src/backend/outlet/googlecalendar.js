"use strict";
const config = require('../config/config');

const Bacon = require('baconjs').Bacon;
const google = require('googleapis');
const calendar = google.calendar('v3');
const auth = config.googlecalendar.apiKey;
const _ = require('lodash');
const mongoose = require('mongoose');
const Posts = mongoose.model('Posts');


module.exports = {
  postEvents,
  resetAll
};

const createJWTClient = () => new google.auth.JWT(
  config.googlecalendar.calendarEmail,
  null,
  config.googlecalendar.apiKey.replace(/\\n/g, "\n"),
  ['https://www.googleapis.com/auth/calendar'],
  null
);

const createGoogleCalendarEventFromPost = (post) => ({
  summary: post.title,
  location: post.eventData.location.name,
  description: config.url + "/news/" + post.slug,
  start: {
    dateTime: post.eventData.from,
    timeZone: 'Europe/Stockholm'
  },
  end: {
    dateTime: post.eventData.to,
    timeZone: 'Europe/Stockholm'
  }
});
const outletInfoFromEvent = (event) => ({
  name: "googlecalendar",
  externalId: event.id,
  url: event.htmlLink
})

const googleCalendarInsert = (jwtClient,post) => {
  let pro=new Promise((resolve, reject) => {
    calendar.events.insert({
      auth: jwtClient,
      calendarId: config.googlecalendar.calendarId,
      resource: createGoogleCalendarEventFromPost(post)
    }, (err, res) => {
      if (err) {
        if(err.code!=403){
          console.log('There was an error contacting the Calendar service: ', err);
        }
        reject(err);
      } else {
        if(!_(post.outlets).some({name: 'googlecalendar'})){
          let outlet=outletInfoFromEvent(res);
          var update=Posts.update({ _id: post._id },
            {$addToSet: {outlets: outlet}}
          ).then(()=>resolve(res))
          .catch(()=>reject())
        }else{
          resolve(res)
        }


      }
    });
  });
  return pro;
}

function postEvents(events) {
  return new Promise((resolve, reject)=>{
    const jwtClient = createJWTClient();
    limitGoogleRequests(events,googleCalendarInsert.bind(this,jwtClient),resolve);
  });
}

const deleteEvent = (jwtClient,event ) => new Promise((resolve, reject) => {
  calendar.events.delete({
    auth: jwtClient,
    calendarId: config.googlecalendar.calendarId,
    eventId: event.id
  }, (err, res) => {
    if (err) {
      console.log('There was an error contacting the Calendar when deleting: ', err);
      reject(err);
    } else {
      resolve(res===undefined);
    }
  });
});

function resetAll() {
  console.log("resetAll");
  return new Promise((resolve, reject)=>{
    const jwtClient = createJWTClient();
    var listAll=listAllEvents(jwtClient);
    listAll.then(totEvents =>{
      limitGoogleRequests(totEvents,deleteEvent.bind(this,jwtClient),resolve);
    })
    /*  calendar.events.list({
    auth: jwtClient,
    calendarId: config.googlecalendar.calendarId
  }, (err, res) => {
  if (err) {
  reject();
} else {
var events = res.items;
limitGoogleRequests(events,deleteEvent.bind(this,jwtClient),resolve);
}
});*/
});
}
const listAllEvents = (jwtClient,nextPage) => {
  console.log("listAllEvents: ");
  return new Promise((resolve, reject) => {


    calendar.events.list({
      auth: jwtClient,
      calendarId: config.googlecalendar.calendarId,
      pageToken: nextPage
    }, (err, res) => {
      if(err){
        console.log("error",err);
      }else{
        console.log("res.nextPageToken",res.nextPageToken);
        if(res.nextPageToken){
          console.log("create promess")
          listAllEvents(jwtClient,res.nextPageToken)
          .then((events) => {
            console.log("promess resolve");
            let list=events.concat(res.items);
            resolve(list)
          });

        }else{
          console.log("next page dont set")
          resolve(res.items);

        }
      }
    });
  });
}


function limitGoogleRequests(arrayObj,f,callback){
  if(arrayObj.length==0){
    callback();
    return;
  }
  if(arrayObj.length%10==0){
    console.log(arrayObj.length);
  }


  var event=arrayObj.pop();
  var retriesDone=0;
  //remove events
  let stream = Bacon.retry({
    source: () => Bacon.fromPromise(f(event)),
    retries: 50,
    delay: (ctx) => {
      retriesDone++;
      return  Math.pow(2, retriesDone) + Math.random() * 1000}
    });
    stream.onEnd(() => {
      if(retriesDone!=0){
        retriesDone--;
      }
      limitGoogleRequests(arrayObj,f,callback);
    });
  }
