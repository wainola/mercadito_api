const { Pool } = require('pg');

const database = Symbol('database');

class Database {
  constructor(connectionString) {
    this[database] = new Pool({
      connectionString
    });
  }

  async connect() {
    return this[database]
      .connect()
      .then(() => ({ connected: true }))
      .catch(err => ({ connected: false, error: err }));
  }

  async queryToExec(query) {
    return this[database].query(query).then(data => data.rows);
  }
}

module.exports = Database;
