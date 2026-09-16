const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    reviewedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    swap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Swap',
      required: true,
    },

    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index(
  {
    reviewer: 1,
    swap: 1,
    skill: 1,
  },
  {
    unique: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;