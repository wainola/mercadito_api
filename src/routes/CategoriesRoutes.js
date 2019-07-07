const CategoriesHandler = require('../handlers/CategoriesHandler');

class CategoriesRoutes {
  static async getCategories(request, response) {}

  static async postCategory(request, response) {
    const {
      body: { id }
    } = request;

    return CategoriesHandler.postCategory(id, response);
  }

  static async deleteCategory(request, response) {}
}

module.exports = CategoriesRoutes;
