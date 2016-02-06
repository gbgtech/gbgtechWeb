var mongoose = require('mongoose');

var Categories = mongoose.model('Categories');

module.exports = {
    index: index
};



function index(req, res) {
    Categories.find().exec(function(err, data) {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(data).end();
        }
    });
}
