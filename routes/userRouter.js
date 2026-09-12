const express = require('express');

const userCtrl = require('../controllers/userCtrl');

const router = express.Router();

router.get('/profile', userCtrl.getUser);

module.exports = router;