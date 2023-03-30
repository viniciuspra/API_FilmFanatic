const config = require('../../../knexfile');
const knex = require('knex');

const connection = knex(config.connection);

module.exports = connection;