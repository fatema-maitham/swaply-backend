const Review = require('../models/review');
const Swap = require('../models/swap');

const createReview = async (req, res) => {
  try {
    const { reviewedUser, swap, rating, comment } = req.body;

    const swapInDatabase = await Swap.findById(swap);

    if (!swapInDatabase) {
      return res.status(404).json({ err: 'Swap not found' });
    }

    if (swapInDatabase.status !== 'completed') {
      return res.status(400).json({
        err: 'Review can only be created after the swap is completed',
      });
    }

    const isParticipant =
      swapInDatabase.requester.toString() === req.user._id.toString() ||
      swapInDatabase.receiver.toString() === req.user._id.toString();

    if (!isParticipant) {
      return res.status(403).json({
        err: 'You can only review users involved in your swap',
      });
    }

    const review = await Review.create({
      reviewer: req.user._id,
      reviewedUser,
      swap,
      rating,
      comment,
    });

    res.status(201).json({ review });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    res.status(200).json({ reviews });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ err: 'Review not found' });
    }

    res.status(200).json({ review });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ err: 'Review not found' });
    }

    if (review.reviewer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        err: 'You can only update your own review',
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ review: updatedReview });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ err: 'Review not found' });
    }

    if (review.reviewer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        err: 'You can only delete your own review',
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Review deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

module.exports = {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
};