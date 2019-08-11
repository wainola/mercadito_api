const ProductHandler = require('../../handlers/ProductHandler');
const Injector = require('../../services/Injector');
const Response = require('../../testsUtils/Response');

class FakeProductModel {
  constructor() {
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

  async insertCategory(param) {
    return param;
  }

  async updateCategory(param, id) {
    return param;
  }

  async deleteCategory(id) {
    return param;
  }

  async getCategory(param, id) {
    return param;
  }
}

class FakeCategoryModel {
  constructor() {
    this.attributes = new Set()
      .add('id')
      .add('category_name')
      .add('createdat')
      .add('updatedat')
      .add('deletedat');
  }

  async insertCategory(param) {
    return param;
  }

  async updateCategory(param, id) {
    return param;
  }

  async deleteCategory(id) {
    return id;
  }

  async getCategory(param, id) {
    return param;
  }
}

class FakeStockModel {
  constructor() {
    this.attributes = new Set().add('id').add('stock_quantity');
  }

  async insertStock(quantity) {
    return quantity;
  }

  async updateStock(quantity, id) {
    return quantity;
  }

  async getStock(params, id) {
    return params;
  }
}

describe('ProductHandler', () => {
  let proxiedProduct;
  beforeAll(() => {});
  it('shoudl work', () => {});
});
