var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  slug: {
    type: String,
    index: true
  },
  origin: {
    provider: String,
    id: String,
    url: String
  },
  accepted: {
    type: String,
    default: 'WAITING' // WAITING, APPROVED or DENIED
  },
  acceptedAt:Date,
  title: {
    type: String,
    required: 'Title is required'
  },
  author: Schema.Types.ObjectId,
  body: String,
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
    organizer: String,
    rsvp: String,
    location: {
      lat: String,
      lng: String,
      name: String
    }
  },
  outlets:[
    {
      name: String,//googlecalendar,reddit or email
      blockedFromOutlet:Boolean,
      url: String,
      externalId: String
    }
  ]
});

module.exports = mongoose.model('Posts', PostSchema);
