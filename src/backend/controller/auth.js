const User = require('mongoose').model('Users'),
  crypto = require('crypto'),
  _ = require('lodash'),
  mail = require('../outlet/email'),
  oauth = require('./oauth'),
  passport = require('passport');

var requestEmail = function (req, res) {
  if (req.body && req.body.email) {
    var user;
    User.findOne({ 'email': req.body.email }, function (err, u) {
      if (err) {
        console.error("auth/email/request | Database error:", err);
        return res.status(500).send();
      }
      if (!u) {
        return res.json({ exists: false, message: 'Email not registered' });
      } else {
        user = u;
      }

      user.signinTokenExpire = Date.now() + 900000;

      crypto.randomBytes(24, (ex, buf) => {
        user.signinToken = buf.toString('hex');
        const signinUrl = req.protocol + '://' + req.hostname + ':3000/api/auth/email/signin/' + user.signinToken;
        user.save((err) => {
          if (!err) {
            mail.sendSigninMail(user.email, signinUrl);
            return res.status(200).json({ message: 'signin request created', exists: true });
          }
        });
      });

    });
  } else {
    return res.status(400).send("Missing 'email' parameter");
  }
};

var testAuthenticated = function (req, res) {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Not authenticated");
  }
  if (req.user) {
    return res.json(req.user);
  }
  return res.status(404).send();
};

var signinEmail = function (req, res, next) {
  passport.authenticate('email', function (err, user, info) {
    if (err || !user) {
      res.status(400).send(info);
    } else {
      req.login(user, function (err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.redirect('/');
        }
      });
    }
  })(req, res, next);
};

var signout = function (req, res) {
  req.logout();
  res.redirect('/');
};

var roles = {
  admin: 400,
  editor: 300,
  author: 200,
  user: 100
};

const hasRole = (role) => (req, res, next) => {
  if (!userHasRole(req.user, role)) {
    return res.status(401).send("Not authorized to perform this action");
  } else {
    next();
  }
};

const stringToRole = (role) => (typeof role === "string") ? roles[role] : role;

const userHasRole = (user, role) => {
  role = stringToRole(role);
  return user && user.role >= role;
};

module.exports = _.assignIn(
  {
    RequestEmail: requestEmail,
    SigninEmail: signinEmail,
    Signout: signout,
    Test: testAuthenticated,
    Roles: roles,
    HasRole: hasRole,
    userHasRole
  },
  oauth
);
