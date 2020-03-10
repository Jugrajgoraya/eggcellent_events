// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'eggcellent_events_wadd_1'
      // username,
      // password
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }

}
