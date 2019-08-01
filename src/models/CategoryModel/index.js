const Database = require('../index');

class Category extends Database {
  constructor() {
    super();
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
    return category;
  }

  /**
   * UPDATE CATEGORY
   */
  async updateCategory(category, id) {
    return category;
  }

  /**
   * DELETE CATEGORY
   */
  async deleteCategory(id) {
    return id;
  }

  /**
   * GET CATEGORIES
   */
  async getCategories(params, id) {
    return params;
  }
}

module.exports = Category;
