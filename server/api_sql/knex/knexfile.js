// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  client: 'postgresql',
  connection: {
    host: 'localhost',
    database: 'lyrics_projection',
    user:     'dev',
    password: 'dev'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: __dirname + '/migrations',
    tableName: 'knex_migrations'
  }
};
