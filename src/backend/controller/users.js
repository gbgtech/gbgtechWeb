var mongoose = require('mongoose');
var util = require('util');

var Users = mongoose.model('Users');


module.exports = {
    create: create,
    me: me,
    updateCategories:updateCategories
};

function me(req, res) {
  var u = req.user;
  u.providers = undefined;

  return res.send(u);
}
function updateCategories(req, res) {
    req.user.subscribedCategories=req.body.categories;
    console.log("req.categories: "+req.body.categories);
    req.user.save();
    res.status(201).json(req.user);
    res.end();
}

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
