var mongoose = require('mongoose');
var User = require('../models/users');
var Purchases = require('../models/purchases');

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = require("stripe")(keySecret);

exports.stripe = function(req, res, next) {
    if (req.user === 'undefined' || req.user == null)
        res.redirect('/login');
    var amount = 1000;
    res.render('stripe', { publishableKey:keyPublishable, user:req.user, amount:amount});

};

exports.charge = function(req, res, next) {
    if (req.user === 'undefined' || req.user == null)
        res.redirect('/login');

    var customerName = req.user.username;
    var customerID = req.user._id   ;
    var amount = req.body.amount;
    var imageId = req.body.imageID;

    console.log("IMAGEID = " + imageId + " USERID = " +  req.user._id);

    var purchaseDatas = {
        customerId:customerID,
        imageId: imageId,
        date: new Date()
    }
    Purchases.create(purchaseDatas, function (error, hub) {
        if (error) {
            console.log("Msg : ");
            console.log(error);
        }
        else{
            console.log('Achat enregistré en BDD');
            console.log(hub);
        }
    });

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
        .then(customer =>
            stripe.charges.create({
                amount,
                description: customerName + " - " + customerID + " - " + imageId,
                currency: "eur",
                customer: customer.id
            }))
        .then(res.render('index', {user: req.user._id}));
};
