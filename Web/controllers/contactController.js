var mongoose = require('mongoose');

exports.show = function(req, res, next) {

    res.render('contact', { publishableKey:keyPublishable, amount:amount});
};

exports.send = function(req, res, next) {

    var mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS
        }
    });
    mailOpts = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;',
        to: GMAIL_USER,
        subject: 'New message from contact form at tylerkrys.ca',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
        if (error) {
            res.render('contact-failure');
        }
        else {
            res.render('contact-success');
        }
    });
};