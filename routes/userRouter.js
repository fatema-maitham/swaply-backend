const express = require('express');
const userCtrl = require('../controllers/userCtrl');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', userCtrl.getUsers);

router.get('/profile', userCtrl.getUser);

/*
  PUT /users/profile
  Update logged-in user's profile
*/
router.put(
  '/profile',
  upload.single('profileImage'),
  userCtrl.updateUser
);

/*
  DELETE /users/profile
  Delete logged-in user's account
*/
router.delete(
  '/profile',
  userCtrl.deleteUser
);

module.exports = router;