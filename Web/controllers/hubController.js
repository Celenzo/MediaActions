var mongoose = require('mongoose');
var Photo = require('../models/hub');

exports.display = function(req, res)
{
  res.render('hub', {title: 'Upload'});
};

exports.upload = function(req, res)
{
  res.send(req.files);
};




    //

/*

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
*/
/*
exports.display = function(req, res, next) {

};

*/
