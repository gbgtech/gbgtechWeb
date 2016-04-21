const config = require('../config/config');

const Bacon = require('baconjs').Bacon;
const google = require('googleapis');
const calendar = google.calendar('v3');
const auth = config.googlecalendar.apiKey;

module.exports = {
  postEvent,
  postEventsFromStream
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

const baconRetry = (client, event) => Bacon.retry({
  source: () => Bacon.fromPromise(googleCalendarInsert(event, client)),
  retries: 10,
  delay: (ctx) => Math.pow(2, ctx.retriesDone) + Math.random() * 1000
});

function postEventsFromStream(eventStream) {
  const jwtClient = createJWTClient();

  return Bacon.fromPromise(authorizeJWTClient(jwtClient)).toProperty()
    .combine(
      eventStream.map(createGoogleCalendarEventFromPost),
      baconRetry
    )
    .flatMap(s => s);
}

function postEvent(post) {
  const jwtClient = createJWTClient();

  console.log(jwtClient);

  return Bacon.fromNodeCallback(jwtClient.authorize)
    .map(() => jwtClient)
    .flatMap(client => googleCalendarInsert(post, client))
    .toPromise();
}