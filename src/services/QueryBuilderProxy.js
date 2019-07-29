/**
 * QueryBuilderProxy
 * This Class intercep get property access, determines if a method is related with some database operation and
 * construct the query around that.
 */

function QueryBuilderProxy(instances = null) {
  if (!instances.length) {
    return;
  }
  this.instances = instances;
  this.internalHandler = null;
  this.instancesAndMethods = this.setInstancesAndMethods(instances);
  this.attributes = this.getAttributes(this.instances);
  this.queryDictionary = this.setQueryActions(this.instancesAndMethods);
  this.setInternalHandler = this.setInternalHandler.bind(this);
}

/**
 * Return a handler object with a get trap to intersect the property accesor of an instance
 */
QueryBuilderProxy.prototype.setInternalHandler = function setupInternalHandler() {
  const { queryDictionary, generateQuery, instancesAndMethods, attributes } = this;
  const self = this;
  const internalHandlerObject = {
    get(target, propName) {
      /**
       * This function receives the method arguments of the proxied instance.
       */
      return function internalCallForProxiedInstance(...args) {
        const getQueryAction = null;
        const retreivedAction = queryDictionary.map(item =>
          item.methodOriginalName === propName ? item.action : null
        );
        const instancesName = instancesAndMethods
          .map(item => item.instanceName)
          .filter(item => item === target.constructor.name);

        const getQuery = generateQuery.call(self, [
          retreivedAction,
          args,
          instancesName,
          attributes
        ]);
        return target[propName](getQuery);
      };
    }
  };

  this.internalHandler = internalHandlerObject;
  return this.internalHandler;
};

/**
 * Returns a Proxy of the instance passed
 */
QueryBuilderProxy.prototype.setProxy = function setProxyToInstance(target) {
  return new Proxy(target, this.setInternalHandler());
};

/**
 * Return the prototype of an instance
 */
QueryBuilderProxy.prototype.getPrototypesOfInstances = function resolvePrototypeOfInstances(
  instance
) {
  return Reflect.getPrototypeOf(instance);
};

/**
 * Returns the property descriptor of the instances prototype.
 */
QueryBuilderProxy.prototype.getInternalPropertiesDescriptorOfPrototype = function resolveInternalProperties(
  instancePrototype
) {
  return Object.getOwnPropertyDescriptors(instancePrototype);
};

/**
 * Returns the entries (keys, values) on the prototype of the instance
 */
QueryBuilderProxy.prototype.getEntriesOfPrototype = function resolveEntriesOfPrototype(
  instancePrototype
) {
  return Object.entries(instancePrototype).reduce((acc, item) => {
    acc.push(...item);
    return acc;
  }, []);
};

/**
 * Returns only the names of the methods of the instance
 */
QueryBuilderProxy.prototype.filterOnlyStrings = function resolveStringsMethod(
  instancePrototypeEntries
) {
  return instancePrototypeEntries.filter(item => typeof item === 'string');
};

/**
 * Return the methods of the instance
 */
QueryBuilderProxy.prototype.filterByMethodNames = function resolveMethodNames(
  instancePrototypeEntries
) {
  return instancePrototypeEntries.filter((_, idx) => idx !== 0);
};

/**
 * Returns an object that setup the instance name and the methods names.
 */
QueryBuilderProxy.prototype.setInstancesAndMethods = function setupInstancesAndMethodsToAnObject(
  instances
) {
  const instancesNamesAndMethods = instances.map(item => {
    const thePrototype = this.getPrototypesOfInstances(item);
    const theInternalProperties = this.getInternalPropertiesDescriptorOfPrototype(thePrototype);
    const descriptorEntries = this.getEntriesOfPrototype(theInternalProperties);
    const filteredByPropertiesNames = this.filterOnlyStrings(descriptorEntries);
    const filterByMethodNames = this.filterByMethodNames(filteredByPropertiesNames);
    return { instanceName: item.constructor.name, methods: [...filterByMethodNames] };
  });

  return instancesNamesAndMethods;
};

/**
 * Return instances and methods of the target instance passed on the Proxy
 */
QueryBuilderProxy.prototype.getInstancesAndMethods = function resolveInstancesAndMethods() {
  return this.instancesAndMethods;
};

/**
 * Returns the query actions sorted.
 * The expected query action order is: [insert, update, delete, get]
 */
QueryBuilderProxy.prototype.setQueryActions = function setupQueryActions(instancesNameAndMethods) {
  const methods = instancesNameAndMethods.map(item => item.methods)[0];
  const prefixedMethods = this.getPrefixedOnMethods(methods);
  const sortedQueryActions = this.sortMethodsNames(prefixedMethods);
  return sortedQueryActions;
};

/**
 * Return the methods names sorted by the expeted order of the query actions
 */
QueryBuilderProxy.prototype.sortMethodsNames = function resolveSortedMethods(methods) {
  const expectedOrder = ['insert', 'update', 'delete', 'get'];
  const sortedMethods = methods.sort((a, b) => {
    const idxA = expectedOrder.indexOf(a.action);
    const idxB = expectedOrder.indexOf(b.action);
    if (idxA < idxB) return -1;
    if (idxA > idxB) return 1;
    return 0;
  });
  return sortedMethods;
};

/**
 * Return the methods striped by postfix name.
 */
