exports.up = async function(knex, Promise) {
  await knex.schema.createTable("user", table => {
    table.increments("id").primary();
    table.text("name").notNullable();
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists("user");
};
