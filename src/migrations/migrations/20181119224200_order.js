exports.up = async knex => {
  await knex.schema.raw(`
  CREATE TABLE order(
    id uuid not null primary key default gen_random_uuid(),
    id_client uuid references client(id) not null,
    id_order_history uuid references order_history(id) not null,
    created_at timestamp default now()
  )
  `);
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists("order");
};
