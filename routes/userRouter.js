const express = require('express');

const userCtrl = require('../controllers/userCtrl');

const upload = require('../middleware/upload');

const router = express.Router();

/*
  GET /users
  Get all users
*/
router.get('/', userCtrl.getUsers);

/*
  GET /users/profile
  Get logged-in user's profile
*/
router.get('/profile', userCtrl.getUser);

/*
  GET /users/:id
  Get another user's public profile
*/
router.get('/:id', userCtrl.getUserById);

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
