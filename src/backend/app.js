var express = require('express');
var config = require('./config.js');
var mongoose = require('mongoose');

var app = express();

var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error('Could not connect to MongoDB!');
		console.error(err);
	}
});

app.get('/api', function (req, res) {
  res.send('Hello World!');
});

app.use(express.static('build'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
