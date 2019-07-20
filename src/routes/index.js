require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const validateJSONBody = require('../middlewares/validateJSONBody');

const router = express.Router();

const CategoryHandler = require('../handlers/CategoryHandler');

const { DATABASE_URL } = process.env;

const client = new Pool({ connectionString: DATABASE_URL });

const categoryHandler = new CategoryHandler(client);

const someMiddleware = async (request, response, next) => {
  const r = await validateJSONBody(request.url, request.method);
  console.log('r:', r);
  return next();
};

// CATEGORIES
// router.get('/categories', categoryHandler.getCategories);
router.post('/category', someMiddleware, categoryHandler.postCategory);
// router.delete('/categories', categoryHandler.deleteCategory);

module.exports = router;
