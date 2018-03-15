var mongoose = require('mongoose');
var HubSchema = new mongoose.Schema({
  originalname: {
    type: String,
    unique: false,
    required: false,
    trim: true
  },
  mimetype: {
    type: String,
    unique: false,
    required: false,
    trim: true
  },
  destination: {
    type: String,
    unique: false,
    required: false,
    trim: true
  },
  filename: {
    type: String,
    unique: false,
    required: false,
    trim: true
  },
  path: {
    type: String,
    unique: false,
    required: false,
    trim: true
  },
  size: {
    type: String,
    unique: false,
    required: false,
    trim: true
  },
  date: {
    type : Date,
    default : Date.now,
    unique: false,
    required: false,
    trim: false
  }
});



var Hub = mongoose.model('Hub', HubSchema);
module.exports = Hub;
