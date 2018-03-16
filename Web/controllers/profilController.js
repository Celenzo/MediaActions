var mongoose = require('mongoose');
var User     = require('../models/users')

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;


exports.profil = function(req, res, next) {

    res.render('profil');

};
