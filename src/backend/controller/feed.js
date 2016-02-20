var mongoose = require('mongoose');

var Feeds = mongoose.model('Feeds');

module.exports = {
    index,create
};

//list my FeedCollectors
function index(req, res) {
  Feeds.find({"userId":req.user}).then(data =>
      res.json(data).end()
  );
}

function create(req, res) {
  console.log(req.user);
  Feeds.create({
      name: req.body.name,
      vendor: req.body.vendor,
      uniqueId: req.body.uniqueId,
      userId: req.user,
      acceptedDefault:req.body.acceptedDefault
  }, (err, post) => {
      if (err) {
          res.status(400).json(err);
      } else {
          res.status(201).json(post);
      }

      res.end()
  });
}
