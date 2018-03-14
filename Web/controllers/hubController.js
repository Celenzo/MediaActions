var mongoose = require('mongoose');
var Photo = require('../models/hub');

exports.display = function(req, res)
{
  res.render('hub', {title: 'Upload'});
};

exports.upload = function(req, res)
{
  console.log(req.files);
  res.render('hub', {title: 'Upload'});

};
