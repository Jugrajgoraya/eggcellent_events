const knex = require('../db/client')

module.exports = {
  all: () => {
    return knex.select().from('events')
      .then(events => {
        return events
      })
  },
  create: ({ title, description }) => {
    return knex.insert({ title, description })
      .into('events')
      .returning('*')
      .then(newEvent => {
        return newEvent
      })
  }
}
