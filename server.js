require('dotenv').config();
var express = require('express');
var webpack = require('webpack');



//var webpackConfig = require('./webpack.config');

var port = process.env.PORT || 3001;

var app = express();


require('./src/backend/config/express.js')(app);
/*
if (true) { // Assumes that this runs as dev. Fix and add production routine
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
*/
app.listen({port: port, bind: '0.0.0.0'}, () => {
  console.log("Backend is on port "+ port);
});

//app.use(express.static('./public'));
app.get('*', (req, res, next) => {

/*if (req.url.startsWith('/build/')) {
    return next();
  }*/
  res.sendFile('index.html', {root: './public'});
});
