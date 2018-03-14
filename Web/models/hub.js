var mongoose = require('mongoose');
var HubSchema = new mongoose.Schema({
  originalname : String,
  mimetype : String,
  destination : String,
  filename : String,
  path : String,
  size : String,
  date : { type : Date, default : Date.now }
});



var Hub = mongoose.model('Hub', HubSchema);
module.exports = Hub;
