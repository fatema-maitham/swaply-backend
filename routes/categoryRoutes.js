const express = require('express');

const categoryCtrl = require('../controllers/categoryCtrl');

const isSignedIn = require('../middleware/isSignedIn');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

// Anyone can view categories
router.get('/', categoryCtrl.getCategories);

// Only admins can create categories
router.post('/', isSignedIn, isAdmin, categoryCtrl.createCategory);

// Only admins can update categories
router.patch('/:categoryId', isSignedIn, isAdmin, categoryCtrl.updateCategory);

// Only admins can delete categories
router.delete('/:categoryId', isSignedIn, isAdmin, categoryCtrl.deleteCategory);

module.exports = router;