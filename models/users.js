const knex = require('../db/client')

module.exports = {
  all: () => {
    return knex.select().from('users')
      .then(users => {
        return users
      })
  },
  one: (id) => {
    // return knex.select().from('events').where({ id: id })
    return knex.select().from('users').where({ id })
      .then(users => {
        if (users.length > 0) {
          return users[0]
        }
      })
  },
  create: ({ first_name, last_name, email, password_digest }) => {
    return knex.insert({ first_name, last_name, email, password_digest })
      .into('users')
      .returning('*')
      .then(newUser => {
        return newUser[0]
      })
  },
  delete: (id) => {
    return knex.delete().from('users').where({ id })
      .then(amountOfRecordsDeleted => {
        if (amountOfRecordsDeleted > 0) {
          return true
        }
      })
  },
  update: ({ id, first_name, last_name, email, password_digest }) => {
    return knex('users').update({ first_name, last_name, email, password_digest }).where({ id }).returning('*')
      .then(user => {
        return user[0]
      })
  }
}
