var authController = require('../controller/auth.js');
var passport = require('passport');

module.exports = function (app) {
  app.post('/api/auth/email/request', authController.RequestEmail);
  app.get('/api/auth/email/signin/:token', authController.SigninEmail);

  app.get('/api/auth/signout', authController.Signout);
  app.get('/api/auth/test', authController.Test);

  app.get('/api/auth/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));
  app.get('/api/auth/google/callback', authController.oauthCallback('google'));
};
