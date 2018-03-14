var mongoose = require('mongoose');
var User = require('../models/users');


exports.stripe = function(req, res, next) {

    res.render('stripe', { title: 'Stripe'});
};
