var commands = require('./commands');
const Bacon = require('baconjs').Bacon;
var mongoose = require('mongoose');
var config = require('../config/config');
var Posts = mongoose.model('Posts');
var _ = require('lodash');

Bacon.fromNodeCallback(mongoose, 'connect', config.db).onValue(() => {
  // Load Mongoose models
  var calender = require('../outlet/googlecalendar');


  Posts.find().then(posts =>{
    console.log("before",posts.length);
    posts=posts.filter(p => !_(p.outlets).some({name: 'googlecalendar'}))
    console.log("after",posts.length);
    posts.map((post,index) =>{
      setTimeout(()=>{
        calender.postEvents(post).then(event=>{
          var outletInfo={name:"googlecalendar",id:event.id,url:event.url};
          post.outlets.push(outletInfo)
          post.save();
        }).catch(err=>console.log("error: ",err));
      },1000*index);
    });

  })
})

/*  Posts.find({outlets:{

$nin:
[{
name: "googlecalendar"
}]
}}).then(posts =>{

posts.map(post =>{
calender.postEvents(post).then(event=>{

var outletInfo={name:"googlecalendar",id:event.id,url:event.url};
post.outlets.push(outletInfo)
post.save();
}).catch(err=>console.log("error: ",err));

});

});*/
