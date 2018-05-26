'use strict'

const aes256 = require('aes256');
const passport = require('passport');

module.exports = (config, models) => {
    return {
        login: (req, res) => {
            passport.authenticate('local')(req, res, (error, user) => {
                res.json({user: req.user});
            });
        },
        register: (req, res) => {
            const pwd = req.payload.password;
            const array = pwd.split("");
            array.reverse();
            const cipher = aes256.createCipher(array.join(''));

            return models.users
                .addUser(req.body.username, cipher.encrypt(req.body.password), req.body.email)
                .then(result => res.response({message: 'register success'}).code(201))
                .catch(error => res.response({error}).code(500));
        },
        upload: (req, res) => {
            //Upload image with socket.io
        },
        gallery: (req, res) => {
            return models.gallery
                .getImages()
                .then(res => {
                    //Send images with socket.io
                })
                .catch(err => res.response({error: 'Database error while retreiving data'}).code(500));
        }
    }
}