require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const JSONValidatorMiddleware = require('../middlewares/validateJSONBody');

const router = express.Router();

const CategoryHandler = require('../handlers/CategoryHandler');

const { DATABASE_URL } = process.env;

const client = new Pool({ connectionString: DATABASE_URL });

const categoryHandler = new CategoryHandler(client);

// CATEGORIES
// router.get('/categories', categoryHandler.getCategories);
router.post('/category', JSONValidatorMiddleware, categoryHandler.postCategory);
// router.delete('/categories', categoryHandler.deleteCategory);

module.exports = router;
