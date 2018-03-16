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
    res.render('stripe', { publishableKey:keyPublishable, user:req.user});

};

exports.charge = function(req, res, next) {
    if (req.user === 'undefined' || req.user == null)
        res.redirect('/login');
    console.log("Test paymment");
    let amount = 500;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
        .then(customer =>
            stripe.charges.create({
                amount,
                description: "Sample Charge",
                currency: "usd",
                customer: customer.id
            }))
        .then(res.render('charge', { title: 'charge', user: req.user}));
};

exports.test = function(req, res, next) {
    res.render('stripe', {user:req.user});
};
