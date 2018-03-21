var mongoose = require('mongoose');
var User     = require('../models/users')

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

function funkytown()
{
    User.find({}, {}).exec(function(err, Result){
	console.log(Result);
    })
}

exports.profil = function(req, res, next) {
    funkytown();
    res.render('profil');

};
