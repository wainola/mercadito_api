const MetaApeiron = require('meta-apeiron');
const Base = require('./BaseHandler');
const CategoryModel = require('../models/CategoryModel');

class CategoryHandler extends Base {
  constructor(client = null) {
    super();
    this.categoryKey = Injector.setDependency(new CategoryModel(client));
    this.categoryModel = Injector.proxyInstance(this.categoryKey);
    this.postCategory = this.postCategory.bind(this);
  }

  async postCategory({ body }, response) {
    const { category } = body;
    const categoryInserted = await this.categoryModel.insertCategory(category);
    return response.status(200).send({ data: categoryInserted });
  }

  async updateCategory({ body }, response) {
    const {
      category: { id, category_name }
    } = body;
    const updatedCategory = { category_name };
    const categoryUpdated = await this.categoryModel.updateCategory(updatedCategory, id);
    return response.status(200).send({ data: categoryUpdated });
  }

  async deleteCategory({ body }, response) {
    const {
      category: { id }
    } = body;
    const categoryDeleted = await this.categoryModel.deleteCategory(id);
    return response.status(200).send({ data: categoryDeleted });
  }

  async getCategory({ body }, response) {
    const {
      category: { params, id }
    } = body;
    const categories = await this.categoryModel.getCategory(params, id);
    return response.status(200).send({ data: categories });
  }
}

module.exports = CategoryHandler;
