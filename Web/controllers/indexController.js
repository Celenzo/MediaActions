exports.index = function(req, res) {
    if (req.user)
        console.log("User infos = " + req.user)
    res.render('index', { title: 'Media actions', user: req.user});
};
