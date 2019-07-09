require('dotenv').config();
const express = require('express');
const { Client } = require('pg');

const router = express.Router();

const CategoryHandler = require('../handlers/CategoryHandler');

const { DATABASE_URL } = process.env;

const client = new Client({ connectionString: DATABASE_URL });

const categoryHandler = new CategoryHandler(client);

// CATEGORIES
router.get('/categories', categoryHandler.getCategories);
router.post('/categories', categoryHandler.postCategory);
router.delete('/categories', categoryHandler.deleteCategory);

module.exports = router;
