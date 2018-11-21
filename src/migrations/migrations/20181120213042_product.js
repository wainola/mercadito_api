exports.up = async knex => {
  await knex.schema.raw(`
  CREATE TABLE product (
    id uuid not null primary key default gen_random_uuid(),
    id_product_list uuid references product_list(id) not null,
    created_at timestamp default now()
  )
  `);
};

exports.down = function(knex, Promise) {};
