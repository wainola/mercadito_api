const Database = require('../index');

class Category extends Database {
  // eslint-disable-next-line class-methods-use-this
  async buildQuery(type, data = null, id = null) {
    switch (type) {
      case 'insert':
        return `INSERT INTO CATEGORY (category_name, createdAt) VALUES ('${data}', '${this.utils.insertNow()}') RETURNING *;`;
      case 'update':
        return `UPDATE CATEGORY SET category_name = '${data}', updatedAt = '${this.utils.insertNow()}' WHERE id = '${id}' RETURNING *;`;
      case 'delete':
        return `UPDATE CATEGORY SET deletedAt = '${this.utils.insertNow()}' WHERE id = '${id}' RETURNING *;`;
      case 'select':
        return 'SELECT * FROM CATEGORY;';
      default:
        return null;
    }
  }

  /**
   * POST CATEGORY
   */
  async insertCategory(category) {
    return this.buildQuery('insert', category)
      .then(async query => this.execQuery(query))
      .catch(error => error);
  }

  /**
   * UPDATE CATEGORY
   */
  async updateCategory(category, id) {
    return this.buildQuery('update', category, id)
      .then(async query => this.execQuery(query))
      .catch(error => error);
  }

  /**
   * DELETE CATEGORY
   */
  async deleteCategory(id) {
    return this.buildQuery('delete', null, id)
      .then(query => this.execQuery(query))
      .catch(error => error);
  }

  /**
   * GET CATEGORIES
   */
  async getCategories() {
    return this.buildQuery('select')
      .then(query => this.execQuery(query))
      .catch(error => error);
  }
}

module.exports = Category;
