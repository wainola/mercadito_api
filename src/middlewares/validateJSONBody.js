const Joi = require('joi');
const categoryValidators = require('../handlers/validators/CategoryValidators');

const appUrls = ['/category'];
const methodsRequest = ['post'];

const mapUrl = url => appUrls.filter(itemUrl => itemUrl === url);
const methodToLowerCase = method => method.toLowerCase();
const mapMethodRequest = methodRequest => methodsRequest.filter(method => method === methodRequest);

// validateJSONBody :: Strgin -> String -> Object
const validateJSONBody = (url, method) =>
  Promise.resolve({ url: mapUrl(url), method: methodToLowerCase(method) }).then(obj => ({
    ...obj,
    method: mapMethodRequest(obj.method)
  }));

module.exports = validateJSONBody;
