var express = require('express');
var router = express.Router();
var Hub = require('../models/hub');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thuiban@gmail.com',
        pass: 'Lecose29120'
    }
});

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
});

const upload = multer({storage: storage}).any();

var api = require('../controllers/ApiController');

router.post('/login', api.login);

router.post('/register', api.register);

router.post('/upload', function (req, res) {
  upload(req, res, function (err) {
      if (err) {
            return res.status(400).json({Error: err});
      }
      return res.json(req.files[0]);
  })
});

router.post('/imgData', function (req,res) {
    var dataImg = JSON.parse(req.body.file);
    var name = req.body.name;
    var desc = req.body.description;
    var price = req.body.price;

    var hubData = {
        originalname: dataImg.originalname,
        mimetype: dataImg.mimetype,
        destination: dataImg.destination,
        filename: dataImg.filename,
        path: "/uploads/" + dataImg.filename,
        size: dataImg.size,
        date: new Date(),
        visibleName: name,
        description: desc,
        price: price
    }
    Hub.create(hubData, function (error, hub) {
        if (error) {
            return res.status(400).json({Error:error});
        }
        else{
            return res.json("OK");
        }
    });
});

router.get('/gallery', api.gallery);
module.exports = router;