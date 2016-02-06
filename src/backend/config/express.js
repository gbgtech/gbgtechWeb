var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('./config');
    helmet = require('helmet');

module.exports = function(app) {

  var db = mongoose.connect(config.db, function(err) {
  	if (err) {
  		console.error('Could not connect to MongoDB!');
  		console.error(err);
  	}
  });

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
