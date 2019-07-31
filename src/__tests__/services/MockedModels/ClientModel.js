class Client {
  constructor() {
    this.attributes = new Set()
      .add('id')
      .add('name')
      .add('lastname')
      .add('email')
      .add('age')
      .add('addresId');
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

module.exports = Client;
