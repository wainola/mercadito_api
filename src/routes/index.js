const express = require('express');

const router = express.Router();

const CategoriesRoutes = require('./CategoriesRoutes');

// CATEGORIES
router.get('/categories', CategoriesRoutes.getCategories);
router.post('/categories', CategoriesRoutes.postCategory);
router.delete('/categories', CategoriesRoutes.deleteCategory);

module.exports = router;
