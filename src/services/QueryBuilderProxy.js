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

QueryBuilderProxy.prototype.setQueryActions = function setupQueryActions(
  instancesNameAndMethods
) {};

QueryBuilderProxy.prototype.getDictionaryOfQueryActions = function resolveQueryActions() {};

module.exports = QueryBuilderProxy;
