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
    unique: false,
    required: false,
    trim: false
  },
  visibleName: {
      type: String,
      unique: false,
      required: false,
      trim: true
  },
  description: {
      type: String,
      unique: false,
      required: false,
      trim: true
  },
  price: {
      type: Number,
      unique: false,
      required: false,
      trim: true
  }
});

var Hub = mongoose.model('Hub', HubSchema);
module.exports = Hub;
