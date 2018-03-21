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

function checkType(data)
{
    var n = data.mimetype.localeCompare("image/jpeg");
    console.log("Value of n : " + n + "Value of mimetype" + data.mimetype);
    if (n == 0)
        {
            data.filename += ".png";
            Jimp.read("./public" + data.path, function (err, lenna) {
                if (err) throw err;
                lenna.resize(256, 256)            // resize
                     .quality(60)                 // set JPEG quality
                     .greyscale()                 // set greyscale
                     .write("./public/uploads/" + data.filename); // save
            });
        }
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
            /*
                    fs.unlink("./public/" hubData.path, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        }); 
        */
 
            hubData.path += ".png";
            
        }
    
    console.log("name : " + hubData.filename + "path = " + hubData.path);
    
    /*
    looksSame("." + hubData.path, './public/uploads/pangovic.png', function(error, equal) 
                {
        console.log(error);
        console.log(equal);
      });
*/
  // Verifie
  
  upload.any();
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

res.render('hub', {title: 'Upload', user:req.user});

}
