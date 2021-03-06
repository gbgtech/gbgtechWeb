
const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const passport = require('passport');

exports.oauthCallback = function(strategy) {
  return function(req, res, next) {
    passport.authenticate(strategy, function(err, user, redirectURL) {
      if (err || !user) {
        console.log(err, user);
        return res.redirect('/');
      }
      req.login(user, function(err) {
        if (err) {
          return res.redirect('/');
        }
        return res.redirect(redirectURL || '/');
      });
    })(req, res, next);
  };
};

exports.saveOAuthUserProfile = function(req, profile, done) {
  // Find user with provider and ID

  var provider = profile.provider;
  var IDField = 'providers.'+ provider + '.' + profile.providerIdentifierField;
  var data = profile.providerData;

  var query = {};
  query[IDField] = data[profile.providerIdentifierField];

  Users.findOne(query, (err, user) => {
    if(err) {
      return done(err);
    } else {
      if(!user) {
        Users.findOne({'email': profile.email}, (err, user) => {
          if(err) {
            return done(err);
          } else {
            function setProvider(uuser) {

              if(!uuser.providers) {
                uuser.providers = {};
              }
              uuser.providers[provider] = data;
              uuser.save(err => {
                return done(err, user);
              });
            }
            if(!user) {
              var user = new Users({
                email: profile.email,
                providers: {}
              });
              console.log("Created new user");
              setProvider(user);

            } else { // Found user with email but no provider
              console.log("Applied provider "+provider+" to existing user");
              setProvider(user);
            }
          }
        });
      } else { // Found user with provider
        done(err, user);
      }
    }
  });
}