QueryBuilderProxy.prototype.getPrefixedOnMethods = function resolvePrefixOnMethodNames(methods) {
  const queryMapping = ['insert', 'update', 'delete', 'get'];
  return methods.reduce((acc, item) => {
    let r;
    if (item.includes('insert')) {
      r = queryMapping.indexOf('insert');
      acc.push({ action: queryMapping[r], whereClause: false, methodOriginalName: item });
    }
    if (item.includes('update')) {
      r = queryMapping.indexOf('update');
      acc.push({ action: queryMapping[r], whereClause: true, methodOriginalName: item });
    }
    if (item.includes('delete')) {
      r = queryMapping.indexOf('delete');
      acc.push({ action: queryMapping[r], whereClause: true, methodOriginalName: item });
    }
    if (item.includes('get')) {
      r = queryMapping.indexOf('get');
      acc.push({ action: queryMapping[r], whereClause: false, methodOriginalName: item });
    }

    return acc;
  }, []);
};

/**
 * Returns the query to use on the database instance
 * @param string typeOfQuery => insert, update, delete, get
 * @param dataToInsert => Array or Object
 * @param [instanceName]
 * @param [attributes]
 */
QueryBuilderProxy.prototype.generateQuery = function resolveQuery([
  typeOfQuery,
  dataToInsert,
  instanceName,
  attributes
]) {
  console.log(typeOfQuery, dataToInsert, instanceName, attributes);
  const attributesQuery = this.buildAttributesQuery(attributes);
  const parentAttributes = `(${attributesQuery})`;
  const [type] = typeOfQuery;
  const [tableName] = instanceName;
  const [data] = dataToInsert;
  const processedDataToInsert = this.processDataByInspection(data);
  console.log('data proceesed', processedDataToInsert);
  let query;
  switch (type) {
    case 'insert':
      query = `INSERT INTO ${tableName} ${parentAttributes} VALUES (${processedDataToInsert}) RETURNING *;`;
      return query;
    case 'update':
      const setColumnsSentences = this.generateSetColumnsSentences(dataToInsert, attributes);
      query = `UPDATE ${tableName}`;
      return query;
    case 'delete':
      return '';
    case 'get':
      return '';
    default:
      null;
  }
  return null;
};

/**
 * Return the attributes of the instances passed on the proxy
 * @param {Object} originalInstance
 * @returns [attributesName] array of the names of the attributes inside the instance
 */
QueryBuilderProxy.prototype.getAttributes = function resolveAttributesByInstances(
  originalInstance
) {
  const [inst] = originalInstance;
  const { attributes } = inst;
  // ATTRIBUTES IS A SET, TO WITH VALUES() METHODS IT RETURNS A ITERATOR
  const values = attributes.values();
  const attributesMapping = [];
  for (const v of values) {
    attributesMapping.push(v);
  }
  return attributesMapping;
};

/**
 * Return a string with the part of the query related to the attributes describe to pass on a DDL sentence
 */
QueryBuilderProxy.prototype.buildAttributesQuery = function resolveAttributesString(attributes) {
  return this.generateListForQuery(attributes, 'columns');
};

/**
 * Returns the List of values for a query corresponding to the values that one should pass on a DDL sentence.
 * It checks the data type of the data.
 * It can receive a Object, Array or a String.
 * TODO: should return a error if passed the wrong type of argument
 * @param [data]
 * @param {data}
 * return string string in the form of 'something', 'somewhere', ...
 */
QueryBuilderProxy.prototype.processDataByInspection = function resolveData(data) {
  const dataType = this.checkDataType(data);
  if (dataType !== 'object') {
    return this.generateListForQuery(data, 'values');
  }
  const objValues = Object.values(data);
  return this.generateListForQuery(objValues, 'values');
};

/**
 * Return the data type of the arguments passed to the instance method
 * @param [data] array of data
 * @param {object}
 * @param string
 * @returns string with the data type of the argument passed
 */
QueryBuilderProxy.prototype.checkDataType = function resolveDataType(data) {
  if (Array.isArray(data)) {
    return 'array';
  }
  return typeof data;
};

/**
 * Return the last item of an array.
 * @param [columns] array of columns values
 * @param [values] array of values
 * @returns [item] the last item of the passed array
 */
QueryBuilderProxy.prototype.getLastItemOfArray = function resolveLastItem(arr) {
  return arr.filter((_, idx, self) => idx === self.length - 1);
};

/**
 * Return the list of values to user in que DML sentence
 * @param [columns] Array of columns names
 * @param [values] Array of values names
 * @param string context Either VALUES or COLUMNS
 * @returns string String with columns names or the values names
 * EX:
 * If we have the following insertion statement
 * INSERT INTO TABLE (COLUMN1, COLUMN2, COLUMN3) VALUES (VALUE1, VALUE2, VALUE3)
 * This methods returns the (COLUMN1, COLUMN2, COLUMN3) part if the context value is COLUMNS
 * or returns the (VALUE1, VALUE2, VALUE3) part if the context value is VALUES
 *
 * TODO: check the string construction if passed a number or other datatype that is not a string
 */
QueryBuilderProxy.prototype.generateListForQuery = function resolveListQuery(data, context) {
  const [lastItem] = this.getLastItemOfArray(data);
  return data.reduce((acc, item) => {
    if (item === lastItem) {
      acc += context !== 'values' ? `${item}` : `'${item}'`;
      return acc;
    }
    acc += context !== 'values' ? `${item}, ` : `'${item}', `;
    return acc;
  }, '');
};

QueryBuilderProxy.prototype.generateSetColumnsSentences = function resolveSetColumnsSentences(
  dataToInsert,
  attributesOfInstance
) {
  console.log('d:', dataToInsert, attributesOfInstance);
};

module.exports = QueryBuilderProxy;
