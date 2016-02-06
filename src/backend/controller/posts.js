var mongoose = require('mongoose');

var Posts = mongoose.model('Posts');
var Categories = mongoose.model('Categories');
var Users = mongoose.model('Users');

module.exports = {
    index: index,
    show: show
};



function index(req, res) {

    Promise.all([
        Posts.find().exec(),
        Categories.find().exec()
    ]).then(function(results) {

        var posts      = results[0];
        var categories = results[1];

        var userIds = posts.map(function(post) { return post.author });

        return Users.find({_id: {$in: userIds}}).exec().then(function(users) {
            posts = posts.map(function(post) {
               return decoratePost(post, users, categories);
            });
            res.json(posts).end();
        });

    }).catch(function(err) {
        handleError(err, res);
    });
}

function show(req, res) {
    Promise.all([
        Posts.findOne({_id: req.params.id}).exec(),
        Categories.find().exec()
    ]).then(function(results) {

        var post       = results[0];
        var categories = results[1];

        var userId = post.author;

        return Users.findOne({_id: userId}).exec().then(function(user) {
            res.json(
                decoratePost(post, [user], categories)
            ).end();
        });


    }).catch(function(err) {
        handleError(err, res);
    });
}

function handleError(err, res) {
    console.error(err);
    return res.status(500).end();
}


function decoratePost(post, users, categories) {
    var authorObject = users.find(function(user) {
        return post.author.equals(user._id);
    });

    var categoryObjects = post.categories.map(function(categoryId) {
        return categories.find(function(category) {
            return categoryId.equals(category._id);
        });
    });

    return Object.assign({}, post._doc, {
        author: authorObject,
        categories: categoryObjects
    });
}