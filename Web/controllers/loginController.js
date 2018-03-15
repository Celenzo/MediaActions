var mongoose = require('mongoose');
var User = require('../models/users');

exports.login = function(req, res, next) {
    res.render('login', { title: 'Connexion'});
};

exports.register = function(req, res, next) {

    res.render('register', {title: 'Inscription', error: true,
			    styleLink: "/stylesheets/register.css",
			    error: false});
};

exports.registration = function(req, res, next) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
	var err = new Error('Passwords do not match.');
	err.status = 400;
	res.render('register', {title: 'Inscription', error: true,
				styleLink: "/stylesheets/register.css",
				errorText: "Les mots de passe ne correspondent pas"});
	res.send("passwords dont match");
	return next(err);
    }

    if (req.body.email &&
	req.body.username &&
	req.body.password &&
	req.body.passwordConf) {

	var userData = {
	    email: req.body.email,
	    username: req.body.username,
	    password: req.body.password,
	    passwordConf: req.body.passwordConf,
	}

	User.create(userData, function (error, user) {
	    if (error) {
		return next(error);
	    } else {
		res.render('login', {title: 'Connexion'});
		//req.session.userId = user._id;
		//return res.redirect('/login');
      console.log("Marche");
	    }
	});

    } else if (req.body.logemail && req.body.logpassword) {
	User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
	    if (error || !user) {
		var err = new Error('Wrong email or password.');
		err.status = 401;
		return next(err);
	    } else {
		req.session.userId = user._id;
		return res.redirect('/profile');
	    }
	});
    } else {
	var err = new Error('All fields required.');
	err.status = 400;
	res.render('register', {title: 'Inscription', error: true,
				styleLink: "/stylesheets/register.css",
				errorText: "Tout les champs sont requis"});
	return next(err);
    }
    res.render('register', {title: 'Inscription', error: false,
			    styleLink: "/stylesheets/register.css"});
};
