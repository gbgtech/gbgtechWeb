'use strict';

const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const FormData = require('form-data');
const fetch    = require('../lib/fetch');
const ejs      = require('ejs');
const _        = require('lodash');
const config   = require('../config/config.js');

const MAILGUN_URL = config.mail.url;
const AUTH_HEADER = config.mail.key;

const convertToFormData = (obj) => {
  return Object.keys(obj).reduce((formData, key) => {
    formData.append(key, obj[key]);
    return formData;
  }, new FormData());
}

function sendToSubscribers(posts) {
  let promises = []
  posts.map(p => {
    const mailPromise = new Promise((resolve, reject) => {
      Users.aggregate([
        { "$project": {
          "email": 1,
          "subscribedCategories": 1,
          "intersection": {"$setIntersection": ["$subscribedCategories", p.categories]}
        }},
        { "$match": {
          "intersection": {"$not": {"$size": 0}}
        }}
      ]).exec((error,subscribers) => {
        if (!error) {
          subscribers.forEach(s => {
            promises.push(createMailPromise(resolve, s, p))
          })
        } else {
          reject();
          console.log("error:", error);
        }
      });
    });
    promises.push(mailPromise);
  })

  return Promise.all(promises)
}

function createMailPromise(resolve, subscriber, post) {
  send({
    to: subscriber.email,
    subject: post.title,
    body: post.body,
    isHTML: true
  })
  const outlet = { "name": "email" }
  post.outlets.push(outlet);
  post.save(resolve);
}

function send(options) {
  if(options.to && options.subject && options.body) {
    let to = options.to;

    if (Array.isArray(options.to)) {
      to = to.join(', ');
    }

    const formParams = {
      from: options.from || '#GBGtech <hello@gbgtech.se>',
      to,
      subject: options.subject
    };

    if (options.isHTML) {
      formParams.html = options.body;
    } else {
      formParams.text = options.body;
    }

    const form = convertToFormData(formParams);

    return fetch(MAILGUN_URL, {
      method: 'POST',
      body: form,
      headers: {
        Authorization: AUTH_HEADER
      }
    })
    .then(json => { console.log(json) })
    .catch(err => { console.log(err) });

  } else {
    console.error("Email service missing required fields");
  }
}

function renderTemplate(filename, params) {
  return ejs.render('<%- include(\'../template/base.ejs\', params) %>',
  {template: filename,
    params: _.assign({}, params, {
      base_url: process.env.URL
    })
  },
  {filename: __filename }
);
}

function sendSigninMail(to, url) {
  const body = renderTemplate('../template/signin.ejs', {
    url
  });

  return send({
    to,
    body,
    isHTML: true,
    subject: '[#GBGtech] Your sign in link'
  });
}


module.exports = {
  send,
  sendToSubscribers,
  sendSigninMail
};
