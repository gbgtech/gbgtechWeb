var mongoose = require('mongoose');
var util = require('util');

var Users = mongoose.model('Users');


module.exports = {
    create: util.deprecate(create, 'DEPRECATED: usersController.createUser - Users will only be created by authentication methods')
};



function create(req, res) {
    var userData = req.body;
    Users.create({
        email: userData.email,
        subscribedCategories: userData.categories
    }, function(err, user) {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(user);
        }

        res.end();
    });
}
