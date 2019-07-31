class Product {
  constructor() {
    this.attributes = new Set()
      .add('id')
      .add('name')
      .add('description')
      .add('idCategory')
      .add('idStock');
  }

  insertData(params) {
    return params;
  }

  updateData(params, id) {
    return params;
  }

  deleteData(id) {
    return id;
  }

  getData(params, id) {
    return params;
  }
}

module.exports = Product;
