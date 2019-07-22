const Stock = require('./index');

function ProxiedModel(target) {
  const internalHandler = {
    get(target, propName) {
      return async function internalCallProxiedInstance(...args) {
        let type;
        switch (propName) {
          case 'insertStock':
            type = 'insert';
            const [quantity, id] = args;
            return target.buildQuery(type, quantity, id);
          case 'getStock':
            type = 'select';
            const [idSelect] = args;
            return target.buildQuery(type, null, idSelect);
          default:
            return null;
        }
      };
    }
  };
  return new Proxy(target, internalHandler);
}

describe('Stock Model unit test', () => {
  let proxiedStockModel;
  beforeAll(() => {
    const stockModel = new Stock();
    proxiedStockModel = ProxiedModel(stockModel);
  });
  it('should return an insertion query provided quantity and id to the insertStock method', async () => {
    const expectedIncludedString = ['insert', 'where'];
    const r = await proxiedStockModel.insertStock(23, '1');
    const rr = r
      .toLowerCase()
      .split(' ')
      .filter(item => item.includes('insert') || item.includes('where'));
    expect(rr).toEqual(expectedIncludedString);
  });
  it('should return a selection query provided the id to the getStock method', async () => {
    const expectedIncludedString = ['select', 'where'];
    const r = await proxiedStockModel.getStock('1');
    const rr = r
      .toLowerCase()
      .split(' ')
      .filter(item => item.includes('select') || item.includes('where'));
    expect(rr).toEqual(expectedIncludedString);
  });
});
