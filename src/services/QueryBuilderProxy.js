function QueryBuilderProxy(instances) {
  this.instances = instances;
  this.internalHandler = null;
  this.instancesAndMethods = this.setInstancesAndMethods(instances);
  this.attributes = this.getAttributes(this.instances);
  this.queryDictionary = this.setQueryActions(this.instancesAndMethods);
  this.setInternalHandler = this.setInternalHandler.bind(this);
}

QueryBuilderProxy.prototype.setInternalHandler = function setupInternalHandler() {
  const { queryDictionary, generateQuery, instancesAndMethods, attributes } = this;
  const self = this;
  const internalHandlerObject = {
    get(target, propName) {
      return function internalCallForProxiedInstance(...args) {
        /**
         * THE PROP NAME IS ONE OF THE NAME METHOD
         * THIS NAMES SHOULD BE MAPPED TO A DICTIONARY
         * THIS DICTIONARY SHOULD HAVE FOR ALL THE METHODS, A QUERY ACTION
         * IF MORE THAN ONE PARAMETERS IS PASSED
         * WE CAN ASSUME THAT THE SECOND PARAMETER SHOULD BE ON A WHERE CLAUSE
         * THIS ASUMPTION IS NOT EXHAUSTIVE.
         * IF THIS REALLY IS A QUERY BUILDER, MORE THANT ONE PARAMETER
         * SHOULD IMPLY MORE FIELDS TO GET
         */
        // console.log(propName, args, target.constructor.name);
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

QueryBuilderProxy.prototype.setProxy = function setProxyToInstance(target) {
  return new Proxy(target, this.setInternalHandler());
};

QueryBuilderProxy.prototype.getPrototypesOfInstances = function resolvePrototypeOfInstances(
  instance
) {
  return Reflect.getPrototypeOf(instance);
};

QueryBuilderProxy.prototype.getInternalPropertiesDescriptorOfPrototype = function resolveInternalProperties(
  instancePrototype
) {
  return Object.getOwnPropertyDescriptors(instancePrototype);
};

QueryBuilderProxy.prototype.getEntriesOfPrototype = function resolveEntriesOfPrototype(
  instancePrototype
) {
  return Object.entries(instancePrototype).reduce((acc, item) => {
    acc.push(...item);
    return acc;
  }, []);
};

QueryBuilderProxy.prototype.filterOnlyStrings = function resolveStringsMethod(
  instancePrototypeEntries
) {
  return instancePrototypeEntries.filter(item => typeof item === 'string');
};

QueryBuilderProxy.prototype.filterByMethodNames = function resolveMethodNames(
  instancePrototypeEntries
) {
  return instancePrototypeEntries.filter((_, idx) => idx !== 0);
};

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

QueryBuilderProxy.prototype.getInstancesAndMethods = function resolveInstancesAndMethods() {
  return this.instancesAndMethods;
};

QueryBuilderProxy.prototype.setQueryActions = function setupQueryActions(instancesNameAndMethods) {
  const methods = instancesNameAndMethods.map(item => item.methods)[0];
  const prefixedMethods = this.getPrefixedOnMethods(methods);
  const sortedQueryActions = this.sortMethodsNames(prefixedMethods);
  return sortedQueryActions;
};

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

QueryBuilderProxy.prototype.generateQuery = function resolveQuery([
  typeOfQuery,
  dataToInsert,
  instanceName,
  attributes
]) {
  const attributesQuery = this.buildAttributesQuery(attributes);
  const parentAttributes = `(${attributesQuery})`;
  const [type] = typeOfQuery;
  const [tableName] = instanceName;
  const [data] = dataToInsert;
  const processedDataToInsert = this.processDataByInspection(data);
  switch (type) {
    case 'insert':
      const query = `INSERT INTO ${tableName} ${parentAttributes} VALUES (${processedDataToInsert}) RETURNING *;`;
      return query;
    default:
      null;
  }
  return null;
};

QueryBuilderProxy.prototype.getAttributes = function resolveAttributesByInstances(
  originalInstance
) {
  const [inst] = originalInstance;
  const { attributes } = inst;
  const values = attributes.values();
  const attributesMapping = [];
  for (const v of values) {
    attributesMapping.push(v);
  }
  return attributesMapping;
};

QueryBuilderProxy.prototype.buildAttributesQuery = function resolveAttributesString(attributes) {
  return this.generateListForQuery(attributes, 'columns');
};

QueryBuilderProxy.prototype.processDataByInspection = function resolveData(data) {
  const dataType = this.checkDataType(data);
  switch (dataType) {
    case 'array':
      return this.generateListForQuery(data, 'values');
    case 'object':
      const objValues = Object.values(data);
      return this.generateListForQuery(objValues, 'values');
    default:
      return data;
  }
};

QueryBuilderProxy.prototype.checkDataType = function resolveDataType(data) {
  if (Array.isArray(data)) {
    return 'array';
  }
  return typeof data;
};

QueryBuilderProxy.prototype.getLastItemOfArray = function resolveLastItem(arr) {
  return arr.filter((_, idx, self) => idx === self.length - 1);
};

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

module.exports = QueryBuilderProxy;
