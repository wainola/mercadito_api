class Stock {
  constructor() {
    this.attributes = new Set().add('id').add('quantity');
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

module.exports = Stock;
