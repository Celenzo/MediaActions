'use strict';

const massive = require('massive');

module.exports = config => {
    return massive(config.postgres).then(db => {
        return {
            users: require('./usersModels')(db),
            gallery: require('./galleryModels')(db)
        }
    });
}