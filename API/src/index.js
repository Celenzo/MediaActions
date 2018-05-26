'use strict';

module.exports = (config, server) => {
    return require('./models').then(models => {
        return require('./api')(config, models, server);
    })
}