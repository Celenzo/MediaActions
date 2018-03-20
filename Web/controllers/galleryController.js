var mongoose = require('mongoose');
var Hub = require('../models/hub');

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = require("stripe")(keySecret);

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

        var images = [];
        var nb = 0;

        console.log(Result);

        for (var i = 0; i < Result.length; i++) {
            data.originalname = Result[i]["originalname"];
            data.mimetype = Result[i]["mimetype"];
            data.destination = Result[i]["destination"];
            data.filename = Result[i]["filename"];
            data.path = "<img alt='Poster' id='poster' style=\"height: 100%; width: 100%; min-height: 300px; max-height: 300px;visibility: visible\" class='img-thumbnail' src='" + Result[i]["path"] + "'>";
            data.size = Result[i]["size"];
            data.date = Result[i]["date"];
            data.visibleName = Result[i]["visibleName"];
            data.description = Result[i]["description"];
            data.price = "Price: " + Result[i]["price"] + " €";

            if (data.description == null)
                data.description = "DESCRIPTION";

            nb++;
            images.push(
                data.path,
                data.visibleName,
                data.description,
                data.price,
            );
        }

        res.render('gallery', { title: 'Media actions',
        data: images,
        nbImages: nb * 4
        });
      })
}


    exports.index = function(req, res, next)
    {
        if (req.user === 'undefined' || req.user == null)
          res.redirect('/login');

        myFunction(req, res, next);
    }

exports.imageDetails = function(req, res, next)
{
    console.log(req.body.imageName);
    var result = findPrice(function (Result) {
        console.log("Price = " + Result);
        res.render('imageDetails', {publishableKey:keyPublishable, imageName: req.body.imageName, price: Result});
        return Result;
    }, req.body.imageName)
}

function findPrice(callback, name)
{
    Hub.find({visibleName: name}, {price: 1} ).exec(function(err, Result) {
        console.log("Result = " + Result[0]["price"]);
        callback(Result[0]["price"]);
    })
}