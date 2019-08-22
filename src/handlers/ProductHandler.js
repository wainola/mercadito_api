const MetaApeiron = require('meta-apeiron');
const Base = require('./BaseHandler');
const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');
const StockModel = require('../models/StockModel');

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
    const { product, stock } = body;
    const stockUpdation = await this.stockModel.updateStock({ quantity: stock.quantity }, stock.id);
    const productInsertion = await this.productModel.insertProduct(product);
    return response.status(200).send({ data: [stockUpdation, productInsertion] });
  }

  async updateProduct({ body }, response) {
    const { product } = body;
    const { id } = product;
    const dataToUpdate = Object.keys(product)
      .filter(item => item !== 'id')
      .reduce((acc, item) => {
        acc[item] = product[item];
        return acc;
      }, {});
    const productUpdation = await this.productModel.updateProduct(dataToUpdate, id);
    return response.status(200).send({ data: productUpdation });
  }

  async deleteProduct({ body }, response) {}

  async getProduct({ body }, response) {}
}

module.exports = ProductHandler;
