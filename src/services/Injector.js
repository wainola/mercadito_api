const QueryBuilderProxy = require('./QueryBuilderProxy');

function Injector() {
  this.dependencies = {};
  this.QueryBuilderProxy = new QueryBuilderProxy();
}

Injector.prototype.getDependencies = function resolveDependecies() {
  return this.dependencies;
};

Injector.prototype.setDependency = function setupDepencencie(dependency) {
  const {
    constructor: { name: instanceName }
  } = Reflect.getPrototypeOf(dependency);

  this.dependencies = {
    ...this.dependencies,
    [instanceName.toLowerCase()]: dependency
  };
  return instanceName.toLowerCase();
};

Injector.prototype.proxyInstance = function resolveProxiedInstance(key) {
  try {
    if (key !== undefined) {
      const dependency = this.dependencies[key];
      this.QueryBuilderProxy.setInstance([dependency]);
      const proxiedInstance = this.QueryBuilderProxy.setProxy(dependency);
      return proxiedInstance;
    }
    throw new Error('No key passed.');
  } catch (error) {
    return error;
  }
};

module.exports = new Injector();
