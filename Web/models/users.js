var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var UserSchema = new mongoose.Schema({
    email: {
	type: String,
	unique: true,
	required: false,
	trim: true
    },
    username: {
	type: String,
	unique: true,
	required: false,
	trim: true
    },
    password: {
	type: String,
	required: false,
    },
    provider : String,
	google: Object
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);
