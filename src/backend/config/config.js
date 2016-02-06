'use strict';

var _    = require('lodash'),
	glob = require('glob');


const DATABASE_NAME = '/gbgtechweb';

module.exports = {
  db: process.env.MONGOHQ_URL
        || process.env.MONGOLAB_URI
        || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + DATABASE_NAME
};
