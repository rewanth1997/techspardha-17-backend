var config = require('../config');

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        charset  : config.charset
    }
});

var Bookshelf = require('bookshelf')(knex);

module.exports.DB = Bookshelf;
