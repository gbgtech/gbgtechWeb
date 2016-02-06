var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var webpackConfig = require('./webpack.config');

var port = process.env.PORT || 3000;

var app = express();

require('./src/backend/config/express.js')(app);

if(true) { // Assumes that this runs as dev. Fix and add production routine
  var compiler = webpack(webpackConfig);

  app.use(webpackMiddleware(compiler, {
      publicPath: '/build',
      stats: {
          colors: true,
          chunks: false
      }
  }));

  app.use(webpackHotMiddleware(compiler));
}

app.listen(port, function() {
  console.log("Backend is on port "+ port);
});

app.use(express.static('./public'));
