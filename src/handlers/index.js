const express = require('express');

const router = express.Router();

const CategorysHandler = require('./CategoryHandler');

router.post('/category', CategorysHandler.postCategory);
router.delete('/category', CategorysHandler.deleteCategory);
router.patch('/category', CategorysHandler.patchCategory);
router.get('/category', CategorysHandler.getCategories);

module.exports = router;
