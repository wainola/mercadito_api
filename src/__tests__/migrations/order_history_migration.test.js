require("dotenv").config();
const { Pool } = require("pg");
const { DATABASE_URL } = process.env;

const pool = new Pool({
  connectionString: DATABASE_URL
});

describe("order_history migration", () => {
  it("should insert data to order_history table", async () => {});
});
