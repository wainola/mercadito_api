class Address {
  constructor() {
    this.attributes = new Set()
      .add('id')
      .add('address')
      .add('lat')
      .add('lng');
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

module.exports = Address;
