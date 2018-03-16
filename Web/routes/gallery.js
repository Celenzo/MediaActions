var express = require('express');
var router = express.Router();
//var multer = require('multer')
//var upload = multer({dest: 'public/uploads/'})

var galery_controller = require('../controllers/galleryController');

/* GET home page. */
router.get('/gallery', galery_controller.index);
//router.post('/gallery', upload.any(), hub_controller.upload);


module.exports = router;
