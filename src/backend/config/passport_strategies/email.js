var passport = require('passport'),
  EmailStrategy = require('passport-email-strategy').Strategy,
  User = require('mongoose').model('Users');

module.exports = function () {
  passport.use(new EmailStrategy(function (token, done) {
    User.findOne({ "signinToken": token }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, "Invalid access token");
      }

      function strip(callback) {
        user.signinToken = null;
        user.signinTokenExpire = null;
        user.save(function (err) {
          if (err) {
            return done(null, false, "Database error");
          }
          return callback();
        });
      }

      // Token expired
      if (user.signinTokenExpire < Date.now()) {
        strip(function () {
          done(null, false, "Token expired");
        });
      } else {
        strip(function () {
          done(null, user);
        });
      }

      // Strip used token and return the valid user
    });
  }));
};
