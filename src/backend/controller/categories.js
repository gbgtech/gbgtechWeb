var mongoose = require('mongoose');

var Categories = mongoose.model('Categories');

module.exports = {
    index,test
};



function test(req, res) {
  res.send('Hello World! as a');
}



function index(req, res) {
    return Categories.find().exec().then(data =>
        res.json(data).end()
    );
}
