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
  async insertCategory(category) {
    const queryTosend = category;
    return this.execQuery(queryTosend);
  }

  /**
   * UPDATE CATEGORY
   */
  async updateCategory(category, id) {
    const queryToSend = category;
    return this.execQuery(queryToSend);
  }

  /**
   * DELETE CATEGORY
   */
  async deleteCategory(id) {
    const queryToSend = id;
    return this.execQuery(queryToSend);
  }

  /**
   * GET CATEGORIES
   */
  async getCategory(params, id) {
    const queryToSend = params;
    return this.execQuery(queryToSend);
  }
}

module.exports = Category;
