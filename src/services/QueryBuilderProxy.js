function QueryBuilderProxy(instances) {
  this.instances = instances;
  this.internalHandler = null;
  this.instancesAndMethods = this.setInstancesAndMethods(instances);
  this.queryDictionary = this.setQueryActions(this.instancesAndMethods);
}

QueryBuilderProxy.prototype.setInternalHandler = function setupInternalHandler() {
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
        const getQueryAction = null;
        return target[propName](...args);
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
      acc.push({ action: queryMapping[r], whereClause: false });
    }
    if (item.includes('update')) {
      r = queryMapping.indexOf('update');
      acc.push({ action: queryMapping[r], whereClause: true });
    }
    if (item.includes('delete')) {
      r = queryMapping.indexOf('delete');
      acc.push({ action: queryMapping[r], whereClause: true });
    }
    if (item.includes('get')) {
      r = queryMapping.indexOf('get');
      acc.push({ action: queryMapping[r], whereClause: false });
    }

    return acc;
  }, []);
};

QueryBuilderProxy.prototype.getDictionaryOfQueryActions = function resolveQueryActions() {};

module.exports = QueryBuilderProxy;
