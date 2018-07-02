import Joi from 'joi'
import { credentialsSchema } from '../validators/index'

export const postOrder = (request, response, next) => {
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