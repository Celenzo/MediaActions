var mongoose = require('mongoose');
var User = require('../models/users');

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = require("stripe")(keySecret);

exports.stripe = function(req, res, next) {
    if (req.user === 'undefined' || req.user == null)
        res.redirect('/login');
    //console.log("keypublishable = " + keyPublishable);
    //console.log("keySecret = " + keySecret);
    var amount = 1000;
    res.render('stripe', { publishableKey:keyPublishable, user:req.user, amount:amount});

};

exports.charge = function(req, res, next) {
    /*if (req.user === 'undefined' || req.user == null)
        res.redirect('/login');
    "use strict";*/
    console.log("Test paymment");

    var customerName = "Pangolin";
    var customerID = "adqfg56nk98dsd";
    var amount = req.body.amount;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
        .then(customer =>
            stripe.charges.create({
                amount,
                description: customerName + " - " + customerID,
                currency: "eur",
                customer: customer.id
            }))
        .then(res.render('charge', { title: 'charge', user: req.user}));
};
