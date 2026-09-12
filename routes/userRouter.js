const express = require('express');

const userCtrl = require('../controllers/userCtrl');

const router = express.Router();

router.get('/profile', userCtrl.getUser);
router.put('/profile', userCtrl.updateUser);

module.exports = router;