const client = require('./symbols');
const Utils = require('../utils');

class Database {
  constructor(cli) {
    this[client] = cli;
    this.utils = Utils;
  }

  async execQuery(query) {
    try {
      const qr = await this[client].query(query);
      return qr.rows;
    } catch (error) {
      return error;
    }
  }
}

module.exports = Database;
