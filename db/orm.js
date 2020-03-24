const bookshelf = require('bookshelf')

const knex = require('./client')

module.exports = bookshelf(knex)
