'use strict';

module.exports = (config, server) => {
    return require('./models')(config).then(models => {
        return require('./api')(config, models, server);
    });
}