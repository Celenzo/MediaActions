var express = require('express');
var router = express.Router();

var login_controller = require('../controllers/loginController');

/* GET home page. */
router.get('/login', login_controller.login);

router.get('/register', login_controller.register);

router.post('/registration', login_controller.registration);

module.exports = router;
