var express = require('express');
var router = express.Router();

var api = require('../controllers/ApiController');

router.post('/login', api.login);

module.exports = router;