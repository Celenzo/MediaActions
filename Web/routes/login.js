var express = require('express');
var router = express.Router();
var passport = require('passport');

var auth = require('../controllers/AuthController');

/* GET home page. */
router.get('/login', auth.login);

router.get('/register', auth.register);

router.post('/register', auth.doRegister);

router.get('/login', auth.login);

router.post('/login', auth.doLogin);

router.get('/logout', auth.logout);

router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/auth/google/callback',  passport.authenticate('google', {successRedirect : '/' ,failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });

module.exports = router;
