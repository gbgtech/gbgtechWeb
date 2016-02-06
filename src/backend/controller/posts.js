var mongoose = require('mongoose');

var Posts = mongoose.model('Posts');
var Categories = mongoose.model('Categories');
var Users = mongoose.model('Users');

module.exports = {
    index: index
};



function index(req, res) {

    Promise.all([
        Categories.find().exec(),
        Posts.find().exec()
    ]).then(function(results) {

        var categories = results[0];
        var posts      = results[1];

        var userIds = posts.map(function(post) { return post.author });

        return Users.find({_id: {$in: userIds}}).exec().then(function(users) {

            posts = posts.map(function(post) {

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
            });

            res.json(posts).end();
        });

    }).catch(function(err) {
        console.error(err);
        return res.status(500).end();
    });
}
