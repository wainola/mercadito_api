const Database = require('../index');

class Product extends Database {
  constructor() {
    super();
    this.attributes = new Set()
      .add('id')
      .add('fk_category_id')
      .add('fk_stock_id')
      .add('product_name')
      .add('product_price')
      .add('product_description')
      .add('createdat')
      .add('updatedat')
      .add('deletedat');
  }

  /**
   *
   * Product insertion need the fk for the category and the id of the stock
   * to enable the table relationship.
   */
  async insert(params) {
    const queryToSend = params;
    return this.execQuery(queryToSend);
  }

  async update(params, id) {
    const queryToSend = params;
    return this.execQuery(queryToSend);
  }

  async delete(id) {
    const queryToSend = id;
    return this.execQuery(queryToSend);
  }

  async get(params, id) {
    const queryToSend = params;
    return this.execQuery(queryToSend);
  }

  async getAllProducts() {}
}

module.exports = Product;
