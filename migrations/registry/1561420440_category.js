// UP
const up = `CREATE TABLE CATEGORY (
  ID UUID NOT NULL PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  CATEGORY_NAME TEXT NOT NULL,
  CREATEDAT TIMESTAMP NOT NULL,
  UPDATEDAT TIMESTAMP DEFAULT NULL,
  DELETEDAT TIMESTAMP DEFAULT NULL
);`;

// DOWN
const down = `DROP TABLE CATEGORY;`;

module.exports = { up, down };
