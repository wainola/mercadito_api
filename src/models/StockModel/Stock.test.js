const MetaApeiron = require('meta-apeiron');
const Stock = require('./index');
const ProxiedInstance = require('../../testsUtils/ProxyInstance');

describe('Stock Model unit test', () => {
  let proxiedStockModel;
  beforeAll(() => {
    const ProxiedStock = ProxiedInstance(Stock);
    const stockModel = new ProxiedStock();
    proxiedStockModel = MetaApeiron.setDependency(stockModel).proxyInstance();
  });
  it('should return an insertion query if provided a stock quantity to the insertStock method', async () => {
    const eps = `insert into stock (stock_quantity) values (23) returning *;`;
    const r = await proxiedStockModel.insert({ stock_quantity: 23 });
    expect(r.toLowerCase()).toEqual(eps);
  });
  it('should return a select query if provided the params and the id on the getStock method', async () => {
    const eps = `select stock_quantity from stock where id = 'hola';`;
    const r = await proxiedStockModel.get(['stock_quantity'], 'hola');
    expect(r.toLowerCase()).toEqual(eps);
  });
});
