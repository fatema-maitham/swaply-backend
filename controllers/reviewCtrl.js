const Review = require('../models/review');
const Swap = require('../models/swap');

const createReview = async (req, res) => {
  try {
    const { swap, rating, comment } = req.body;

    const swapInDatabase = await Swap.findById(swap);

    if (!swapInDatabase) {
      return res.status(404).json({
        err: 'Swap not found',
      });
    }

    if (swapInDatabase.status !== 'completed') {
      return res.status(400).json({
        err: 'Review can only be created after the swap is completed',
      });
    }

    const isRequester =
      swapInDatabase.requester.toString() === req.user._id.toString();

    const isReceiver =
      swapInDatabase.receiver.toString() === req.user._id.toString();

    if (!isRequester && !isReceiver) {
      return res.status(403).json({
        err: 'You can only review users involved in your swap',
      });
    }

    // The person being reviewed is the other participant.
    const reviewedUser = isRequester
      ? swapInDatabase.receiver
      : swapInDatabase.requester;

    // Prevent duplicate reviews for the same swap by the same user.
    const existingReview = await Review.findOne({
      reviewer: req.user._id,
      swap,
    });

    if (existingReview) {
      return res.status(400).json({
        err: 'You have already reviewed this swap',
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
    console.log('CREATE REVIEW ERROR:', err);

    res.status(500).json({
      err: err.message,
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('reviewer', 'name email profileImage')
      .populate('reviewedUser', 'name email profileImage')
      .populate({
        path: 'swap',
        select: 'status skillOffered skillRequested',
        populate: [
          {
            path: 'skillOffered',
            select: 'name',
          },
          {
            path: 'skillRequested',
            select: 'name',
          },
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ reviews });
  } catch (err) {
    console.log('GET REVIEWS ERROR:', err);

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('reviewer', 'name email profileImage')
      .populate('reviewedUser', 'name email profileImage');

    if (!review) {
      return res.status(404).json({
        err: 'Review not found',
      });
    }

    res.status(200).json({ review });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        err: 'Review not found',
      });
    }

    if (review.reviewer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        err: 'You can only update your own review',
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      {
        rating: req.body.rating,
        comment: req.body.comment,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      review: updatedReview,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        err: 'Review not found',
      });
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

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

module.exports = {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
};
