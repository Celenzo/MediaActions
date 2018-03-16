var mongoose = require('mongoose');
var Hub = require('../models/hub');

exports.display = function(req, res, next)
{
    if (req.user === 'undefined' || req.user == null)
        res.redirect('/login');
  res.render('hub', {title: 'Upload', user:req.user});
};

exports.upload = function(req, res, next)
{

    if (req.user === 'undefined' || req.user == null)
        res.redirect('/login');

  var hubData = {
    originalname: req.files[0].originalname,
    mimetype: req.files[0].mimetype,
    destination: req.files[0].destination,
    filename: req.files[0].filename,
    path: req.files[0].path,
    size: req.files[0].size,
    date: new Date()
  }
  Hub.create(hubData, function (error, hub) {
    if (error) {
      console.log("Msg : ");
      console.log(error);
    }
    else{
      console.log('Commentaire ajouté avec succès !');
      console.log(hub);
    }
  });

res.render('index', {title: 'Upload', user:req.user});

}
