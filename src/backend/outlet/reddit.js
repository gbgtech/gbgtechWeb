var rawjs = require("raw.js");
const config = require('../config/config');
const _ = require('lodash');
const mongoose = require('mongoose');
var Posts = mongoose.model('Posts');

module.exports = {
  postEvents,postAEvent
};

var reddit = new rawjs("gbgtech");

function postEvents(events) {
  return new Promise((resolve, reject)=> {


    reddit.setupOAuth2(config.reddit.oath2User, config.reddit.oath2Key);
    console.log("events",events);

    reddit.auth({"username": config.reddit.user, "password": config.reddit.pass}, function(err, response) {
      if(err) {
        console.log("Unable to authenticate user: " + err);
        reject();
      } else {
        let prommessList=[];
        _(events).forEach((event) => {
          prommessList.push(postAEvent(event));
        });
        Promise.all(prommessList).then(()=>{
          resolve();
        });
      }
    });
  });
}

function postAEvent(event) {
  return new Promise(function(resolve, reject) {

    console.log("event",event)
    var post={r:"gbgtech",url:config.url+"/news/"+event.slug,title:event.title};

    reddit.submit(post,function(err,id) {
      if(err===null){
        let outlet =  {
          "name": "reddit",//googlecalendar or reddit
          "url": "https://www.reddit.com/r/gbgtech/comments/"+id+"/",
          "externalId": id
        }
        console.log("try to add it to the set");
        event.outlets.push(outlet);
        event.save(resolve);

      }else{
        console.log("error:",err);
        reject();
      }
    });
  });
}
