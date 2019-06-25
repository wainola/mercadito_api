// UP
const up = `CREATE TABLE STOCK (
  ID UUID NOT NULL PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  STOCK_QUANTITY NUMERIC NOT NULL
);`;

// DOWN
const down = `DROP TABLE STOCK;`;

module.exports = { up, down };