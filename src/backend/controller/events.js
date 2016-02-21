const config = require('../config/config');

const google = require('googleapis');
const calendar = google.calendar('v3');


const auth = config.googlecalendar.apiKey,
      calendarId = config.googlecalendar.calendarId;


const options = {
    auth,
    calendarId,
    timeMin: (new Date()).toISOString(),
    maxResults: 15
};

module.exports = {
    googleCalendar
};

function googleCalendar(req, res) {
    return calendar.events.list(options, (err, events) => {
        if (err) {
            res.status(500).send(err).end();
        } else {
            res.json(events);
        }
    });
}
