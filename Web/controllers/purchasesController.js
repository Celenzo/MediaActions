var mongoose = require('mongoose');
var Purchases = require('../models/purchases');

exports.show = function(req, res, next) {
    if (req.user === 'undefined' || req.user == null)
        res.redirect('/login');

    res.render('purchases', {user: req.user._id});
};