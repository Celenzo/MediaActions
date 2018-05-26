'use strict';

module.exports = (config, models, server) => {
    const handlers = require('./handlers')(config, models);
    return require('./routes')(handlers, config, server);
}