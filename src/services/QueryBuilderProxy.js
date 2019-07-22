function QueryBuilderProxy(instances) {
  this.instances = instances;
  this.internalHandler = null;
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

QueryBuilderProxy.prototype.getInstancesAndMethods = function resolveInstancesAndMethodsToAnObject() {
  console.log(this.instances);
  const p1 = this.instances[0];
  const p11 = this.getPrototypesOfInstances(p1);
  // console.log(
  //   Object.entries(this.getInternalPropertiesDescriptorOfPrototype(p11)).filter(
  //     (_, idx) => idx !== 0
  //   )
  // );
  console.log(
    this.instances.map(item => {
      const p = this.getPrototypesOfInstances(item);
      const pp = this.getInternalPropertiesDescriptorOfPrototype(p);
      const ppEntries = this.getEntriesOfPrototype(pp);
      const ff = this.filterOnlyStrings(ppEntries);
      const f = this.filterByMethodNames(ff);
      return { instanceName: item.constructor.name, methods: [...f] };
    })
  );
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

module.exports = QueryBuilderProxy;
