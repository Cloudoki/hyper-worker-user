'use strict'

const config = require('../../knexfile')['default'];

const Knex = require('knex')(config);
const Bookshelf = require('bookshelf')(Knex);

Bookshelf.plugin('pagination');

module.exports = Bookshelf;
