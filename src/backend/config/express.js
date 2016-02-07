var express    = require('express'),
    bodyParser = require('body-parser'),
    helmet     = require('helmet'),
    mongo      = require('./mongo');


mongo();



module.exports = function(app) {

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

  require('../routes')(app);

  return app;
};
