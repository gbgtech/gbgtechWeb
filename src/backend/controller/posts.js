var mongoose = require('mongoose');

var Posts = mongoose.model('Posts');
var Categories = mongoose.model('Categories');
var Users = mongoose.model('Users');

module.exports = {
    index,
    show
};



function index(req, res) {

    return Promise.all([
        Posts.find().exec(),
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

function show(req, res) {
    Promise.all([
        Posts.findOne({_id: req.params.id}).exec(),
        Categories.find().exec()
    ]).then((results) => {

        var post       = results[0];
        var categories = results[1];

        var userId = post.author;

        return Users.findOne({_id: userId}).exec().then(user => res.json(
            decoratePost(post, [user], categories)
        ).end());


    }).catch((err) => handleError(err, res));
}

function handleError(err, res) {
    console.error(err);
    return res.status(500).end();
}


const decoratePost = (post, users, categories) => {
    const authorObject = users.find(user => post.author.equals(user._id));

    const categoryObjects = post.categories.map((categoryId) =>
        categories.find(category => categoryId.equals(category._id))
    );

    return Object.assign({}, post._doc, {
        author: authorObject,
        categories: categoryObjects
    });
}