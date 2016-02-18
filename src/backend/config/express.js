var express    = require('express'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    config = require('./config');


var modelDir = './src/backend/model';

fs.readdirSync(modelDir).forEach((modelPath) => {
  console.log(modelDir + '/' + modelPath);
  require('../model/' + modelPath);
});

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

  var db = mongoose.connect(config.db, (err) => {
    if(err) {

    } else {
      require('./session')(app, db);
      require('./passport')(app, db);
      return app;
    }
  });
};
