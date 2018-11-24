require("dotenv").config();
const { Pool } = require("pg");
const { DATABASE_URL } = process.env;

const pool = new Pool({
  connectionString: DATABASE_URL
});

describe("categories migration", () => {
  it("should insert data to categories table", async () => {
    const categorieToInsert = ["categorie 1"];
    const queryCategories =
      "INSERT INTO categories(name) VALUES ($1) RETURNING *";
    const q = await pool.query(queryCategories, categorieToInsert);
    const data = q.rows;
    expect(data).toHaveLength(1);
  });
});
