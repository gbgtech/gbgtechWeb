'use strict';

var _    = require('lodash'),
	glob = require('glob');


const DATABASE_NAME = '/gbgtechweb';

module.exports = {
  db: process.env.MONGOHQ_URL
			|| process.env.MONGOLAB_URI
			|| 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR
			|| 'localhost') + '/gbgtechweb',
	sessionCookie: {
    // session expiration is set by default to 24 hours
    maxAge: 24 * (60 * 60 * 1000),
    // httpOnly flag makes sure the cookie is only accessed
    // through the HTTP protocol and not JS/browser
    httpOnly: true,
    // secure cookie should be turned to true to provide additional
    // layer of security so that the cookie is set only when working
    // in HTTPS mode.
    secure: false
  },
	googleauth: {
		clientID: process.env.GOOGLEAUTH_ID,
		clientSecret: process.env.GOOGLEAUTH_SECRET,
		callbackURL: (process.env.HOST || 'http://localhost:3000') + '/api/auth/google/callback'
	},
	googlecalendar: {
		apiKey: process.env.GOOGLECALENDAR_KEY,
		calendarId: process.env.GOOGLECALENDAR_ID
	},
	meetup: {
		apiKey: process.env.MEETUP_KEY
	},
	reddit:{
		oath2User: process.env.REDDIT_OATH2_USER,
		oath2Key: process.env.REDDIT_OATH2_KEY,
		user: process.env.REDDIT_USER,
		pass: process.env.REDDIT_PASS
	},

	mail: {
		url: process.env.MAILGUN_URL,
		key: (function() { return 'basic ' + new Buffer('api:'+ process.env.MAILGUN_KEY).toString('base64') })()
	},
  // sessionSecret should be changed for security measures and concerns
  sessionSecret: process.env.SESSION_SECRET || 'MEAN',
  // sessionKey is set to the generic sessionId key used by PHP applications
  // for obsecurity reasons
  sessionKey: 'sessionId',
  sessionCollection: 'sessions',
};
