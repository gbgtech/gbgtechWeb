if(process.env.NODE_ENV!="production"){
  require('dotenv').config();
}
var mongoose = require('mongoose');
var config = require('../config/config');
var fs = require('fs');
const _ = require('lodash');

var modelDir = './src/backend/model';

fs.readdirSync(modelDir).forEach((modelPath) => {
  console.log(modelDir + '/' + modelPath);
  require('../model/' + modelPath);
});
