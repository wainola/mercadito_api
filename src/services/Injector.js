const QueryBuilderProxy = require('./QueryBuilderProxy');

function Injector() {
  this.dependencies = null;
  this.QueryBuilderProxy = null;
}

module.exports = new Injector();
