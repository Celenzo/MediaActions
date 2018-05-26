'use strict';

module.exports = () => {
    return require('common-env')().getOrElseAll({
        api: {
            host: '0.0.0.0',
            port: 4567
        },
        postgres: {
            connectionString: 'postgres://celenzo:celenzo@127.0.0.1:5432/mediaactionsdb'
        }
    });
}