exports.up = async knex => {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
  await knex.schema.raw(`
  CREATE TABLE categories(
    id uuid not null primary key default gen_random_uuid(),
    name text not null,
    created_at timestamp default now()
  )
  `);
};

exports.down = async knex => {
  await knex.schema.dropTable("categories");
};
