var mongoose = require('mongoose');

exports.display = function(req, res, next)
{
  res.render('hub', {title: 'Upload'});
};

exports.upload = function(req, res, next)
{
  var hubData = {
    originalname: req.files[0].originalname,
    mimetype: req.files[0].mimetype,
    destination: req.files[0].destination,
    filename: req.files[0].filename,
    path: req.files[0].path,
    size: req.files[0].size,
  }
/*
var hubData = {
	    originalname: "pangolin",
	}
  */
  Hub.create(hubData, function (error, hub) {
    if (error) {
      console.log("Msg : ");
      console.log(error);
    }
    else{
      console.log('Commentaire ajouté avec succès !');
      console.log(hub);
    }
  });
res.render('index', {title: 'Upload'});




}

  /*

  var datapicture = {
    originalname: req.files[0].originalname,
    mimetype: req.files[0].mimetype,
    destination: req.files[0].destination,
    filename: req.files[0].filename,
    path: req.files[0].path,
    size: req.files[0].size,
  }
  //res.send(req.files.map);
  console.log(datapicture);



  var HubSchm = new mongoose.Schema({
    originalname : String,
    mimetype : String,
    destination : String,
    filename : String,
    path : String,
    size : String,
    date : { type : Date, default : Date.now }
  });

  // Création du Model pour les commentaires
  var HubModel = mongoose.model('commentaires', HubSchm);

  // On crée une instance du Model
  var instModel = new HubModel();
  instModel.originalname = req.files[0].originalname;
  instModel.mimetype = req.files[0].mimetype;
  instModel.destination = req.files[0].destination;
  instModel.filename = req.files[0].filename;
  instModel.path = req.files[0].path;
  instModel.size = req.files[0].size;


  instModel.save(function (err) {
    if (err) {
      res.send("ERROR UPLOAD");
      throw err; }
    console.log('Instance ajoutée avec succès !');
  });
  */
