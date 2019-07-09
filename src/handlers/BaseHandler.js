const Joi = require('joi');

class Base {
  isValid(body, schema) {
    return Joi.validate(body, schema);
  }
}

module.exports = Base;
