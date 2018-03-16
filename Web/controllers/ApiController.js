var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/users");
var aes256 = require('aes256');
var apiController = {};

apiController.login = function (req, res) {
    passport.authenticate('local')(req, res, function (error, user) {

        res.json({user: req.user});
    });
};

apiController.register = function (req, res) {
    if (req.body.password !== req.body.passwordConf) {
        res.code = 401;
        return res.json([{error : 'Password don\'t match!]'}]);
    }

    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {
        var pwd = req.body.password;
        var array = pwd.split("");
        array.reverse();
        var cipher = aes256.createCipher(array.join(('')));
        var nuser = new User({email: req.body.email,
            username: req.body.username,
            provider: 'local-android',
            password: cipher.encrypt(req.body.password)});
        User.register(nuser, req.body.password, function (error, user) {
           if (error)
           {
               res.code = 401;
               return res.json([{error: error}]);
           }
        });
        res.code = 200;
        return res.json([{message: 'Register OK'}, {user: nuser}]);
    }
    else {
        res.code = 401;
        return res.json([{error: 'One of fields is empty'}])
    }
};

module.exports = apiController;