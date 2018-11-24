require("dotenv").config();
const { Pool } = require("pg");
const { DATABASE_URL } = process.env;

const pool = new Pool({
  connectionString: DATABASE_URL
});

describe("client migration", () => {
  it("should insert data to client table", async () => {
    const clientToInsert = [
      "john",
      "doe",
      "john@mail.com",
      "Nowhere street 123"
    ];
    const queryClient =
      "INSERT INTO client(name, lastname, email, address) VALUES ($1,$2,$3,$4) RETURNING *";
    const q = await pool.query(queryClient, clientToInsert);
    const d = await q.rows;
    expect(d).toHaveLength(1);
  });
});
