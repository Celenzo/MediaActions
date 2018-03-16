var mongoose = require('mongoose');
var Hub = require('../models/hub');

function makeArray(d1, d2) {
    var arr = new Array(d1), i, l;
    for(i = 0, l = d2; i < l; i++) {
        arr[i] = new Array(d1);
    }
    return arr;
}

function myFunction(req, res, next)
{
  if (req.user === 'undefined' || req.user == null)
    res.redirect('/login');
  //res.render('gallery', {title: 'Upload', user: req.user});

Hub.find( { }, {} ).exec(function(err, Result){
  var data = [
    [String, String]
  ]
  console.log(data[0][0]);
/*
      originalname,
      mimetype: String,
      destination: String,
      filename: String,
      path: String,
      size: String,
      date: String
    ]
  }
  */


    for (var i = 0; i < Result.length; i++)
    {
      data.originalname = Result[i]["originalname"];
      data.mimetype = Result[i]["mimetype"];
      data.destination = Result[i]["destination"];
      data.filename = Result[i]["filename"];
      data.path = Result[i]["path"];
      data.size = Result[i]["size"];
      data.date = Result[i]["date"];
    }
    res.render('gallery', { title: 'Media actions',
    originalname: data.originalname,
    mimetype: data.mimetype,
    destination: data.destination,
    filename: data.filename,
    path: data.path,
    size: data.size,
    date: data.date,
    user:req.user
    });
  })
}

exports.index = function(req, res, next)
{
    if (req.user === 'undefined' || req.user == null)
      res.redirect('/login');
  myFunction(req, res, next);
}
