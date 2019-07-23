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
  it('should return the instances name and the method names for instances array', () => {
    class I1 {
      getData() {
        return 'Instance 1';
      }

      printSomeData() {
        console.log('foo');
      }

      funkyMethod() {
        return null;
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
    const r = qb.getInstancesAndMethods();
    const expectedInstancesNames = ['I1', 'I2'];
    const instancesNames = r.map(item => item.instanceName);
    const methodsNames = r.map(item => item.methods);
    const arr1 = methodsNames[0];
    const arr2 = methodsNames[1];
    expect(instancesNames).toEqual(expectedInstancesNames);
    expect(arr1).toEqual(['getData', 'printSomeData', 'funkyMethod']);
    expect(arr2).toEqual(['someData']);
  });

  it('should return a dictionary with a mapping between customary methods names and query operations on initializacion of the proxy', () => {
    class I1 {
      insertData() {}

      updateData() {}

      getData() {}

      deleteData() {}
    }
    const i1 = new I1();
    const qb = new QueryBuilderProxy([i1]);
    const expectedMapping = ['insert', 'update', 'delete', 'get'];
    const { queryDictionary } = qb;
    const m = queryDictionary.map(item => item.action);
    expect(m).toEqual(expectedMapping);
  });
  it.only('should return some query formed based on input', () => {
    class I1 {
      constructor() {
        this.attributes = new Set().add('name');
      }

      insertData(param) {
        return param;
      }
    }

    const i1 = new I1();
    const qb = new QueryBuilderProxy([i1]);
    const i1Proxiado = qb.setProxy(i1);
    i1Proxiado.insertData('tallarines');
  });
});
