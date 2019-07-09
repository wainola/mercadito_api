const express = require('express');

const router = express.Router();

const CategoryHandler = require('../handlers/CategoriesHandler');

// CATEGORIES
// router.get('/categories', CategoryHandler.getCategories);
router.post('/categories', CategoryHandler.postCategory);
// router.delete('/categories', CategoryHandler.deleteCategory);

module.exports = router;
