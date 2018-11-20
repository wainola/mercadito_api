exports.up = async knex => {
  await knex.schema.raw(`
  CREATE TABLE invetory(
    id uuid not null primary key default gen_random_uuid(),
    id_categories uuid references categories(id) not null,
    product_name text not null,
    quantity text not null,
    price text not null,
    type text not null,
    description text not null,
    last_update timestamp
  )
  `);
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists("inventory");
};
