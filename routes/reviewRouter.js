const express = require('express');

const reviewCtrl = require('../controllers/reviewCtrl');

const router = express.Router();

router.post('/', reviewCtrl.createReview);

router.get('/', reviewCtrl.getReviews);

router.get('/:id', reviewCtrl.getReview);

router.put('/:id', reviewCtrl.updateReview);

router.delete('/:id', reviewCtrl.deleteReview);

module.exports = router;