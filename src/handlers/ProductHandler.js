const Base = require('./BaseHandler');
const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');
const StockModel = require('../models/StockModel');
const Injector = require('../services/Injector');

class ProductHandler extends Base {
  constructor(client = null) {
    super();
    const [
      { instanceName: productKey },
      { instanceName: categoryKey },
      { instanceName: stockKey }
    ] = Injector.setDependency([
      new ProductModel(client),
      new CategoryModel(client),
      new StockModel(client)
    ]);
    this.productModel = Injector.proxyInstance(productKey);
    this.categoryModel = Injector.proxyInstance(categoryKey);
    this.stockModel = Injector.proxyInstance(stockKey);
  }

  async postProduct({ body }, response) {
    const { product } = body;
    const productInserted = await this.productModel.insertProduct(product);
    return productInserted;
  }

  async updateProduct({ body }, response) {}

  async deleteProduct({ body }, response) {}

  async getProduct({ body }, response) {}
}

module.exports = ProductHandler;
