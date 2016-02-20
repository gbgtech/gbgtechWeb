'use strict';

const FormData = require('form-data');
const fetch    = require('node-fetch');
const ejs      = require('ejs');
const _        = require('lodash');
const config   = require('../config/config.js');

const BASE_URL = 'http://localhost:3000';
const MAILGUN_URL = config.mail.url;
const API_KEY     = config.mail.key;
const AUTH_HEADER ='basic ' + new Buffer('api:' + API_KEY).toString('base64');

const convertToFormData = (obj) => {
  return Object.keys(obj).reduce((formData, key) => {
    formData.append(key, obj[key]);
    return formData;
  }, new FormData());
}

function send(options) {

  if(options.to && options.subject && options.body) {

    let to = options.to;

    if (Array.isArray(options.to)) {
      to = to.join(', ');
    }

    const formParams = {
      from: options.from || 'tech@gbgtech.co',
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
    .then(res => res.json())
    .then(json => console.log(json));

  } else {
    console.error("Email service missing required fields");
  }
}

function renderTemplate(filename, params) {
  return ejs.render('<%- include(\'../template/base.ejs\', params) %>',
    {template: filename,
      params: _.assign({}, params, {
        base_url: BASE_URL
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
  sendSigninMail
};