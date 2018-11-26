require("dotenv").config();
const { Pool } = require("pg");

const conn = new Pool({
  connectionString: process.env.DATABASE_URL
});

const runMigration = async () => {
  const queryToRun = `
  ALTER TABLE order_data DROP CONSTRAINT order_data_id_order_history_fkey;
  ALTER TABLE order_data DROP COLUMN id_order_history;
  DROP TABLE IF EXISTS order_history;
  `;
  try {
    const query = await conn.query(queryToRun);
    const r = query;

    console.log("query runned::", r);
  } catch (e) {
    console.log("error::", e);
  }
};

runMigration();
