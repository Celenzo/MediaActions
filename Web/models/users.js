var mongoose = require('mongoose');
var aes256 = require('aes256');

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
UserSchema.methods.validPassword = function ( pwd ) {
    var array = pwd.split("");
    array.reverse();
    var cipher = aes256.createCipher(array.join(''));
	return ( cipher.decrypt(this.password) === pwd);
}
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);
