import knex from 'knex'
const connection = knex({
  client: 'pg',
  connection: {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: 'testing'
  }
});

export default connection;