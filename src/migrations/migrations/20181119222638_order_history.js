exports.up = async knex => {
  await knex.schema.raw(`
  CREATE TABLE order_history(
    id uuid not null primary key default gen_random_uuid(),
    created_at timestamp default now()
  )
  `);
};

exports.down = async knex => {
  await knex.schema.dropTable("order_history");
};
