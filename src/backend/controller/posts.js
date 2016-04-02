"use strict";

var mongoose = require('mongoose');
var slugify = require('speakingurl');

var Posts = mongoose.model('Posts');
var Categories = mongoose.model('Categories');
var Users = mongoose.model('Users');
var Reddit = require('../outlet/reddit');
var googlecalendar = require('../outlet/googlecalendar');

module.exports = {
    index,
    create,
    show,
    update,
    postToOutlets,
    listEvents,
    updateAccepted
};



function index(req, res) {

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
            posts = posts.map((post) => decoratePost(post, users, categories));
            return res.json(posts).end();
        });

    }).catch((err) => handleError(err, res));
}

function buildPost(post, userId) {
    let event = null;

    if (post.showEventInfo) {
        event = {
            to: post.to,
            from: post.from,
            organizer: post.organizer,
            rsvp: post.rsvpLink,
            location: {
                lat: null,
                lng: null,
                name: null
            }
        };
    }

    return {
        title: post.title,
        slug: slugify(post.title),
        author: userId,
        body: post.body,
        categories: post.categories,
        eventData: event
    };
}

function create(req, res) {
    const post = buildPost(req.body, req.user._id);

    Posts.create(post, (err, post) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(post);
        }

        res.end()
    });
}
function listEvents(req, res) {
  var filter = {eventData: {$ne:null}};

  return Promise.all([
      Posts.find(filter).sort({ "eventData.from": -1 }).exec(),
      Categories.find().exec()
  ]).then((results) => {

      var posts      = results[0];
      var categories = results[1];

      var userIds = posts.map(post => post.author);

      return Users.find({_id: {$in: userIds}}).exec().then((users) => {
          posts = posts.map((post) => decoratePost(post, users, categories));
          return res.json(posts).end();
      });

  }).catch((err) => handleError(err, res));
}




function update(req, res) {
    const slug = req.params.id;
    const post = buildPost(req.body);

    Posts.findOneAndUpdate({slug}, {
        $set: post
    }, {new: true}, (err, updatedPost) => {
        res.json(updatedPost).end()
    })
}

function show(req, res) {
    Promise.all([
        Posts.findOne({slug: req.params.id, accepted: 'APPROVED'}).exec(),
        Categories.find().exec()
    ]).then((results) => {

        var post       = results[0];
        var categories = results[1];

        var userId = post.author;

        return Users.findOne({_id: userId}).exec().then(user => res.json(
            decoratePost(post, [user], categories)
        ).end());


    }).catch((err) => res.status(404).end());
}

function handleError(err, res) {
    console.error(err);
    return res.status(500).end();
}

function postToOutlets(){
  Posts.findOne().exec().then((post)=> {
      googlecalendar.postEvents(post);
  });
}

function updateAccepted(req, res){
  const slug = req.params.id;
  const post = req.body;

  Posts.findOneAndUpdate({slug}, {
    $set: {accepted: post.accepted}
  },{new: true},
  (err, updatedPost) => {
    res.json(updatedPost).end()
  });
}

const decoratePost = (post, users, categories) => {
    const authorObject = users.find(user => user._id.equals(post.author));

    const categoryObjects = (post.categories || []).map((categoryId) =>
        categories.find(category => categoryId.equals(category._id))
    );

    return Object.assign({}, post._doc, {
        author: authorObject,
        categories: categoryObjects
    });
}
