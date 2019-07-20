const Joi = require('joi');
const categoryValidators = require('../handlers/validators/CategoryValidators');

const appUrls = ['/category'];
const methodsRequest = ['post'];

const mapUrl = url => appUrls.filter(itemUrl => itemUrl === url);
const methodToLowerCase = method => method.toLowerCase();
const mapMethodRequest = methodRequest => methodsRequest.filter(method => method === methodRequest);
const genStructure = obj => ({
  criteriaTuple: [...obj.url, ...obj.method],
  body: obj.body
});
const validateByUrlandMethod = ({ criteriaTuple: [url, method], body }) => {
  switch (url) {
    case '/category':
      if (method === 'post') {
        const validationResult = Joi.validate(body, categoryValidators.postSchema);
        return validationResult;
      }
    default:
      return null;
  }
};

// validateJSONBody :: Strgin -> String -> Object
const validateJSONBody = (url, method, body) =>
  Promise.resolve({ url: mapUrl(url), method: methodToLowerCase(method), body })
    .then(dataProcessed => ({
      ...dataProcessed,
      method: mapMethodRequest(dataProcessed.method),
      body
    }))
    .then(obj => genStructure(obj))
    .then(objectStructured => ({ error: validateByUrlandMethod(objectStructured).error }));

const JSONValidatorMiddleware = async (request, response, next) => {
  const { error } = await validateJSONBody(request.url, request.method, request.body);
  if (error !== null) {
    return response.status(422).send({ msg: 'Malformed JSON' });
  }
  return next();
};

module.exports = JSONValidatorMiddleware;
