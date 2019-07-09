const Joi = require('joi');

class BaseHandler {
  isValid(body, schema) {
    return Joi.validate(body, schema);
  }
}

module.exports = BaseHandler;
