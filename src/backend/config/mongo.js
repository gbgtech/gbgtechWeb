var mongoose = require('mongoose'),
    config   = require('./config'),
    fs       = require('fs');

var modelDir = './src/backend/model';
fs.readdirSync(modelDir).forEach(function(modelPath) {
  console.log(modelDir + '/' + modelPath);
  require('../model/' + modelPath);
});


module.exports = function() {
    return new Promise(function(resolve, reject) {
        var mongo = mongoose.connect(config.db, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(mongo);
            }
        });
    });
};
