const knex = require('knex')
const knexConfiguration = require('../knexfile')

module.exports = knex(knexConfiguration.development)
