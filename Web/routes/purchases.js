var express = require('express');
var router = express.Router();

var purchases_controller = require('../controllers/purchasesController');

router.get('/purchases', purchases_controller.show);

module.exports = router;
