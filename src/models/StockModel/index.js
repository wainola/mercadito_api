const Database = require('../index');

class Stock extends Database {
  async buildQuery(type, data, id) {
    switch (type) {
      case 'insert':
        return `INSERT INTO STOCK (stock_quantity) VALUES (${data}) WHERE id = '${id}' RETURNING *;`;
      case 'select':
        return `SELECT * FROM STOCK WHERE id ='${id}';`;
    }
  }

  async insertStock(quantity, id) {
    return this.buildQuery('insert', quantity, id)
      .then(async query => this.execQuery(query))
      .catch(error => error);
  }

  async getStock(id) {
    return this.buildQuery('select', null, id)
      .then(async query => this.execQuery(query))
      .catch(error => error);
  }
}

module.exports = Stock;
