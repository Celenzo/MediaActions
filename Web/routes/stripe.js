var express = require('express');
var router = express.Router();

var stripe_controller = require('../controllers/stripeController');

router.get('/', stripe_controller.stripe);
router.post('/charge', stripe_controller.charge);
router.get('/charge', stripe_controller.test);

module.exports = router;
