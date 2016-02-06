var mongoose = require('mongoose');

var Users = mongoose.model('Users');

module.exports = {
    createUser: createUser
};



function createUser(req, res) {
    var userData = req.body;
    Users.create({
        email: userData.email,
        subscribedCategories: userData.categories
    }, function(err, user) {
        console.log(err, user);
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(user);
        }

        res.end();
    });
}
