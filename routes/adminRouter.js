const express = require('express');

const adminCtrl = require('../controllers/adminCtrl');

const router = express.Router();

router.get('/dashboard', adminCtrl.dashboard);

router.get('/users', adminCtrl.getUsers);

router.get('/skills', adminCtrl.getSkills);

router.get('/swaps', adminCtrl.getSwaps);

router.get('/reviews', adminCtrl.getReviews);

router.get('/audit-logs', adminCtrl.getAuditLogs);

router.patch(
  '/users/:userId/status',
  adminCtrl.toggleUserStatus
);

router.delete(
  '/users/:userId',
  adminCtrl.deleteUser
);

router.delete(
  '/skills/:skillId',
  adminCtrl.deleteSkill
);

router.delete(
  '/reviews/:reviewId',
  adminCtrl.deleteReview
);

router.get('/categories', adminCtrl.getCategories);

router.post('/categories', adminCtrl.createCategory);

router.patch(
  '/categories/:categoryId',
  adminCtrl.updateCategory
);

router.delete(
  '/categories/:categoryId',
  adminCtrl.deleteCategory
);

module.exports = router;
