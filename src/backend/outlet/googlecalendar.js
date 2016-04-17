const config = require('../config/config');

const google = require('googleapis');
const calendar = google.calendar('v3');


const auth = config.googlecalendar.apiKey;



module.exports = {
    postEvents
};


function postEvents(aPost) {
  var newparsedKey=config.googlecalendar.apiKey.replace(/\\n/g,"\n")

  var jwtClient = new google.auth.JWT(config.googlecalendar.calendarEmail, null, newparsedKey, ['https://www.googleapis.com/auth/calendar'], null);

  return new Promise((resolve,reject) => {

    jwtClient.authorize(function(err, tokens) {
      if (err) {
        console.log("error in googlecalendar",err);
        reject();
        return;
      }

      var event = {
        'summary': aPost.title,
        'location': aPost.eventData.location.name,
        'description': config.url+"/news/"+aPost.slug,
        'start': {
          'dateTime': aPost.eventData.from,
          'timeZone': 'Europe/Stockholm',
        },
        'end': {
          'dateTime': aPost.eventData.to,
          'timeZone': 'Europe/Stockholm',
        }
      };

      calendar.events.insert({
        auth: jwtClient,
        calendarId: config.googlecalendar.calendarId,
        resource: event,
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err, aPost._id);
          reject();
          return;
        } else {
          console.log("Succesfully posted to calendar service" + aPost._id);
          resolve(event);
        }
      });

    });
  })
}
