const express = require('express');

const userCtrl = require('../controllers/userCtrl');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/profile', userCtrl.getUser);

router.put(
  '/profile',
  upload.single('profileImage'),
  userCtrl.updateUser
);

router.delete(
  '/profile',
  userCtrl.deleteUser
);

module.exports = router;