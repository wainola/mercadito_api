const Injector = require('../../services/Injector');
const util = require('util');

const Address = require('./MockedModels/AddressModel');
const Client = require('./MockedModels/ClientModel');
const Product = require('./MockedModels/ProductModel');
const Stock = require('./MockedModels/StockModel');

describe('Injector => dependency injection of proxied models', () => {
  it('should return a null reference to dependencies attributes if there is no dependencies', () => {
    const dependencies = Injector.getDependencies();
    expect(dependencies).toEqual({});
  });
  it('should setup a dependecy and return the key', () => {
    class InstanceOnInjector {}
    const i1 = new InstanceOnInjector();
    const key = Injector.setDependency(i1);
    expect(key).toBe('instanceoninjector');
  });
  it('should resolve a proxied dependency provided the key to that dependency on the dependecy tree', () => {
    class I1 {
      constructor() {
        this.attributes = new Set()
          .add('foo')
          .add('bar')
          .add('baz');
      }
      insertData(p) {
        return p;
      }
      updateData() {}
      deleteData() {}
    }
    const i1 = new I1();
    const key = Injector.setDependency(i1);
    const proxiedInstance = Injector.proxyInstance(key);
    expect(util.types.isProxy(proxiedInstance)).toBe(true);
  });
  it('should resolve various proxied dependencies ', () => {});
});
