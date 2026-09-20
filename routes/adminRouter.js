const express = require('express');

const adminCtrl = require('../controllers/adminCtrl');

const router = express.Router();

// Dashboard
router.get('/dashboard', adminCtrl.dashboard);

// Users
router.get('/users', adminCtrl.getUsers);

router.patch(
  '/users/:userId/status',
  adminCtrl.toggleUserStatus
);

router.delete(
  '/users/:userId',
  adminCtrl.deleteUser
);

// Skills
router.get('/skills', adminCtrl.getSkills);

router.delete(
  '/skills/:skillId',
  adminCtrl.deleteSkill
);

// Swaps
router.get('/swaps', adminCtrl.getSwaps);

// Reviews
router.get('/reviews', adminCtrl.getReviews);

router.delete(
  '/reviews/:reviewId',
  adminCtrl.deleteReview
);

// Audit Logs
router.get('/audit-logs', adminCtrl.getAuditLogs);

module.exports = router;