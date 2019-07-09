const express = require('express');

const router = express.Router();

const CategoriesHandler = require('./CategoriesHandler');

router.post('/category', CategoriesHandler.postCategory);
router.delete('/category', CategoriesHandler.deleteCategory);
router.patch('/category', CategoriesHandler.patchCategory);
router.get('/category', CategoriesHandler.getCategories);

module.exports = router;
