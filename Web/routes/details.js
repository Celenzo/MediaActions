var express = require('express');
var router = express.Router();

var details_controller = require('../controllers/detailsController');

/* GET home page. */
router.get('/details', details_controller.index);


module.exports = router;
