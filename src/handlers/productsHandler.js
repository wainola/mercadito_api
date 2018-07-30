const Joi = require('joi');
const { productSchema } = require('../validators/index');

exports.postProduct = (request, response) => {
  let reply;
  const isValidJSON = Joi.validate(request.body, productSchema);
  if (isValidJSON !== null) {
    reply: {
      error: {
        message: 'Malformed json'
      }
    };
    return response.status(422).send(reply);
  }
  return response.status(201).send(reply);
}