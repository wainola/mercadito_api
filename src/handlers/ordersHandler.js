const Joi = require("joi");
const { credentialsSchema } = require("../validators/index");

exports.postOrder = async (request, response) => {
  let reply;
  const isValidJSON = Joi.validate(request.body, credentialsSchema);
  if (isValidJSON !== null) {
    reply: {
      error: {
        message: "Malformed json";
      }
    }

    return await response.status(422).send(reply);
  }

  const { order } = request.body;
  const insertIntoOrders = `INSERT INTO order`;

  return response.status(201).send(reply);
};
