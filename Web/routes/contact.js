var express = require('express');
var router = express.Router();

var contact_controller = require('../controllers/contactController');

router.get('/contact', contact_controller.show);
router.post('/contact', contact_controller.send);

module.exports = router;
