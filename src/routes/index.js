require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const JSONValidatorMiddleware = require('../middlewares/validateJSONBody');

const router = express.Router();

const CategoryHandler = require('../handlers/CategoryHandler');
const StockHandler = require('../handlers/StockHandler');
const ProductHandler = require('../handlers/ProductHandler');

const { DATABASE_URL } = process.env;

const client = new Pool({ connectionString: DATABASE_URL });
client.connect();

const categoryHandler = new CategoryHandler(client);
const productHandler = new ProductHandler(client);

// CATEGORIES
router.get('/category', categoryHandler.getCategory);
router.post('/category', JSONValidatorMiddleware, categoryHandler.postCategory);
router.patch('/category', JSONValidatorMiddleware, categoryHandler.updateCategory);
router.delete('/category', JSONValidatorMiddleware, categoryHandler.deleteCategory);

// STOCK

// PRODUCT
router.get('/product', productHandler.getProduct);
router.post('/product', productHandler.postProduct);
router.patch('/product', productHandler.updateProduct);
router.delete('/product', productHandler.deleteProduct);

module.exports = router;
