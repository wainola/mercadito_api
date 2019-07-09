const Base = require('./BaseHandler');
const CategoryModel = require('../models/CategoryModel');
const validators = require('./validators/CategoryValidators');

class CategoriesHandler extends Base {
  constructor() {
    super();
    this.categoryModel = new CategoryModel();
  }

  async postCategory(request, response) {
    const { body } = request;
    const validSchema = this.isValid(body, validators.postSchema);
    if (validSchema.error !== null) {
      return response
        .status(422)
        .send({ error: true, msg: 'malformed json', meta: validSchema.error });
    }
    const {
      category: { category_name: category }
    } = body;
    const categoryInserted = await this.categoryModel.insertCategory(category);
    return response.status(200).send({ data: categoryInserted });
  }
}

module.exports = new CategoriesHandler();
