const MetaApeiron = require('meta-apeiron');
const StockHandler = require('../../handlers/StockHandler');
const Response = require('../../testsUtils/Response');

class FakeStockModel {
  constructor() {
    this.attributes = new Set().add('id').add('stock_quantity');
  }

  async insert(quantity) {
    return quantity;
  }

  async update(quantity, id) {
    return quantity;
  }

  async get(params, id) {
    return params;
  }
}

const fakeStockModel = new FakeStockModel();
const fksProxied = MetaApeiron.setDependency(fakeStockModel).proxyInstance();

function ProxyHandler(target) {
  const internalHandler = {
    construct(Target, args) {
      const instance = new Target(...args);
      instance.stockModel = fksProxied;
      return instance;
    }
  };
  return new Proxy(target, internalHandler);
}

describe('StockHandler unit test', () => {
  let res;
  let stockHandler;
  let postStockSpy;
  let updateStockSpy;
  let getStockSpy;
  let postStockBody;
  let updateStockBody;
  let getStockBody;
  beforeAll(() => {
    res = new Response();
    const mockClient = {
      query: async param => param
    };
    const StockHandlerProxied = ProxyHandler(StockHandler);
    stockHandler = new StockHandlerProxied(mockClient);
    postStockSpy = jest.spyOn(stockHandler, 'postStockQuantity');
    updateStockSpy = jest.spyOn(stockHandler, 'updateStock');
    getStockSpy = jest.spyOn(stockHandler, 'getStock');
    postStockBody = {
      body: {
        stock: { stock_quantity: 23 }
      }
    };
    updateStockBody = {
      body: {
        stock: { stock_quantity: 342, id: 'someid123' }
      }
    };
    getStockBody = {
      body: {
        stock: { params: ['stock_quantity', 'id'], id: 'someid123' }
      }
    };
  });
  it('should call the postStockQuantity method', async () => {
    await stockHandler.postStockQuantity(postStockBody, res);
    // expect(postStockSpy).toHaveBeenCalled();
  });
  it('should call the updateStock method', async () => {
    await stockHandler.updateStock(updateStockBody, res);
    expect(updateStockSpy).toHaveBeenCalled();
  });
  it('should call the getStock method', async () => {
    await stockHandler.getStock(getStockBody, res);
    expect(getStockSpy).toHaveBeenCalled();
  });
  it('should return 200 if passed a stock quantity to insert', async () => {
    const r = await stockHandler.postStockQuantity(postStockBody, res);
    const {
      statusCode,
      body: { data }
    } = r;
    expect(statusCode).toBe(200);
    expect(typeof data).toBe('string');
  });
  it('should return 200 if passed a quantity and a id to update the stock', async () => {
    const r = await stockHandler.updateStock(updateStockBody, res);
    const {
      statusCode,
      body: { data }
    } = r;
    expect(statusCode).toBe(200);
    expect(typeof data).toBe('string');
  });
  it('should return a 200 if passed the quantity parameters and the id to get the data from a particular row of stock', async () => {
    const r = await stockHandler.getStock(getStockBody, res);
    const {
      statusCode,
      body: { data }
    } = r;
    expect(statusCode).toBe(200);
    expect(typeof data).toBe('string');
  });
});
