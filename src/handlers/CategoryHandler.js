const Base = require('./BaseHandler');
const CategoryModel = require('../models/CategoryModel');

class CategoryHandler extends Base {
  constructor(client = null) {
    super();
    this.categoryModel = new CategoryModel(client);
    this.postCategory = this.postCategory.bind(this);
  }

  async postCategory({ body }, response) {
    const {
      category: { category_name: category }
    } = body;
    const categoryInserted = await this.categoryModel.insertCategory(category);
    return response.status(200).send({ data: categoryInserted });
  }

  async updateCategory({ body }, response) {
    const {
      category: { id, category_name: category }
    } = body;
    const categoryUpdated = await this.categoryModel.updateCategory(id, category);
    return response.status(200).send({ data: categoryUpdated });
  }

  async deleteCategory({ body }, response) {
    const {
      category: { id }
    } = body;
    const categoryDeleted = await this.categoryModel.deleteCategory(id);
    return response.status(200).send({ data: categoryDeleted });
  }

  async getCategories(_, response) {
    const categories = await this.categoryModel.getCategories();
    return response.status(200).send({ data: categories });
  }
}

module.exports = CategoryHandler;
