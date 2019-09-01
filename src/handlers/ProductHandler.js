const MetaApeiron = require('meta-apeiron');
const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');
const StockModel = require('../models/StockModel');

class ProductHandler {
  constructor(client = null) {
    this.productModel = MetaApeiron.setDependency(new ProductModel(client)).proxyInstance();
    this.categoryModel = MetaApeiron.setDependency(new CategoryModel(client)).proxyInstance();
    this.stockModel = MetaApeiron.setDependency(new StockModel(client)).proxyInstance();
  }

  async postProduct({ body }, response) {
    const { product, stock } = body;
    const stockUpdation = await this.stockModel.update({ quantity: stock.quantity }, stock.id);
    const productInsertion = await this.productModel.insert(product);
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
    const productUpdation = await this.productModel.update(dataToUpdate, id);
    return response.status(200).send({ data: productUpdation });
  }

  async deleteProduct({ body }, response) {
    const {
      product: { id }
    } = body;
    const productDeletion = await this.productModel.delete(id);
    return response.status(200).send({ data: productDeletion });
  }

  async getProduct({ body }, response) {
    const { product, id } = body;
    const productSelection = await this.productModel.get(product, id);
    return response.status(200).send({ data: productSelection });
  }
}

module.exports = ProductHandler;
