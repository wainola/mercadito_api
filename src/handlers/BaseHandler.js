const Joi = require('joi');

class BaseHandler {
  isValid(body, schema) {
    return Joi.validate(body, schema);
  }

  extractValues(body) {}
}

module.exports = BaseHandler;
