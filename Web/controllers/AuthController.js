var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/users");

var userController = {};

userController.home = function (req, res) {
    res.render('index', {user: req.user});
}

userController.register = function (req, res) {
    res.render('register', {user:req.user});
}

userController.doRegister = function (req, res, next) {
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.render('register', {title: 'Register', error: true,
            errorText: "The password don't match !"});
        res.send("passwords don't match");
        return next(err);
    }

    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {
        var nuser = new User({email: req.body.email,
            username: req.body.username,
            provider: 'local'});
        User.register(nuser, req.body.password, function (error, user) {
            if (error) {
                console.log(error);
                return res.render('register', {user:user});
            }
            passport.authenticate('local')(req, res, function (error, user) {
                req.session.user = user;
                res.redirect('/');
            });
        });
    }
};

userController.login = function(req, res) {
    res.render('login', {user: req.user});
};

userController.doLogin = function(req, res, next) {
    passport.authenticate('local')(req, res, function (error, user) {
        req.session.user = user;
        res.redirect('/')
    });
};

userController.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

module.exports = userController;