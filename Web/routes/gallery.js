var express = require('express');
var router = express.Router();
var multer = require('multer')
var upload = multer({dest: 'public/uploads/'})
var hub_controller = require('../controllers/hubController');

/* GET home page. */
router.get('/gallery', upload.any(), hub_controller.display);
router.post('/gallery', upload.any(), hub_controller.upload);


module.exports = router;
