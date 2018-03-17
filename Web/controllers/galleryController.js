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
  //if (req.user === 'undefined' || req.user == null)
    //res.redirect('/login');
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

    var images = [];
    var nb = 0;

    for (var i = 0; i < Result.length; i++) {
        data.originalname = Result[i]["originalname"];
        data.mimetype = Result[i]["mimetype"];
        data.destination = Result[i]["destination"];
        data.filename = Result[i]["filename"];
        data.path = "<img alt=\\'Poster\\'' id=\\'poster\\' src='" + Result[i]["path"] + "'>";
        data.size = Result[i]["size"];
        data.date = Result[i]["date"];
        data.visibleName = "<h3>" + (Result[i]["visibleName"]) + "<\/h3>";
        data.description = Result[i]["description"];
        data.price = "Price: " + Result[i]["price"] + " €";
        data.separator = "-----"

        if (data.description == null)
            data.description = "DESCRIPTION";

        nb++;
        images.push(
            data.path,
            data.visibleName,
            data.description,
            data.price,
            data.separator
        );
    }

    //console.log(images);
    console.log("size = " + images.si);
    res.render('gallery', { title: 'Media actions',
    originalname: data.originalname,
    mimetype: data.mimetype,
    destination: data.destination,
    filename: data.filename,
    path: data.path,
    size: data.size,
    date: data.date,
    visibleName: data.visibleName,
    description: data.description,
    price: data.price,
    user:req.user,
    data: images,
    nbImages: nb * 10
    });
  })
}

exports.index = function(req, res, next)
{
    //if (req.user === 'undefined' || req.user == null)
      //res.redirect('/login');
  myFunction(req, res, next);
}
