var mongoose = require('mongoose');

var Categories = mongoose.model('Categories');

module.exports = {
  index, test
};

function index(req, res) {
  return Categories.find().exec().then(data =>
    res.json(data).end()
  );

}

function test(req, res) {
  res.send('Hello World!');
}
