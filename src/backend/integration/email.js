const FormData = require('form-data');
const fetch = require('node-fetch');
const config = require('../config/config.js');

const url = config.mail.url;
const key = config.mail.key;

function send(options) {
  var form = new FormData();

  if(options.to && options.subject && options.body) {

    var to = options.to.join(', ');

    var auth ='basic ' + new Buffer('api:'+key).toString('base64');

    form.append('from', options.from || "tech@gbgtech.co");
    form.append('to', to);
    form.append('subject', options.subject);
    if(options.isHTML) {
      form.append('html', options.body);
    } else {
      form.append('text', options.body);
    }

    fetch(url, {method: 'POST', body: form, headers: {Authorization: auth}}).then(
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

module.exports = {
  send: send
};
