exports.index = function(req, res) {

    res.render('index', { title: 'Media actions', user: req.user});
};
