const Database = require('../index');

class Client extends Database {
  constructor(client) {
    super(client);
    this.attributes = new Set().add('id').add();
  }

  insert(client) {
    const queryToSend = client;
    return this.execQuery(queryToSend);
  }

  update(client, id) {
    const queryToSend = client;
    return this.execQuery(queryToSend);
  }

  delete(id) {
    const queryToSend = id;
    return this.execQuery(queryToSend);
  }

  get(params, id) {
    const queryToSend = params;
    return this.execQuery(queryToSend);
  }
}

module.exports = Client;
