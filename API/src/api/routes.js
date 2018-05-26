'use strict';

module.exports = (server, handlers) => {
    server.route({
        method: 'GET',
        path: '/gallery',
        handler: handlers.gallery
    });

    server.route({
        method: 'POST',
        path: '/users/auth/login',
        handler: handlers.login
    });

    server.route({
        method: 'POST',
        path: '/users/auth/register',
        handler: handlers.register
    });

    server.route({
        method: 'POST',
        path: '/gallery/upload',
        handler: handlers.upload
    });
}