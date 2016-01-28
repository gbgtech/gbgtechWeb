var express = require('express'),
    bodyParser = require('body-parser'),
    helmet = require('helmet');

module.exports = function(db) {
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

  app.use(express.static('build'));

  var port = process.env.PORT || 3000;
  app.listen(port, function() {
    console.log("Backend running on port "+ port);
  });

  return app;
};
