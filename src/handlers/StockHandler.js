const MetaApeiron = require('meta-apeiron');
const StockModel = require('../models/StockModel');

class StockHandler {
  constructor(client = null) {
    this.stockModel = MetaApeiron.setDependency(new StockModel(client)).proxyInstance();
  }

  async postStockQuantity({ body }, response) {
    const {
      stock: { stock_quantity }
    } = body;
    const stockInserted = await this.stockModel.insert({ stock_quantity });
    return response.status(200).send({ data: stockInserted });
  }

  async updateStock({ body }, response) {
    const {
      stock: { stock_quantity, id }
    } = body;
    const stockUpdated = await this.stockModel.update({ stock_quantity }, id);
    return response.status(200).send({ data: stockUpdated });
  }

  async getStock({ body }, response) {
    const {
      stock: { params, id }
    } = body;
    const selectedStock = await this.stockModel.get(params, id);
    return response.status(200).send({ data: selectedStock });
  }
}

module.exports = StockHandler;
