var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	username: String,
	password: String,
	age: Number,
	firstName: String,
	surName: String,
	hivStatus: String,
	phoneNumber: Number,
	email: String
}),
user = mongoose.model('user', userSchema);

module.exports = user;