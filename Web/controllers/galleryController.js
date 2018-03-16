var mongoose = require('mongoose');
var Hub = require('../models/hub');

function myFunction(req, res, next, data)
{
  if (req.user === 'undefined' || req.user == null)
    res.redirect('/login');
  //res.render('gallery', {title: 'Upload', user: req.user});

Hub.find( { }, {} ).exec(function(err, Result){

    for (var i = 0; i < Result.length; i++)
    {
      data.originalname = Result[i]["originalname"];
      data.mimetype = Result[i]["mimetype"];
      data.destination = Result[i]["destination"];
      data.filename = Result[i]["filename"];
      data.path = Result[i]["path"];
      data.size = Result[i]["size"];
      data.date = Result[i]["date"];
      // Traitement
    }
    res.render('gallery', { title: 'Media actions',
    originalname: data.originalname,
    mimetype: data.mimetype,
    destination: data.destination,
    filename: data.filename,
    path: data.path,
    size: data.size,
    date: data.date,

  });

  })
}


exports.index = function(req, res, next)
{
    if (req.user === 'undefined' || req.user == null)
      res.redirect('/login');

  //res.render('index', {title: 'Upload', user:req.user});

  var usersProjection = {
    originalname: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: String,
    date: String
  }
  myFunction(req, res, next, usersProjection);
}
