const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const passport = require('passport');

exports.oauthCallback = function (strategy) {
  return function (req, res, next) {
    passport.authenticate(strategy, function (err, user, redirectURL) {
      if (err || !user) {
        console.log(err, user);
        return res.redirect('/');
      }
      req.login(user, function (err) {
        if (err) {
          return res.redirect('/');
        }
        return res.redirect(redirectURL || '/');
      });
    })(req, res, next);
  };
};

function setProvider(user, provider, done, data) {

  if (!user.providers) {
    user.providers = {};
  }
  user.providers[provider] = data;
  user.save(err => {
    return done(err, user);
  });
}

exports.saveOAuthUserProfile = function (req, profile, done) {
  // Find user with provider and ID

  var provider = profile.provider;
  var IDField = 'providers.' + provider + '.' + profile.providerIdentifierField;
  var data = profile.providerData;

  var query = {};
  query[IDField] = data[profile.providerIdentifierField];

  Users.findOne(query, (err, user) => {
    if (err) {
      return done(err);
    } else {
      if (!user) {
        Users.findOne({ 'email': profile.email }, (err, user) => {
          if (err) {
            return done(err);
          } else {
            if (!user) {
              user = new Users({
                email: profile.email,
                providers: {}
              });
              console.log("Created new user");
              setProvider(user, provider, done, data);

            } else { // Found user with email but no provider
              console.log("Applied provider " + provider + " to existing user");
              setProvider(user, provider, done, data);
            }
          }
        });
      } else { // Found user with provider
        console.log("User found with provider " + provider);
        console.log(user);
        done(err, user);
      }
    }
  });
};
