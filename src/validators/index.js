// import Joi from 'joi'
const Joi = require("joi");

const UUID_REGEX = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;
const LIMIT_AMOUMT = 99999999;

exports.credentialsSchema = Joi.object().keys({
  email: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string()
    .min(7)
    .required()
});

exports.productSchema = Joi.object().keys({
  name: Joi.string().required(),
  urlImage: Joi.string().required(),
  description: Joi.string().required(),
  stock: Joi.string().required(),
  type: Joi.string().required()
});

exports.categoriesSchema = Joi.object().keys({
  id: Joi.string()
    .uuid()
    .required(),
  name: Joi.string().required()
});

exports.clientSchema = Joi.object().keys({
  id: Joi.string()
    .uuid()
    .required(),
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  address: Joi.string().required()
});

exports.orderHistorySchema = Joi.object().keys({});
