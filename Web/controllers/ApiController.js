var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/users");
var aes256 = require('aes256');
var apiController = {};

apiController.login = function (req, res) {
    passport.authenticate('local')(req, res, function (error, user) {

        res.json([{user: req.user}]);
    });
}

module.exports = apiController;