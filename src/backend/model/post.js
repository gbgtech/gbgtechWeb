var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  slug: String,
  title: String,
  organizer: String,
  author: Schema.Types.ObjectId,
  body: String,
  url: String,
  categories: [Schema.Types.ObjectId],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  eventData: {
    from: Date,
    to: Date,
    rsvp: String,
    location: {
      lat: String,
      lng: String,
      name: String
    }
  }
});

module.exports = mongoose.model('Posts', PostSchema);
