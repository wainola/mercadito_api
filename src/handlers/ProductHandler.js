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
    const { product, category, stock } = body;
    const rs = await this.stockModel.insertStock(stock);
    console.log('RES::', rs);
    return '';
    // const productInserted = await this.productModel.insertProduct(product);
    // return response.status(200).send({ data: productInserted });
  }

  async updateProduct({ body }, response) {}

  async deleteProduct({ body }, response) {}

  async getProduct({ body }, response) {}
}

module.exports = ProductHandler;
