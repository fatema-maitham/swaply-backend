const express = require('express');

const categoryCtrl = require('../controllers/categoryCtrl');

const router = express.Router();

router.get('/', categoryCtrl.getCategories);

module.exports = router;
