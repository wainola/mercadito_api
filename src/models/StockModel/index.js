const Database = require('../index');

class Stock extends Database {
  constructor() {
    super();
    this.attributes = new Set().add('id').add('stock_quantity');
  }

  async insertStock(quantity) {
    const queryToSend = quantity;
    return this.execQuery(queryToSend);
  }

  async updateStock(quantity, id) {
    const queryToSend = quantity;
    return this.execQuery(queryToSend);
  }

  async getStock(params, id) {
    const queryToSend = params;
    return this.execQuery(queryToSend);
  }
}

module.exports = Stock;
