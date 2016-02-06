var config = require('./config/config.js');
var mongoose = require('mongoose');

var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error('Could not connect to MongoDB!');
		console.error(err);
	}
});

var app = require('./config/express.js')(db);

app.get('/api', function (req, res) {
  res.send('Hello World!');
});

app.post('/api/apabepa', function(req, res) {
	res.status(501).send();
});
