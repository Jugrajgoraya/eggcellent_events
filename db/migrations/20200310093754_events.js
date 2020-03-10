
exports.up = function (knex) {
  return knex.schema.createTable('events', t => {
    t.increments('id')
    t.string('title')
    t.text('description')
    t.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('events')
}

// to run a migration
// knex migrate:latest
