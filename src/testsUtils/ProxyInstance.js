function ProxiedInstance(target) {
  const internalHandler = {
    construct(target, args) {
      const internalInstance = new target(...args);
      if ('execQuery' in internalInstance) {
        internalInstance.execQuery = async function(query) {
          return query;
        };

        return internalInstance;
      }
    }
  };
  return new Proxy(target, internalHandler);
}

module.exports = ProxiedInstance;
