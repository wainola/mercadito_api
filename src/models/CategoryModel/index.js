const Database = require('../index');

class Category extends Database {
  constructor(client) {
    super(client);
    this.attributes = new Set()
      .add('id')
      .add('category_name')
      .add('createdat')
      .add('updatedat')
      .add('deletedat');
  }

  /**
   * POST CATEGORY
   */
  async insert(category) {
    const queryTosend = category;
    return this.execQuery(queryTosend);
  }

  /**
   * UPDATE CATEGORY
   */
  async update(category, id) {
    const queryToSend = category;
    return this.execQuery(queryToSend);
  }

  /**
   * DELETE CATEGORY
   */
  async delete(id) {
    const queryToSend = id;
    return this.execQuery(queryToSend);
  }

  /**
   * GET CATEGORIES
   */
  async get(params, id) {
    const queryToSend = params;
    return this.execQuery(queryToSend);
  }
}

module.exports = Category;
