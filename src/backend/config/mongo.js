var mongoose = require('mongoose'),
      config = require('./config'),
          fs = require('fs');

const modelDir = './src/backend/model';
fs.readdirSync(modelDir).forEach((modelPath) => {
  console.log(modelDir + '/' + modelPath);
  require('../model/' + modelPath);
});


module.exports = function() {
    return new Promise((resolve, reject) => {
        const mongo = mongoose.connect(config.db, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(mongo);
            }
        });
    });
};
