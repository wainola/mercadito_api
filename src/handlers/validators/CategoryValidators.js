const Joi = require('joi');

module.exports = {
  postSchema: Joi.object().keys({
    category: Joi.object().keys({
      category_name: Joi.string().required(),
      createdat: Joi.string().required()
    })
  }),
  updateSchema: Joi.object().keys({
    category: Joi.object().keys({
      id: Joi.string()
        .uuid()
        .required(),
      category_name: Joi.string().required()
    })
  }),
  deleteSchema: Joi.object().keys({
    category: Joi.object().keys({
      id: Joi.string()
        .uuid()
        .required()
    })
  })
};
