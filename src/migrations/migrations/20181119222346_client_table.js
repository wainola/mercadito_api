exports.up = async knex => {
  await knex.schema.raw(`
  CREATE TABLE client(
    id uuid not null primary key default gen_random_uuid(),
    name text not null,
    lastname text not null,
    email text not null,
    address text not null,
    create_at timestamp default now()
  )
  `);
};

exports.down = async knex => {
  await knex.schema.dropTable("client");
};
