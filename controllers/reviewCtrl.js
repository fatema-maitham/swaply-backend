const Review = require('../models/review');
const Swap = require('../models/swap');

const createReview = async (req, res) => {
  try {
    const { swap, rating, comment } = req.body;

    if (!swap || !rating || !comment) {
      return res.status(400).json({
        err: 'Swap, rating, and comment are required',
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        err: 'Rating must be a whole number from 1 to 5',
      });
    }

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

    const currentUserId = req.user._id.toString();

    const requesterId =
      swapInDatabase.requester.toString();

    const receiverId =
      swapInDatabase.receiver.toString();

    const isRequester =
      requesterId === currentUserId;

    const isReceiver =
      receiverId === currentUserId;

    if (!isRequester && !isReceiver) {
      return res.status(403).json({
        err: 'You can only review users involved in your swap',
      });
    }

    let reviewedUser;
    let skill;

    if (isRequester) {
      reviewedUser = swapInDatabase.receiver;
      skill = swapInDatabase.skillRequested;
    } else {
      reviewedUser = swapInDatabase.requester;
      skill = swapInDatabase.skillOffered;
    }

    const existingReview = await Review.findOne({
      reviewer: req.user._id,
      swap,
      skill,
    });

    if (existingReview) {
      return res.status(400).json({
        err: 'You have already reviewed this skill for this swap',
      });
    }

    const review = await Review.create({
      reviewer: req.user._id,
      reviewedUser,
      swap,
      skill,
      rating: numericRating,
      comment: comment.trim(),
    });

    const populatedReview = await Review.findById(review._id)
      .populate('reviewer', 'name')
      .populate('reviewedUser', 'name')
      .populate('skill', 'name');

    res.status(201).json({
      review: populatedReview,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('reviewer', 'name')
      .populate('reviewedUser', 'name')
      .populate('skill', 'name')
      .populate('swap');

    res.status(200).json({
      reviews,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('reviewer', 'name')
      .populate('reviewedUser', 'name')
      .populate('skill', 'name')
      .populate('swap');

    if (!review) {
      return res.status(404).json({
        err: 'Review not found',
      });
    }

    res.status(200).json({
      review,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        err: 'Rating must be a whole number from 1 to 5',
      });
    }

    if (!comment || !comment.trim()) {
      return res.status(400).json({
        err: 'Comment is required',
      });
    }

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        err: 'Review not found',
      });
    }

    if (
      review.reviewer.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        err: 'You can only update your own review',
      });
    }

    const updatedReview =
      await Review.findByIdAndUpdate(
        req.params.id,
        {
          rating: numericRating,
          comment: comment.trim(),
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate('reviewer', 'name')
        .populate('reviewedUser', 'name')
        .populate('skill', 'name')
        .populate('swap');

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

    if (
      review.reviewer.toString() !==
      req.user._id.toString()
    ) {
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