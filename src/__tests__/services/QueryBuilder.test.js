const util = require('util');
const QueryBuilderProxy = require('../../services/QueryBuilderProxy');

const Client = require('./MockedModels/ClientModel');
const Product = require('./MockedModels/ProductModel');
const Address = require('./MockedModels/AddressModel');
const Stock = require('./MockedModels/StockModel');

describe('QueryBuilderProxy', () => {
  let queryB;
  let fullQueryBuilder;

  class FullInstance {
    constructor() {
      this.attributes = new Set()
        .add('name')
        .add('lastname')
        .add('age');
    }

    insertData(params) {
      return params;
    }

    updateData(params, id) {
      return params;
    }

    deleteData(id) {
      return id;
    }

    getData(params, id) {
      return params;
    }
  }
  beforeAll(() => {
    queryB = new QueryBuilderProxy([]);
    const fI = new FullInstance();
    const fIProxiado = new QueryBuilderProxy([fI]);
    fullQueryBuilder = fIProxiado.setProxy(fI);
  });

  it('should return an array of instances and internalHandler null', () => {
    class Instance1 {
      constructor() {
        this.attributes = new Set()
          .add('foo')
          .add('bar')
          .add('peo');
      }
    }
    class Instance2 {
      constructor() {
        this.attributes = new Set()
          .add('foo')
          .add('bar')
          .add('peo')
          .add('poto');
      }
    }
    class Instance3 {
      constructor() {
        this.attributes = new Set().add('foo').add('bar');
      }
    }
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
    const expectedMapping = ['insert', 'update', 'delete', 'get'];
    const fI = new FullInstance();
    const qb = new QueryBuilderProxy([fI]);
    const { queryDictionary } = qb;
    const m = queryDictionary.map(item => item.action);
    expect(m).toEqual(expectedMapping);
  });
  it('should return a insertion query if the some insert methdo is called', () => {
    const ri = fullQueryBuilder.insertData({ name: 'nicolas', lastname: 'riquelme', age: 32 });
    const expectedString = `insert into fullinstance (name, lastname, age) values ('nicolas', 'riquelme', '32') returning *;`;
    expect(ri.toLowerCase()).toEqual(expectedString);
  });
  it('should return a updation query when the update method is called', () => {
    const ru = fullQueryBuilder.updateData({ foo: 'bar', age: 31 }, 12);
    const expectedString = `update fullinstance set foo='bar', age='31' where id = '12';`;
    expect(ru.toLowerCase()).toEqual(expectedString);
  });
  it('should return a delete query when the delete method is called', () => {
    const rd = fullQueryBuilder.deleteData(23);
    const expectedString = `delete from fullinstance where id = '23';`;
    expect(rd.toLowerCase()).toEqual(expectedString);
  });
  it('should return a select query when the get method is called', () => {
    const rs = fullQueryBuilder.getData(['name', 'lastname', 'age', 'peo'], 23);
    const expectedString = `select name, lastname, age, peo from fullinstance where id = '23';`;
    expect(rs.toLowerCase()).toEqual(expectedString);
  });

  // QueryBuilder.prototype.generateQuery
  it('should return a insert query', () => {
    const queryOperation = { action: 'insert' };
    const dataToInsert = [{ name: 'nicolas', lastname: 'guzman', age: 31, createdAt: 'today' }];
    const instanceName = ['Person'];
    const attributes = ['name', 'lastname', 'age', 'createdAt'];
    const rI = queryB.generateQuery([queryOperation, dataToInsert, instanceName, attributes]);
    const expectedQuery = `insert into person (name, lastname, age, createdat) values ('nicolas', 'guzman', '31', 'today') returning *;`;
    expect(rI.toLowerCase()).toBe(expectedQuery);
  });

  it('should return an update query', () => {
    const queryOperation = { action: 'update' };
    const dataToInsert = [{ foo: 'bar', bork: 'peo' }, 23];
    const instanceName = ['Poto'];
    const attrs = ['foo', 'bork'];
    const r1 = queryB.generateQuery([queryOperation, dataToInsert, instanceName, attrs]);
    const expectedQuery = `update poto set foo='bar', bork='peo' where id = '23';`;
    expect(r1.toLowerCase()).toEqual(expectedQuery);
  });

  it('should return a delete query', () => {
    const queryOperation = { action: 'delete' };
    const dataToInsert = [100];
    const instanceName = ['Caca'];
    const attrs = ['bar', 'baz'];
    const r1 = queryB.generateQuery([queryOperation, dataToInsert, instanceName, attrs]);
    const expectedS = `delete from caca where id = '100';`;
    expect(r1.toLowerCase()).toEqual(expectedS);
  });

  it('should return a select query', () => {
    const queryOperation = { action: 'get' };
    const dataToInsert = [['address', 'lat', 'long'], 1200];
    const instanceName = ['Popo'];
    const r1 = queryB.generateQuery([queryOperation, dataToInsert, instanceName]);
    const expectedS = `select address, lat, long from popo where id = '1200';`;
    expect(r1.toLowerCase()).toEqual(expectedS);
  });

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

describe.only('QueryBuilderProxy various instances', () => {
  let fullQueryBuilder;
  let clientProxied;
  let productProxied;
  let addressProxied;
  let stockProxied;
  const client = new Client();
  const product = new Product();
  const address = new Address();
  const stock = new Stock();

  beforeAll(() => {
    fullQueryBuilder = new QueryBuilderProxy([client, product, address, stock]);
  });
  it('should handle various instances with different properties', () => {
    clientProxied = fullQueryBuilder.setProxy(client);
    console.log(
      clientProxied.insertData({
        id: 1,
        name: 'nicolas',
        lastname: 'riquelme',
        email: 'nicolas@mail.com',
        age: 31,
        addressId: '23'
      })
    );
  });
});
