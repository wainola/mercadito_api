const MetaApeiron = require('meta-apeiron');
const CategoryModel = require('../models/CategoryModel');

class CategoryHandler {
  constructor(client = null) {
    this.categoryModel = MetaApeiron.setDependency(new CategoryModel(client)).proxyInstance();
    this.postCategory = this.postCategory.bind(this);
  }

  async postCategory({ body }, response) {
    const { category } = body;
    const categoryInserted = await this.categoryModel.insert(category);
    return response.status(200).send({ data: categoryInserted });
  }

  async updateCategory({ body }, response) {
    const {
      category: { id, category_name }
    } = body;
    const updatedCategory = { category_name };
    const categoryUpdated = await this.categoryModel.update(updatedCategory, id);
    return response.status(200).send({ data: categoryUpdated });
  }

  async deleteCategory({ body }, response) {
    const {
      category: { id }
    } = body;
    const categoryDeleted = await this.categoryModel.delete(id);
    return response.status(200).send({ data: categoryDeleted });
  }

  async getCategory({ body }, response) {
    const {
      category: { params, id }
    } = body;
    const categories = await this.categoryModel.get(params, id);
    return response.status(200).send({ data: categories });
  }
}

module.exports = CategoryHandler;
