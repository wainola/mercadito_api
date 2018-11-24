exports.up = async knex => {
  knex.schema.raw(`
  ALTER TABLE order_history ADD COLUMN id_order uuid not null references 
  `);
};

exports.down = async knex => {};
