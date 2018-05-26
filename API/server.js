'use strict';

const hapi = require('hapi');
const inert = require('inert');
const vision = require('vision');
const hapiSwagger = require('hapi-swagger');

const config = require('./config')();
const pack = require('./package.json');

const init = async () => {

    try {

        const server = new hapi.Server({
            host: config.api.host,
            port: config.api.port
        });

        const hapiSwaggerPlugin = {
            plugin: hapiSwagger,
            options: {
                info: {
                    title: pack.name,
                    version: pack.version
                }
            },
            routes: {
                prefix: '/api'
            }
        };

        await server.register([inert, vision, hapiSwaggerPlugin]);
        require('./src')(config, server);
        await server.start();
        return server;

    } catch (err) {
        throw err;
    }
}

init().then(server => {
    console.log(`Server is running at ${server.info.uri}`);
}).catch(err => {
    console.log(err);
    process.exit(1);
});