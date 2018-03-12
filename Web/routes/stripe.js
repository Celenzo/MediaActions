var express = require('express');
var router = express.Router();

var stripe_controller = require('../controllers/stripeController');

/* GET home page. */
router.get('/stripe', stripe_controller.stripe);

module.exports = router;
