var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    webpack = require('webpack'),
    webpackMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpConfig = require('../../../webpack.config.js'),
    helmet = require('helmet');

module.exports = function(db) {

  var port = process.env.PORT || 3000;
  var isDev = process.env.NODE_ENV !== 'production';
  var app = express();

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  // app.use(methodOverride());

  // Use helmet to secure Express headers
  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  app.use(helmet.ienoopen());
  app.disable('x-powered-by');

  app.get('/api/apa/', function(req, res) {
    return res.send("Bepa!");
  })

  if(isDev) {
    var compiler = webpack(webpConfig);
    var middleware = webpackMiddleware(compiler, {
      publicPath: webpConfig.output.publicPath,
      contentBase: 'src',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.get('*', function response(req, res) {
      res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'build/index.html')));
      res.end();
    });
  }

  app.listen(port, function() {
    console.log("Backend is on port "+ port);
    console.log("isDev ", isDev);
  });

  return app;
};
