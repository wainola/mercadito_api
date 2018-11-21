exports.up = async knex => {
  await knex.schema.raw(`
  CREATE TABLE product_list(
    id uuid not null primary key default gen_random_uuid(),
    id_inventory uuid references inventory(id) not null,
    name text not null,
    create_at timestamp default now()
  )
  `);
};

exports.down = async knex => {
  await knex.schema.dropTable("product_list");
};
