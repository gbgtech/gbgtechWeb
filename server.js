var express = require('express');
var mongoose = require('mongoose');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');

var webpackConfig = require('./webpack.config');

var port = process.env.PORT || 3000;

var app = express();

app.use(webpackMiddleware(webpack(webpackConfig), {
    publicPath: '/build',
    lazy: true
}));

app.use(express.static('./public'));


// var db = mongoose.connect(config.db, function(err) {
// 	if (err) {
// 		console.error('Could not connect to MongoDB!');
// 		console.error(err);
// 	}
// });


require('./src/backend/app')(app);

var server = app.listen(port, function () {
  console.log('Server listening on port ' + server.address().port + '!');
});

