/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('app', function (table) {
    table.increments('_id');
    table.string('organisation', 255);
    table.string('appName', 255);
    table.integer('marginLeft');
    table.integer('marginRight');
  })
  .createTable('lyrics', function(table) {
    table.increments('_id');
    table.string('content', 42069).notNullable();
    table.string('title', 255).notNullable();
    table.specificType('categories', 'varchar(255) ARRAY');
  })
  .createTable('lyric-category', function(table) {
    table.increments('_id');
    table.string('category', 255);
  })
  .createTable('playlists', function(table) {
    table.increments('_id');
    table.specificType('ids', 'integer ARRAY');
    table.string('playlistName', 255);
    table.string('playlistDescription', 255);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
        .dropTable('app')
        .dropTable('lyrics')
        .dropTable('lyric-category')
        .dropTable('playlists');
}
