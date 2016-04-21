const fetch = require('node-fetch');

function checkStatus(response) {
  console.log(response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

module.exports = (url, args) =>
  fetch(url, args)
    .then(checkStatus);
