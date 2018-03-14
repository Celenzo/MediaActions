var mongoose = require('mongoose');
var User = require('../models/users');

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = require("stripe")(keySecret);

exports.stripe = function(req, res, next) {

<<<<<<< Updated upstream
    res.render('stripe', { title: 'Stripe'});
};
=======
    console.log("keypublishable = " + keyPublishable);
    console.log("keySecret = " + keySecret);
    res.render('stripe', { publishableKey:keyPublishable});

};

exports.charge = function(req, res, next) {

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
        .then(res.render('charge', { title: 'charge'}));
};

exports.test = function(req, res, next) {
    res.render('stripe');
};
>>>>>>> Stashed changes
