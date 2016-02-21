const FormData = require('form-data');
const fetch = require('node-fetch');
const config = require('../config/config.js');

const url = config.mail.url;
const key = config.mail.key;

function send(options) {
  var form = new FormData();

  if(options.to && options.subject && options.body) {
    // Handle recipients
    ['to', 'cc', 'bcc'].map(f => {
      if(options[f]) {
        var r;
        if(typeof options[f].join === 'function') {
          r = options[f].join(', ');
        } else {
          r = options[f];
        }
        form.append(f, r);
      }
    });

    form.append('from', options.from || "tech@gbgtech.co");
    form.append('subject', options.subject);
    if(options.isHTML) {
      form.append('html', options.body);
    } else {
      form.append('text', options.body);
    }

    fetch(url, {method: 'POST', body: form, headers: {Authorization: key}}).then(
      function(res) {
        return res.json();
      }
    ).then(function(json) {
      console.log(json);
    })
  } else {
    console.error("Email service missing required fields");
  }
}

function authSigninMail(user, path) {
  var m = {};
  m.from = "auth@gbgtech.co";
  m.subject = "Sign in to #gbgtech by verifying your email"
  m.isHTML = true;
  m.to = user.email;
  var p = path + user.signinToken;
  m.body = `<p>Please use <a href="${p}">This Link</a> to sign in to #gbgtech`;
  send(m);
}

module.exports = {
  send: send,
  sendAuth: authSigninMail
};
