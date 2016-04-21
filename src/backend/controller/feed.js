var mongoose = require('mongoose');

var Feeds = mongoose.model('Feeds');

module.exports = {
  index, create, show, update
};

//list my FeedCollectors
function index(req, res) {
  Feeds.find({ "userId": req.user }).then(data =>
    res.json(data).end()
  );
}

//list my FeedCollectors
function show(req, res) {
  Feeds.findOne({ "_id": req.params.id }).then(data =>
    res.json(data).end()
  );
}

function update(req, res) {
  const _id = req.params.id;
  console.log("update");
  console.log(_id);

  Feeds.findOneAndUpdate({ _id }, {
    name: req.body.name,
    vendor: req.body.vendor,
    categories: req.body.categories,
    uniqueId: req.body.uniqueId,
    acceptedDefault: req.body.acceptedDefault
  }, { new: true }, (err, updatedPost) => {
    res.json(updatedPost).end();
  });
}

function create(req, res) {
  Feeds.create({
    name: req.body.name,
    vendor: req.body.vendor,
    categories: req.body.categories,
    uniqueId: req.body.uniqueId,
    userId: req.user,
    acceptedDefault: req.body.acceptedDefault
  }, (err, post) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(post);
    }

    res.end();
  });
}
