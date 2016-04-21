var passport = require('passport'),
  User = require('mongoose').model('Users'),
  path = require('path'),
  fs = require('fs'),
  config = require('./config');

/**
 * Module init function
 */
module.exports = function (app, db) {
  // Serialize sessions
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // Deserialize sessions
  passport.deserializeUser(function (id, done) {
    User.findOne({
      _id: id
    }, function (err, user) {
      done(err, user);
    });
  });

  // Initialize strategies
  var strategyDir = './src/backend/config/passport_strategies';
  fs.readdirSync(strategyDir).forEach(function (strategyPath) {
    console.log(strategyDir + '/' + strategyPath);
    require('./passport_strategies/' + strategyPath)(config);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  // Add passport's middleware
};
