var mongoose = require('mongoose');
var HubSchema = new mongoose.Schema({
    nom: {
	type: String,
	unique: true,
	required: true,
	trim: true
    },
    date: {
	type: Date,
	unique: true,
	required: true,
	trim: true
    }
});
var Hub = mongoose.model('Hub', HubSchema);
module.exports = Hub;
