var User = require('mongoose').model('Users'),
    crypto = require('crypto'),
    passport = require('passport');

var requestEmail = function(req, res) {
  if(req.body && req.body.email) {
    var user;
    User.findOne({'email': req.body.email}, function(err, u) {
      if(err || !u) {

        user = new User({email: req.body.email, provider: 'email'});
      } else {
        user = u;
      }

      user.signinTokenExpire = Date.now() + 900000;

      crypto.randomBytes(24, (ex, buf) => {
        user.signinToken = buf.toString('hex');
        console.log(req.protocol + '://' + req.hostname + ':3000' + '/api/auth/email/signin/' + user.signinToken);
        user.save(function(err) {
          return res.status(200).send();
        });
      });

    });
  } else {
    return res.status(400).send("Missing 'email' parameter");
  }
}

var testAuthenticated = function(req, res) {
  if(!req.isAuthenticated()) {
    return res.status(401).send("Not authenticated");
  }
  if(req.user) {
    return res.json(req.user);
  }
  return res.status(404).send();
}

var signinEmail = function(req, res, next) {
  passport.authenticate('email', function(err, user, info) {
    if (err || !user) {
      res.status(400).send(info);
    } else {
      req.login(user, function (err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }
  })(req, res, next);
}

var signout = function(req, res) {
  req.logout();
  res.redirect('/');
}

module.exports = {
  RequestEmail: requestEmail,
  SigninEmail: signinEmail,
  Signout: signout,
  Test: testAuthenticated
};
