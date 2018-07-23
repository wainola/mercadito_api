const Joi = require('joi')
const { credentialsSchema } = require('../validators/index')

exports.postOrder = (request, response, next) => {
  let reply
  const isValidJSON = Joi.validate(request.body, credentialsSchema)
  if(isValidJSON !== null){
    reply: {
      error:{
        message: 'Malformed json'
      }
    }
    return response.status(422).send(reply)
  }

  const { order } = request.body
  const insertIntoOrders = ''
}