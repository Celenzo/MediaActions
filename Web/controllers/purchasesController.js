var mongoose = require('mongoose');
var Purchases = require('../models/purchases');
var User = require('../models/users');
var Hub = require('../models/hub');

exports.show = function(req, res, next) {
    if (req.user === 'undefined' || req.user == null)
        res.redirect('/login');

    var id = req.user._id;
    console.log("TEST RECUP" + id);


    Purchases.find( {customerId: id}, {} ).exec(function(err, Result) {
        if (err)
            console.log("MSG" + err);
        else
            console.log(Result);

        var data = [
            [String, String]
        ]

        var purchases = [];
        var nb = 0;

        for (var i = 0; i < Result.length; i++) {
            data.imageId = Result[i]["imageId"];
            data.date = Result[i]["date"];

            nb++;
            purchases.push(
                data.imageId,
                data.date,
            );
        }

        console.log("NB PURCHASES = " + nb);
        res.render('purchases', {user: req.user, nbPurchases: (nb * 2), data: purchases});
    })
/*
    Purchases.find({customerId: id})
        .populate('imageValue')
        .exec(function(err, Result){
            console.log(Result);
        })*/
};