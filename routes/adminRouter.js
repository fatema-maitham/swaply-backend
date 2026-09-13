const express = require('express');

const adminCtrl = require('../controllers/adminCtrl');

const router = express.Router();

router.get('/dashboard', adminCtrl.dashboard);

router.get('/users', adminCtrl.getUsers);
router.get('/skills', adminCtrl.getSkills);
router.get('/swaps', adminCtrl.getSwaps);
router.get('/reviews', adminCtrl.getReviews);

router.delete('/users/:userId', adminCtrl.deleteUser);
router.delete('/skills/:skillId', adminCtrl.deleteSkill);
router.delete('/reviews/:reviewId', adminCtrl.deleteReview);

module.exports = router;