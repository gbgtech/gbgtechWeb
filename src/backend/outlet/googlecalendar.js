"use strict";
const config = require('../config/config');

const Bacon = require('baconjs').Bacon;
const google = require('googleapis');
const calendar = google.calendar('v3');
const auth = config.googlecalendar.apiKey;

module.exports = {
  postEvent,
  postEventsFromStream,
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

const googleCalendarInsert = (event, jwtClient) => new Promise((resolve, reject) => {
  calendar.events.insert({
    auth: jwtClient,
    calendarId: config.googlecalendar.calendarId,
    resource: event
  }, (err, res) => {
    if (err) {
      console.log('There was an error contacting the Calendar service: ', err);
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const authorizeJWTClient = (client) => new Promise((resolve, reject) =>
client.authorize(err => {
  if (err) {
    reject(err);
  } else {
    resolve(client);
  }
}));

//googleCalendarInsert(event, client)

const baconRetry = (f, client, event) => Bacon.retry({
  source: () => Bacon.fromPromise(f(event, client)),
  retries: 10,
  delay: (ctx) => Math.pow(2, ctx.retriesDone) + Math.random() * 1000
});

function postEventsFromStream(eventStream) {
  const jwtClient = createJWTClient();


  return Bacon.fromPromise(authorizeJWTClient(jwtClient)).toProperty()
  .combine(
    eventStream.map(createGoogleCalendarEventFromPost),
    baconRetry.bind(this, googleCalendarInsert)
  )
  .flatMap(s => s)
}

const deleteEvent = (event, jwtClient) => new Promise((resolve, reject) => {
  calendar.events.delete({
    auth: jwtClient,
    calendarId: config.googlecalendar.calendarId,
    eventId: event.id
  }, (err, res) => {
    if (err) {
//      console.log('There was an error contacting the Calendar when deleting: ', err);
      reject(err);
    } else {
      resolve(res===undefined);
    }
  });
});

function resetAll() {
  const jwtClient = createJWTClient();
  calendar.events.list({
    auth: jwtClient,
    calendarId: config.googlecalendar.calendarId
  }, (err, res) => {
    if (err) {
      console.log('There was an error contacting the Calendar service: ', err);
    } else {
      var events = res.items;
    //  events=res.items.slice(0,67);
      console.log(events);
      var removeObj=function(arrayObj){
        if(arrayObj.length==0){
          return;
        }
        let event=arrayObj.pop();
        var retriesDone=0;
        //remove events
        var stream = Bacon.retry({
          source: () => Bacon.fromPromise(deleteEvent(event, jwtClient)),
          retries: 50,
          delay: (ctx) => {
            retriesDone++;
            console.log("backoff: ",retriesDone);
            return  Math.pow(2, retriesDone) + Math.random() * 1000}
        });

        stream.subscribe(res => {
          console.log(res,retriesDone);
          if(retriesDone!=0 && res){
            retriesDone--;
          }
          removeObj(arrayObj)
        });
      }
      removeObj(events);


  /*    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var stream = baconRetry(deleteEvent, jwtClient, event);
        stream.subscribe(console.log);
      }*/
    }
  });
}

function postEvent(post) {
  const jwtClient = createJWTClient();

  console.log(jwtClient);

  return Bacon.fromNodeCallback(jwtClient.authorize)
  .map(() => jwtClient)
  .flatMap(client => googleCalendarInsert(post, client))
  .toPromise();
}
