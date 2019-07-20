const Base = require('./BaseHandler');
const CategoryModel = require('../models/CategoryModel');
const validators = require('./validators/CategoryValidators');

class CategoryHandler extends Base {
  constructor(client = null) {
    super();
    this.categoryModel = new CategoryModel(client);
    this.postCategory = this.postCategory.bind(this);
  }

  async postCategory(request, response) {
    const { body } = request;
    const validSchema = this.isValid(body, validators.postSchema);
    if (validSchema.error !== null) {
      return response.status(422).send({ error: true, msg: 'malformed json' });
    }
    const {
      category: { category_name: category }
    } = body;
    const categoryInserted = await this.categoryModel.insertCategory(category);
    return response.status(200).send({ data: categoryInserted });
  }

  async deleteCategory({ body }, response) {}
}

module.exports = CategoryHandler;
