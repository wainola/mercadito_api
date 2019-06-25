const database = Symbol('database');

class Database {
  constructor() {
    this[database] = Promise.resolve(true);
  }

  async connect() {
    return true;
  }

  async queryToExec(query) {
    return this[database].then(response => [{ rows: ['some data '], response }]);
  }
}

module.exports = Database;
