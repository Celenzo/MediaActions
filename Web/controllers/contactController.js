var mongoose = require('mongoose');

const nodemailer = require('nodemailer');
const MAIL_USER = "contact@media-actions.eu";
const MAIL_PASS = "contact";

exports.show = function(req, res, next) {

    res.render('contact', {result: "none", user:req.user});
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

exports.send = function(req, res, next) {
    var email = req.body.email;
    if (req.body.message.length <= 1337)
    {
        if (email) {

            var mailOpts, smtpTrans;
            smtpTrans = nodemailer.createTransport({
                host: 'mail.media-actions.eu',
                port: 587,
                secure: false,
                auth: {
                    user: MAIL_USER,
                    pass: MAIL_PASS
                }
            });
            mailOpts = {
                from: req.body.name + ' &lt;' + req.body.email,
                to: MAIL_USER,
                subject: 'Formulaire de contact - Media Actions',
                text: `${req.body.name} (${req.body.email}) a écris: ${req.body.message}`
            };
            smtpTrans.sendMail(mailOpts, function (error, response) {
                if (error) {
                    res.render('contact', {result: "error", user:req.user});
                    console.log("ERROR CONTACT = " + response);
                }
                else {
                    res.render('contact', {result: "ok", user:req.user});
                    console.log("CONTACT OK");
                }
            });
        }
        else {
            res.render('contact', {result: "error", user:req.user});
            console.log("ERROR CONTACT = " + response);
        }
    }
    else
    {
        res.render('contact', {result: "tooLarge", user:req.user});
    }
};