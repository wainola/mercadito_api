class Response {
  constructor() {
    this.statusCode = null;
  }

  status(code) {
    this.statusCode = code;
    return this;
  }

  send(obj) {
    return {
      statusCode: this.statusCode,
      body: obj
    };
  }
}

module.exports = Response;
