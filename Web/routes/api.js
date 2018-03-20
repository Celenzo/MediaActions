var express = require('express');
var router = express.Router();
var Hub = require('../models/hub');
var fs = require('fs');

var randomstrng = require('randomstring');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
});

function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
}

const upload = multer({storage: storage}).any();

var api = require('../controllers/ApiController');

router.post('/login', api.login);

router.post('/register', api.register);

router.post('/upload', function (req, res) {

  upload(req, res, function (err) {

      var file = req.body.myimage;
      var raw = new Buffer(file, 'base64');
      var name = new Date().toLocaleDateString('fr-FR')+ randomstrng.generate(12) + '.png';
      fs.writeFile("./public/uploads/" + name, raw, function (err) {
         if (err) console.log(err);
          var hubData = {
              originalname: name,
              mimetype: "image/png",
              destination: "public/uploads",
              filename: name,
              path: "/uploads/" + name,
              size: getFilesizeInBytes("./public/uploads/"+name),
              date: new Date(),
              visibleName: "Android Upload " + name,
              description: req.body.tags,
              price: req.body.price
          };
          Hub.create(hubData, function (error, hub) {
              if (error) {
                  return res.status(400).json({Error:error});
              }
              else{
                  return res.json("OK");
              }
          });
      });
  })
});
router.get('/gallery', api.gallery);
module.exports = router;