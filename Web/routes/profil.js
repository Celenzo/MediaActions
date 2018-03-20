var express = require('express');
var router = express.Router();

var profil_controller = require('../controllers/profilController');

router.get('/profil', profil_controller.profil);

module.exports = router;
