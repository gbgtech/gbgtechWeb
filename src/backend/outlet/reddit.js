var rawjs = require("raw.js");
const config = require('../config/config');

module.exports = {
  postEvents
};

function postEvents(aPost) {
  var reddit = new rawjs("raw.js example script");

  reddit.setupOAuth2(config.reddit.oath2User, config.reddit.oath2Key);
  console.log(aPost);

  reddit.auth({ "username": config.reddit.user, "password": config.reddit.pass }, function (err) {
    console.log(aPost);
    if (err) {
      console.log("Unable to authenticate user: " + err);
    } else {
      var post = { r: "gbgtech", url: config.url + "/news/" + aPost.slug, title: aPost.title };

      reddit.submit(post, function (err, id) {
        console.log(err);
        console.log(id);
      });
    }
  });
}
