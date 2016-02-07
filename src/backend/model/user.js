var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var validateLocalStrategyProperty = function(prop) {
  return (this.provider !== 'local'  || (prop.length))
}

var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

var UserSchema = new Schema({
  subscribedCategories: [Schema.Types.ObjectId],
  email: {
    type: String,
    required: 'Email is required',
    unique: 'Email is already in use',
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  createdAt: {
		type: Date,
		default: Date.now
	},
  signinToken: {
    type: String
  },
  signinTokenExpire: {
    type: Date
  }
});

module.exports = mongoose.model('Users', UserSchema);
