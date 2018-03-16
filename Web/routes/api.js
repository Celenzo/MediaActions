var express = require('express');
var router = express.Router();

var api = require('../controllers/ApiController');

router.post('/login', api.login);

router.post('/register', api.register);

module.exports = router;