var mongoose = require('mongoose');
var Hub = require('../models/hub');

exports.index = function(req, res, next)
{
    if (req.user === 'undefined' || req.user == null)
        res.redirect('/login');
  res.render('details', {title: 'Details', user:req.user});
};


