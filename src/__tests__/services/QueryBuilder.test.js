const util = require('util');
const QueryBuilderProxy = require('../../services/QueryBuilderProxy');

describe('QueryBuilderProxy', () => {
  let queryB;
  beforeAll(() => {
    queryB = new QueryBuilderProxy([]);
  });

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

  it('should return some query formed based on input', () => {
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
  it.only('should', () => {
    class I1 {
      constructor() {
        this.attributes = new Set()
          .add('name')
          .add('lastname')
          .add('age');
      }

      insertData(params) {
        return params;
      }
    }

    const i1 = new I1();
    const qb = new QueryBuilderProxy([i1]);
    const i1Proxiado = qb.setProxy(i1);
    const result = i1Proxiado.insertData({ name: 'nicolas', lastname: 'riquelme', age: 32 });
    console.log('result1', result);
  });

  it('should set the proxy if passed an instance. If not, should return an error', () => {});

  it('should get the prototype of an instance an return it', () => {});

  it('should return the internal properties descriptors of an prototype if an instancen prototype is passed', () => {});

  it('should return the entries values of a prototype', () => {});

  it('should return the names of the methods of an instance', () => {});

  it('should filter the names of the methods of an instance', () => {});

  it('should set the instance and methods and return an object describing this properties', () => {});

  it('should set the query actions if passed the methods of an instance', () => {});

  it('should return the methods names sorted by a predetermined order. This methods should have corresponden with some fundamental query operations', () => {});

  it('should return one part of the methods name that has correspondence with some fundamental query operation', () => {});

  // QueryBuilder.prototype.generateQuery
  it('should return a insert query', () => {
    const queryOperation = ['insert'];
    const dataToInsert = [{ name: 'nicolas', lastname: 'guzman', age: 31, createdAt: 'today' }];
    const instanceName = ['Person'];
    const attributes = ['name', 'lastname', 'age', 'createdAt'];
    const r1 = queryB.generateQuery([queryOperation, dataToInsert, instanceName, attributes]);
    const expectedQuery = `insert into person (name, lastname, age, createdat) values ('nicolas', 'guzman', '31', 'today') returning *;`;
    expect(r1.toLowerCase()).toBe(expectedQuery);
  });

  it.only('should return an update query', () => {
    const queryOperation = ['update'];
    const dataToInsert = [{ foo: 'bar', bork: 'peo' }];
    const instanceName = ['Poto'];
    const attrs = ['foo', 'bork'];
    const r1 = queryB.generateQuery([queryOperation, dataToInsert, instanceName, attrs]);
    console.log('update r1:', r1);
  });

  it.only('should return a delete query', () => {});

  it.only('should return a select query', () => {});

  // QueryBuilderProxy.prototype.getAttributes
  it('shoudl get the attributes of an instances that is a direct mapping of the attributes that are defined inside the class that maps to a table', () => {
    class I1 {
      constructor() {
        this.attributes = new Set()
          .add('peo')
          .add('poto')
          .add('caca')
          .add('popo');
      }
    }
    const i1 = new I1();
    const r1 = queryB.getAttributes([i1]);
    const e1 = ['peo', 'poto', 'caca', 'popo'];
    expect(r1).toEqual(e1);
  });

  // QueryBuilderProxy.prototype.buildAttributeQuery
  it('should return the attributes part of an query', () => {
    const columns = ['name', 'lastname', 'peo'];
    const r1 = queryB.buildAttributesQuery(columns);
    const e1 = 'name, lastname, peo';
    expect(r1).toEqual(e1);
  });

  // QueryBuilderProxy.prototype.generateListForQuery
  it('should return a string with the values of the columns or the values that will be inserted on the database', () => {
    const columnsData = ['name', 'lastname', 'age', 'createdAt'];
    const columnsCTX = 'columns';
    const valuesData = ['fideos', 23000, 'abarrotes'];
    const valuesCTX = 'values';
    const r1 = queryB.generateListForQuery(columnsData, columnsCTX);
    const r2 = queryB.generateListForQuery(valuesData, valuesCTX);
    const expectedR1 = 'name, lastname, age, createdAt';
    const expectedR2 = `'fideos', '23000', 'abarrotes'`;
    expect(r1).toEqual(expectedR1);
    expect(r2).toEqual(expectedR2);
  });

  // QueryBuilderProxy.prototype.getLastItemOfArray
  it('should return the last item of an array', () => {
    const a = ['foo', 23, false, {}];
    const r1 = queryB.getLastItemOfArray(a);
    expect(r1).toEqual([{}]);
  });

  // QueryBuilderProxy.prototype.checkDataType
  it('should check the data type passed to the function', () => {
    const obj = {};
    const r1 = queryB.checkDataType(obj);
    expect(r1).toBe('object');
  });

  // QueryBuilderProxy.prototype.processDataByInspection
  it('should process the values passed to the function, and return the list of the values passed', () => {
    const obj = { foo: 'bar', baz: 'fuf', bork: 'bree' };
    const a = ['poo', 'bee', 'bork'];
    const r1 = queryB.processDataByInspection(obj);
    const r2 = queryB.processDataByInspection(a);
    const e1 = `'bar', 'fuf', 'bree'`;
    const e2 = `'poo', 'bee', 'bork'`;
    expect(r1).toEqual(e1);
    expect(r2).toEqual(e2);
  });
});
