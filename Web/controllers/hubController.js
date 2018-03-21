var mongoose = require('mongoose');
var Hub = require('../models/hub');
var Jimp = require("jimp");
var looksSame = require('looks-same');
var multer = require('multer');
var fs = require("fs");

var upload = multer({dest: 'public/uploads/'})

exports.display = function(req, res, next)
{
    if (req.user === 'undefined' || req.user == null)
        res.redirect('/login');
    
    // open a file called "lenna.png" 

///home/demay/Documents/MediaAction/MediaActions/Web/public/uploads/pangovic.png', '/home/demay/Documents/MediaAction/MediaActions/Web/public/uploads/pangovic.png'
     
    //equal will be true, if images looks the same
    //upload.any();
  res.render('hub', {title: 'Upload', user:req.user});
};

function checkphoto(str)
{
 var query = Hub.find({}).select('path');

    query.exec(function (err, someValue) {
        if (err) return next(err);
        
        if (someValue.length >= 1)
            {
                var i = 0;
                while (i < someValue.length - 1)
                    {
                        console.log(i);
                        console.log("public" + str + "\n" + "public\n" + someValue[i]['path']);
                        //looksSame("public" + str, "public" + someValue[i]['path'], function(error, equal) 
                        looksSame("./public/uploads/" + str, "/home/demay/Documents/MediaAction/MediaActions/Web/public/uploads/60109b344cb801d8d426a4c86123fcd9.png", function(error, equal) 
                            {
                                console.log("IS EQUAL ? " + equal + "\npublic" + str + "public" + someValue[i]['path'], error);
                            });
                        i++;
                    }
            }
    });
    console.log("gros caca")
    upload.any();
}



function checkType(data)
{
    var n = data.mimetype.localeCompare("image/jpeg");
    if (n == 0)
        {
            data.filename += ".png";
            //
            Jimp.read("./public" + data.path, function (err, lenna) {
                if (err) throw err;
                lenna.write("./public/uploads/" + data.filename); // save
            });
        }
    //data.path += ".png";
    return (n);
}

exports.upload = function(req, res, next)
{
    
  if (req.user === 'undefined' || req.user == null)
      res.redirect('/login');    
     
    console.log("log = " + req.body.name);

  var hubData = {
      originalname: req.files[0].originalname,
      mimetype: req.files[0].mimetype,
      destination: req.files[0].destination,
      filename: req.files[0].filename,
      path: "/uploads/" + req.files[0].filename,
      size: req.files[0].size,
      date: new Date(),
      visibleName: req.body.name,
      description: req.body.description,
      price: req.body.price
  }
    if (checkType(hubData) == 0)
        {
            hubData.path += ".png";
        }

    //checkphoto(hubData.filename);
    upload.any();

  Hub.create(hubData, function (error, hub) {
    if (error) {

    }
    else{
      console.log(hub);
    }
  });

res.render('hub', {title: 'Upload', user:req.user});

}
