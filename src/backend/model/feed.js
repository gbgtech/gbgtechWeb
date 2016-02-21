var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeedSchema = new Schema({
  name: {
    type: String
  },
  vendor: {
    type: String // meetup
  },
  uniqueId: {
    type: String,
    unique:true
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
  acceptedDefault: {
    type: String,
    default: 'WAITING' // WAITING, APPROVED or DENIED
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feeds', FeedSchema);
