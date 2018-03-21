var mongoose = require('mongoose');
var User     = require('../models/users')
var nm       = "toto"
var name     = User.username

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

exports.profil = function(req, res, next) {
    nm = funkytown(function (Result) {
	res.render('profil', {name});
    })
}

function funkytown(callback, name)
{
    User.find({}, {}).exec(function(err, Result){
	callback(Result[0]["username"]);
    })
}

