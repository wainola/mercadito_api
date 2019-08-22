const Database = require('../index');

class Stock extends Database {
  constructor() {
    super();
    this.attributes = new Set().add('id').add('stock_quantity');
  }

  async insert(quantity) {
    const queryToSend = quantity;
    return this.execQuery(queryToSend);
  }

  async update(quantity, id) {
    const queryToSend = quantity;
    return this.execQuery(queryToSend);
  }

  async get(params, id) {
    const queryToSend = params;
    return this.execQuery(queryToSend);
  }
}

module.exports = Stock;
