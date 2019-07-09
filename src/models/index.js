const client = require('./symbols');
const Utils = require('../utils');

class Database {
  constructor(cli) {
    this[client] = cli;
    this.utils = Utils;
  }

  async execQuery(query) {
    return this[client]
      .query(query)
      .then(data => data.rows)
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}

module.exports = Database;
