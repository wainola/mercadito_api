const util = require('util');
const QueryBuilderProxy = require('../../services/QueryBuilderProxy');

describe('QueryBuilderProxy', () => {
  it('should return an array of instances and internalHandler null', () => {
    class Instance1 {}
    class Instance2 {}
    class Instance3 {}
    const i1 = new Instance1();
    const i2 = new Instance2();
    const i3 = new Instance3();
    const qb = new QueryBuilderProxy([i1, i2, i3]);
    expect(Array.isArray(qb.instances)).toBe(true);
    expect(qb.instances).toHaveLength(3);
    expect(qb.internalHandler).toBe(null);
  });
  it('should return a proxy instance', () => {
    class Target1 {}
    const t1 = new Target1();
    const qb = new QueryBuilderProxy([]);
    const proxiedT1 = qb.setProxy(t1);
    expect(util.types.isProxy(proxiedT1)).toBe(true);
  });
  it.only('should return the instances name and the method names for instances array', () => {
    class I1 {
      getData() {
        return 'Instance 1';
      }
    }
    class I2 {
      someData() {
        return 'Instance 2';
      }
    }

    const i1 = new I1();
    const i2 = new I2();

    const qb = new QueryBuilderProxy([i1, i2]);
    qb.getInstancesAndMethods();
  });
});
