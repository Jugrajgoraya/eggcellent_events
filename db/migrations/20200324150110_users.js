
exports.up = function (knex) {
  return knex.schema.createTable('users', t => {
    t.bigIncrements('id')
    t.string('first_name')
    t.string('last_name')
    t.string('email')
    t.string('password_digest')
    t.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
