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
  password: {
    type: String,
    validate: [validateLocalStrategyPassword, '']
  },
  email: {
    type: String,
    required: 'Email is required',
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  salt: {
    type: String
  },
  provider: {
    type: String,
    default: 'email'
  },
  createdAt: {
		type: Date,
		default: Date.now
	},
	/* For reset password */
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	}
});

module.exports = mongoose.model('Users', UserSchema);
