"use strict";

var mongoose = require('mongoose');
var Posts = mongoose.model('Posts');
var Users = mongoose.model('Users');
var Categories = mongoose.model('Categories');
const RSS = require('rss');
const PostsController = require('./posts')

function getFeed(req, res) {
  var filter = {accepted: 'APPROVED'};

  if (req.query.admin === '1') {
      filter = {};
  }
  return Promise.all([
      Posts.find(filter).sort({ createdAt: -1 }).exec(),
      Categories.find().exec()
  ]).then((results) => {

      var posts      = results[0];
      var categories = results[1];

      var userIds = posts.map(post => post.author);

      return Users.find({_id: {$in: userIds}}).exec().then((users) => {
          posts = posts.map((post) => PostsController.decoratePost(post, users, categories));

          let feed = new RSS({
            title: "GBGtech",
            description: "Tech community announcements in Gothenburg.",
            feed_url: `${process.env.URL}/api/rss`,
            site_url: `${process.env.URL}`,
            image_url: `${process.env.URL}/assets/gbgtech_logo_blue.png`
          });

          posts.forEach(p => feed.item(createItem(p)) );

          res.set('Content-Type', 'application/rss+xml');
          const xml = feed.xml({indent: true});
          return res.send(xml).end();
      });
  }).catch((err) => console.error(err));
}

function createItem(post) {
  const item = {
    title:        post.title,
    description:  post.body,
    url:          post.outlets.url,
    guid:         post._id,
    categories:   post.categories.map(c => c.name),
    date:         post.createdAt,
  }
  if (post.eventData) {
    item.lat = post.eventData.lat
    item.long = post.eventData.lng
  }
  return item;
}

module.exports = {
    getFeed
};
