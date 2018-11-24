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

exports.inventorySchema = Joi.object().keys({
  id: Joi.string()
    .uuid()
    .required(),
  id_categories: Joi.string()
    .uuid()
    .required(),
  product_name: Joi.string().required(),
  quantity: Joi.string().required(),
  price: Joi.string().required(),
  type: Joi.string().required(),
  description: Joi.string().required(),
  last_update: Joi.string().required()
});

exports.ProductListSchema = Joi.object().keys({
  id: Joi.string()
    .uuid()
    .required(),
  id_inventory: Joi.string()
    .uuid()
    .required(),
  name: Joi.string().required()
});

exports.OrderDataSchema = Joi.object().keys({
  id: Joi.string()
    .uuid()
    .required(),
  id_client: Joi.string()
    .uuid()
    .required(),
  id_order_history: Joi.string()
    .uuid()
    .required()
});

exports.ProductSchema = Joi.object().keys({
  id: Joi.string()
    .uuid()
    .required(),
  id_product_list: Joi.string()
    .uuid()
    .required()
});
