var mongoose = require('mongoose');

var Categories = mongoose.model('Categories');

module.exports = {
    index
};



function index(req, res) {
    return Categories.find().exec().then(data =>
        res.json(data).end()
    );
}
