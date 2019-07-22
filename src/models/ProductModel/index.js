const Database = require('../index');

class ProductModel extends Database {
  async buildQuery(type, data = null, id = null) {
    switch (type) {
    }
  }

  async insertProduct(attributes) {
    return this.buildQuery('insert', attributes).then(async query => this.execQuery(query));
  }

  async updateProduct() {}

  async deleteProduct() {}

  async getProduct() {}

  async getAllProducts() {}
}

module.exports = ProductModel;
